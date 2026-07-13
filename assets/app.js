
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
  const pageNames = {dashboard:'Dashboard',engines:'Engine Registry',explorer:'Engine Explorer',updates:'Updates',documents:'Documentatie',evidence:'Evidence'};

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
    $('#documentGrid').innerHTML=baseData.documents.map(d=>`<article class="panel document"><span class="type">${d.type} · ${d.status}</span><h3>${d.title}</h3><p>${d.description}</p><div class="document-actions">${d.type==='Markdown'?`<button class="read-button" data-document="${d.file}" data-title="${d.title}">Lees document</button>`:''}<a class="download" href="./docs/${d.file}" download>Download</a></div></article>`).join('');
    bindDocumentClicks();
    renderExplorerList();
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
  
  const documentCache = {};
  let activeDocument = null;
  let activeMarkdown = '';

  function escapeHtml(value){
    return value.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function inlineMarkdown(text){
    return escapeHtml(text)
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g,'<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function markdownToHtml(md, query=''){
    const lines=md.replace(/\r/g,'').split('\n');let out='',inList=false,inTable=false,headers=[];
    const endList=()=>{if(inList){out+='</ul>';inList=false}};
    const endTable=()=>{if(inTable){out+='</tbody></table></div>';inTable=false}};
    for(let i=0;i<lines.length;i++){
      const line=lines[i];
      if(/^#{1,3}\s/.test(line)){endList();endTable();const level=line.match(/^#+/)[0].length;out+=`<h${level}>${inlineMarkdown(line.replace(/^#{1,3}\s/,''))}</h${level}>`;continue}
      if(/^>\s?/.test(line)){endList();endTable();out+=`<blockquote>${inlineMarkdown(line.replace(/^>\s?/,''))}</blockquote>`;continue}
      if(/^\|.*\|$/.test(line)){
        endList();
        const cells=line.slice(1,-1).split('|').map(x=>x.trim());
        if(i+1<lines.length && /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[i+1])){
          endTable();inTable=true;headers=cells;out+='<div class="table-wrap"><table><thead><tr>'+cells.map(c=>`<th>${inlineMarkdown(c)}</th>`).join('')+'</tr></thead><tbody>';i++;continue
        }
        if(inTable){out+='<tr>'+cells.map(c=>`<td>${inlineMarkdown(c)}</td>`).join('')+'</tr>';continue}
      }
      endTable();
      if(/^[-*]\s+/.test(line)){if(!inList){out+='<ul>';inList=true}out+=`<li>${inlineMarkdown(line.replace(/^[-*]\s+/,''))}</li>`;continue}
      endList();
      if(!line.trim()){continue}
      out+=`<p>${inlineMarkdown(line)}</p>`;
    }
    endList();endTable();
    if(query){
      const safe=query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      out=out.replace(new RegExp(`(${safe})`,'gi'),'<mark>$1</mark>');
    }
    return out;
  }
  async function loadDocument(file){
    if(documentCache[file])return documentCache[file];
    const response=await fetch('./docs/'+file);
    if(!response.ok)throw new Error('Document kon niet worden geladen');
    const text=await response.text();documentCache[file]=text;return text;
  }
  async function openDocument(file,title){
    try{
      activeDocument={file,title};activeMarkdown=await loadDocument(file);
      $('#readerTitle').textContent=title;$('#readerSearch').value='';$('#readerMatches').textContent='';
      $('#readerContent').innerHTML=markdownToHtml(activeMarkdown);
      $('#readerDownload').onclick=()=>{location.href='./docs/'+file};
      $('#reader').classList.add('open');$('#readerBackdrop').classList.add('open');
    }catch(err){toast(err.message)}
  }
  function closeReader(){$('#reader').classList.remove('open');$('#readerBackdrop').classList.remove('open')}
  function bindDocumentClicks(){
    $$('[data-document]').forEach(b=>b.onclick=()=>openDocument(b.dataset.document,b.dataset.title));
  }
  async function searchDocuments(query){
    const box=$('#documentSearchResults');const q=query.trim().toLowerCase();
    if(q.length<2){box.classList.remove('open');box.innerHTML='';return}
    const markdownDocs=baseData.documents.filter(d=>d.type==='Markdown');
    const results=[];
    for(const d of markdownDocs){
      try{
        const text=await loadDocument(d.file);const index=text.toLowerCase().indexOf(q);
        if(index>=0){results.push({d,snippet:text.slice(Math.max(0,index-75),Math.min(text.length,index+145)).replace(/\n+/g,' ')})}
      }catch(_){}
    }
    box.innerHTML=results.length?results.map(r=>`<button class="doc-result" data-document="${r.d.file}" data-title="${r.d.title}"><strong>${r.d.title}</strong><span>…${escapeHtml(r.snippet)}…</span></button>`).join(''):'<span>Geen resultaten gevonden.</span>';
    box.classList.add('open');bindDocumentClicks();
  }


  let selectedExplorerEngine = null;
  let selectedExplorerTab = 'overview';

  function renderExplorerList(query=''){
    const q=query.toLowerCase().trim();
    const list=baseData.engines.filter(e=>!q||(e.name+' '+e.group+' '+e.summary).toLowerCase().includes(q));
    $('#explorerList').innerHTML=list.map(e=>`<button class="explorer-link ${selectedExplorerEngine===e.id?'active':''}" data-explore="${e.id}"><span><strong>${e.name}</strong><small>${e.group}</small></span><b>${e.progress}%</b></button>`).join('');
    $$('[data-explore]').forEach(b=>b.onclick=()=>openExplorer(b.dataset.explore));
  }
  function openExplorer(id,tab='overview'){
    const e=baseData.engines.find(x=>x.id===id);if(!e)return;
    selectedExplorerEngine=id;selectedExplorerTab=tab;renderExplorerList($('#explorerSearch').value||'');
    const dependencyNames=(e.dependencies||[]).map(dep=>baseData.engines.find(x=>x.id===dep)).filter(Boolean);
    $('#explorerDetail').innerHTML=`<div class="explorer-hero"><div>${badge(e)}<h2>${e.name}</h2><p>${e.summary}</p></div><div class="score-stack"><div class="score"><strong>${e.progress}%</strong><span>Progress</span></div><div class="score"><strong>${e.confidence}%</strong><span>Confidence</span></div></div></div>
      <div class="explorer-tabs">
        ${[['overview','Overview'],['evidence','Evidence'],['timeline','Timeline'],['documents','Documents'],['notes','Notes']].map(([key,label])=>`<button class="explorer-tab ${tab===key?'active':''}" data-explorer-tab="${key}">${label}</button>`).join('')}
      </div><div class="explorer-panel">${explorerPanel(e,tab,dependencyNames)}</div>`;
    $$('[data-explorer-tab]').forEach(b=>b.onclick=()=>openExplorer(id,b.dataset.explorerTab));
    bindDocumentClicks();
    $$('[data-dependency]').forEach(b=>b.onclick=()=>openExplorer(b.dataset.dependency));
  }
  function explorerPanel(e,tab,deps){
    if(tab==='overview')return `<section class="explorer-section"><h3>Dependencies</h3><div class="dependency-grid">${deps.length?deps.map(d=>`<button class="dependency" data-dependency="${d.id}">${d.name}</button>`).join(''):'<span>Geen dependencies geregistreerd.</span>'}</div></section>
      <section class="explorer-section"><h3>Confirmed facts</h3><div class="item-list">${e.facts.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section>
      <section class="explorer-section"><h3>Hypotheses</h3><div class="item-list">${e.hypotheses.length?e.hypotheses.map(x=>`<div class="item hyp"><i></i><span>${x}</span></div>`).join(''):'<div class="item"><span>Geen open hypotheses.</span></div>'}</div></section>
      <section class="explorer-section"><h3>Next research</h3><div class="note-card">${e.next}</div></section>`;
    if(tab==='evidence')return `<section class="explorer-section"><h3>Evidence sources</h3><div class="source-grid">${(e.sources||[]).map(x=>`<div class="source">${x}</div>`).join('')}</div></section>
      <section class="explorer-section"><h3>Gerelateerde tests</h3><div class="item-list">${e.tests.length?e.tests.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join(''):'<div class="item"><span>Nog geen tests geregistreerd.</span></div>'}</div></section>`;
    if(tab==='timeline')return `<section class="explorer-section"><h3>Research timeline</h3><div class="engine-timeline">${(e.timeline||[]).length?e.timeline.map(t=>`<article class="engine-event"><time>${new Date(t.date+'T12:00:00').toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'})}</time><h4>${t.title}</h4><p>${t.summary}</p></article>`).join(''):'<p>Geen tijdlijnitems geregistreerd.</p>'}</div></section>`;
    if(tab==='documents')return `<section class="explorer-section"><h3>Related documents</h3><div class="doc-links">${(e.documents||[]).length?e.documents.map(file=>{const d=baseData.documents.find(x=>x.file===file);return `<button class="doc-link" data-document="${file}" data-title="${d?d.title:file}">${d?d.title:file}</button>`}).join(''):'<span>Geen documenten gekoppeld.</span>'}</div></section>`;
    return `<section class="explorer-section"><h3>Research notes</h3><div class="item-list">${(e.notes||[]).length?e.notes.map(x=>`<div class="note-card">${x}</div>`).join(''):'<div class="note-card">Geen notities geregistreerd.</div>'}</div></section>`;
  }

function exportProgress(){
    const payload={version:baseData.version,exported:new Date().toISOString(),engines:baseData.engines.map(e=>({id:e.id,progress:e.progress,confidence:e.confidence,status:e.status}))};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.download='ppcc-progress.json';a.click();URL.revokeObjectURL(a.href);toast('Voortgang geëxporteerd')
  }

  $$('.nav').forEach(n=>n.onclick=()=>switchView(n.dataset.view));
  $$('[data-go]').forEach(b=>b.onclick=()=>switchView(b.dataset.go));
  $('#explorerSearch').oninput=e=>renderExplorerList(e.target.value);
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
  $('#readerClose').onclick=closeReader;$('#readerBackdrop').onclick=closeReader;
  $('#readerSearch').oninput=e=>{
    const q=e.target.value.trim();$('#readerContent').innerHTML=markdownToHtml(activeMarkdown,q);
    $('#readerMatches').textContent=q?((activeMarkdown.toLowerCase().match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'))||[]).length+' resultaten'):'';
  };
  let docSearchTimer;$('#documentSearch').oninput=e=>{clearTimeout(docSearchTimer);docSearchTimer=setTimeout(()=>searchDocuments(e.target.value),180)};
  render();
})();
