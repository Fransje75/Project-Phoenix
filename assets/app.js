
(function(){
  const baseData = window.PPCC_DATA;
  const saved = localStorage.getItem('ppcc-v11-progress');
  if(saved){
    try{
      const changes = JSON.parse(saved);
      baseData.engines.forEach(e=>{
        if(changes[e.id]){
          e.progress = changes[e.id].progress;
          e.confidence = changes[e.id].confidence || e.confidence;
          e.status = changes[e.id].status || e.status;
        }
      });
    }catch(_){}
  }

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const statusLabel = {complete:'Afgerond',active:'Actief',research:'Onderzoek',blocked:'Geblokkeerd'};
  const pageNames = {dashboard:'Dashboard',engines:'Engine Registry',updates:'Updates',documents:'Documentatie',evidence:'Evidence'};

  function overall(){
    return Math.round(baseData.engines.reduce((a,e)=>a+e.progress,0)/baseData.engines.length);
  }
  function avgConfidence(){
    return Math.round(baseData.engines.reduce((a,e)=>a+e.confidence,0)/baseData.engines.length);
  }
  function save(){
    const o={};baseData.engines.forEach(e=>o[e.id]={progress:e.progress,confidence:e.confidence,status:e.status});
    localStorage.setItem('ppcc-v11-progress',JSON.stringify(o));
  }
  function switchView(id){
    $$('.view').forEach(v=>v.classList.toggle('active',v.id===id));
    $$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===id));
    $('#pageTitle').textContent=pageNames[id];
    $('#sidebar').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function badge(e){return `<span class="badge ${e.status}">${statusLabel[e.status]}</span>`}
  function engineCard(e, mini=false){
    return `<button class="engine-card" data-engine="${e.id}">
      ${badge(e)}
      <div class="engine-top"><div><h4>${e.name}</h4><small>${e.group}</small></div><span class="pct">${e.progress}%</span></div>
      ${mini?'':`<p>${e.summary}</p>`}
      <div class="progress"><i style="width:${e.progress}%"></i></div>
      <small>Confidence ${e.confidence}%</small>
    </button>`
  }
  function updateRow(u){
    return `<article class="update"><time>${new Date(u.date+'T12:00:00').toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'})}</time><div><h4>${u.title}</h4><p>${u.summary}</p></div></article>`
  }
  function render(){
    const o=overall(), c=avgConfidence();
    $('#overallValue').textContent=o+'%';$('#overallRing').style.setProperty('--p',o);
    $('#metricOverall').textContent=o+'%';$('#metricConfidence').textContent=c+'%';
    $('#metricActive').textContent=baseData.engines.filter(e=>e.status==='active').length;
    $('#metricDocs').textContent=baseData.documents.length;
    $('#sprintName').textContent=baseData.sprint;$('#sprintBar').style.width=o+'%';$('#sprintPercent').textContent=o+'% voortgang';
    $('#featuredEngines').innerHTML=baseData.engines.slice(0,6).map(e=>engineCard(e,true)).join('');
    $('#focusList').innerHTML=[...baseData.engines].sort((a,b)=>a.progress-b.progress).slice(0,5).map(e=>`<div class="focus" data-engine="${e.id}"><div class="focus-top"><strong>${e.name}</strong><strong>${e.progress}%</strong></div><p>${e.next}</p></div>`).join('');
    $('#recentUpdates').innerHTML=baseData.updates.slice(0,3).map(updateRow).join('');
    $('#engineGrid').innerHTML=baseData.engines.map(e=>engineCard(e)).join('');
    $('#updatesTimeline').innerHTML=baseData.updates.map(updateRow).join('');
    $('#documentGrid').innerHTML=baseData.documents.map(d=>`<article class="panel document"><span class="type">${d.type} · ${d.status}</span><h3>${d.title}</h3><p>${d.description}</p><a class="download" href="./docs/${d.file}" download>Download</a></article>`).join('');
    $('#evidenceBody').innerHTML=baseData.engines.map(e=>`<tr><td><strong>${e.name}</strong></td><td>✓</td><td>${e.tests.length?'✓':'○'}</td><td>${['savegame','player','training','tactics','match','transfer'].includes(e.id)?'✓':'○'}</td><td>${e.id==='executable'?'◐':'○'}</td><td>${e.confidence}%</td></tr>`).join('');
    bindEngineClicks();
  }
  function bindEngineClicks(){
    $$('[data-engine]').forEach(el=>el.onclick=()=>openEngine(el.dataset.engine));
  }
  function openEngine(id){
    const e=baseData.engines.find(x=>x.id===id);if(!e)return;
    $('#drawerContent').innerHTML=`${badge(e)}<h2>${e.name}</h2><p class="summary">${e.summary}</p>
      <div class="drawer-metrics"><article class="panel metric"><span>Voortgang</span><strong>${e.progress}%</strong></article><article class="panel metric"><span>Confidence</span><strong>${e.confidence}%</strong></article></div>
      <div class="range-wrap"><label>Voortgang lokaal aanpassen</label><input id="drawerRange" type="range" min="0" max="100" value="${e.progress}"></div>
      ${section('Confirmed facts',e.facts,'fact')}
      ${section('Hypotheses',e.hypotheses,'hyp')}
      ${section('Gerelateerde tests',e.tests,'fact')}
      <div class="drawer-section"><h3>Volgende stap</h3><div class="item-list"><div class="item"><i></i><span>${e.next}</span></div></div></div>`;
    $('#drawer').classList.add('open');$('#drawerBackdrop').classList.add('open');
    $('#drawerRange').oninput=ev=>{e.progress=+ev.target.value;save();render();openEngine(id)}
  }
  function section(title,items,type){
    return `<div class="drawer-section"><h3>${title}</h3><div class="item-list">${items.length?items.map(x=>`<div class="item ${type==='hyp'?'hyp':''}"><i></i><span>${x}</span></div>`).join(''):'<div class="item"><span>Geen items geregistreerd.</span></div>'}</div></div>`
  }
  function closeDrawer(){$('#drawer').classList.remove('open');$('#drawerBackdrop').classList.remove('open')}
  function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',2000)}
  function exportProgress(){
    const payload={version:baseData.version,exported:new Date().toISOString(),engines:baseData.engines.map(e=>({id:e.id,progress:e.progress,confidence:e.confidence,status:e.status}))};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.download='ppcc-progress.json';a.click();URL.revokeObjectURL(a.href);toast('Voortgang geëxporteerd')
  }

  $$('.nav').forEach(n=>n.onclick=()=>switchView(n.dataset.view));
  $$('[data-go]').forEach(b=>b.onclick=()=>switchView(b.dataset.go));
  $('#engineSearch').oninput=e=>{
    const q=e.target.value.toLowerCase();
    $('#engineGrid').innerHTML=baseData.engines.filter(x=>(x.name+' '+x.group+' '+x.summary).toLowerCase().includes(q)).map(x=>engineCard(x)).join('');
    bindEngineClicks();
  };
  $('#drawerClose').onclick=closeDrawer;$('#drawerBackdrop').onclick=closeDrawer;
  $('#menuButton').onclick=()=>$('#sidebar').classList.toggle('open');
  $('#themeButton').onclick=()=>{
    const light=document.documentElement.classList.toggle('light');
    localStorage.setItem('ppcc-theme',light?'light':'dark');$('#themeButton').textContent=light?'🌙':'☀️';
  };
  if(localStorage.getItem('ppcc-theme')==='light'){document.documentElement.classList.add('light');$('#themeButton').textContent='🌙'}
  $('#exportButton').onclick=exportProgress;
  render();
})();
