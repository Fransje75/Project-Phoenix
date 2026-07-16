
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
  const pageNames = {dashboard:'Dashboard',engines:'Engine Registry',registry:'Engine Registry v1.0',discoveries:'Discoveries',screens:'Screen Analysis',principles:'Design Principles',explorer:'Engine Explorer',graph:'Knowledge Graph',research:'Research Center',savegames:'Savegame Explorer',executable:'Executable Explorer',updates:'Updates',documents:'Documentatie',evidence:'Evidence'};

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
    renderGraph($('#graphSearch')?$('#graphSearch').value:'');
    renderResearchCenter();
    renderSavegameExplorer();
    renderExecutableExplorer();
    renderEngineRegistryV1();
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


  let selectedGraphNode = null;

  function graphNodeEngine(node){
    const direct=baseData.engines.find(e=>e.id===node.id);
    if(direct)return direct;
    const aliases={fitness:'player',morale:'player',potential:'player',medical:'player',club:'manual',manager:'manual',world:'savegame',board:'staff',reputation:'player',scouting:'staff',banking:'finance'};
    return aliases[node.id]?baseData.engines.find(e=>e.id===aliases[node.id]):null;
  }
  function renderGraph(query=''){
    const canvas=$('#graphCanvas'),svg=$('#graphLines');
    const q=query.trim().toLowerCase();
    canvas.innerHTML=baseData.knowledgeGraph.map(n=>{
      const match=!q||n.label.toLowerCase().includes(q)||n.type.toLowerCase().includes(q);
      return `<button class="graph-node ${n.type} ${selectedGraphNode===n.id?'active':''} ${q&&!match?'dim':''}" data-graph-node="${n.id}" style="left:${n.x}%;top:${n.y}%">${n.label}</button>`;
    }).join('');
    const byId=Object.fromEntries(baseData.knowledgeGraph.map(n=>[n.id,n]));
    const seen=new Set(),lines=[];
    baseData.knowledgeGraph.forEach(n=>(n.links||[]).forEach(id=>{
      const t=byId[id];if(!t)return;const key=[n.id,id].sort().join('|');if(seen.has(key))return;seen.add(key);
      const active=selectedGraphNode&&(n.id===selectedGraphNode||id===selectedGraphNode);
      lines.push(`<line class="${active?'active':''}" x1="${n.x*10}" y1="${n.y*7.6}" x2="${t.x*10}" y2="${t.y*7.6}"></line>`);
    }));
    svg.innerHTML=lines.join('');
    $$('[data-graph-node]').forEach(b=>b.onclick=()=>selectGraphNode(b.dataset.graphNode));
  }
  function selectGraphNode(id){
    selectedGraphNode=id;renderGraph($('#graphSearch').value||'');
    const n=baseData.knowledgeGraph.find(x=>x.id===id);if(!n)return;
    const related=(n.links||[]).map(link=>baseData.knowledgeGraph.find(x=>x.id===link)).filter(Boolean);
    const engine=graphNodeEngine(n);
    $('#graphInspector').innerHTML=`<span class="node-type">${n.type}</span><h3>${n.label}</h3>
      <p>${engine?engine.summary:'Kernconcept binnen het Project Phoenix-domeinmodel en de gereconstrueerde simulatie.'}</p>
      ${engine?`<div class="graph-stat-grid"><div class="graph-stat"><strong>${engine.progress}%</strong><span>Progress</span></div><div class="graph-stat"><strong>${engine.confidence}%</strong><span>Confidence</span></div></div>`:''}
      <div class="explorer-section"><h3>Directe relaties</h3><div class="graph-related">${related.length?related.map(r=>`<button data-graph-related="${r.id}">${r.label}</button>`).join(''):'<span>Geen directe relaties.</span>'}</div></div>
      ${engine?`<div class="explorer-section"><h3>Volgende onderzoek</h3><div class="note-card">${engine.next}</div></div><button class="graph-action" data-open-engine="${engine.id}">Open in Engine Explorer</button>`:''}`;
    $$('[data-graph-related]').forEach(b=>b.onclick=()=>selectGraphNode(b.dataset.graphRelated));
    $$('[data-open-engine]').forEach(b=>b.onclick=()=>{switchView('explorer');openExplorer(b.dataset.openEngine)});
  }
  function resetGraph(){
    selectedGraphNode=null;$('#graphSearch').value='';renderGraph('');
    $('#graphInspector').innerHTML='<div class="empty-state"><strong>Selecteer een node</strong><span>Bekijk relaties, gekoppelde engine en onderzoekstatus.</span></div>';
  }


  let selectedTest = null;

  function testStatusLabel(status){
    return {verified:'Verified',active:'Active',planned:'Planned'}[status]||status;
  }
  function renderResearchMetrics(){
    const verified=baseData.tests.filter(t=>t.status==='verified').length;
    const active=baseData.tests.filter(t=>t.status==='active').length;
    const avg=Math.round(baseData.tests.reduce((a,t)=>a+t.confidence,0)/Math.max(1,baseData.tests.length));
    const engines=new Set(baseData.tests.flatMap(t=>t.engines)).size;
    $('#researchMetrics').innerHTML=[
      ['Tests',baseData.tests.length],['Verified',verified],['Gem. confidence',avg+'%'],['Engines covered',engines]
    ].map(([label,value])=>`<article class="panel metric"><span>${label}</span><strong>${value}</strong></article>`).join('');
  }
  function renderTestList(){
    const q=($('#testSearch').value||'').toLowerCase().trim();
    const status=$('#testStatusFilter').value;
    const list=baseData.tests.filter(t=>(!status||t.status===status)&&(!q||(t.id+' '+t.title+' '+t.category+' '+t.conclusion+' '+t.engines.join(' ')).toLowerCase().includes(q)));
    $('#testList').innerHTML=list.map(t=>`<button class="test-link ${selectedTest===t.id?'active':''}" data-test-id="${t.id}">
      <div class="test-link-top"><strong>${t.id} · ${t.title}</strong><span class="test-status ${t.status}">${testStatusLabel(t.status)}</span></div>
      <p>${t.goal}</p>
    </button>`).join('');
    $$('[data-test-id]').forEach(b=>b.onclick=()=>openTest(b.dataset.testId));
  }
  function openTest(id){
    const t=baseData.tests.find(x=>x.id===id);if(!t)return;selectedTest=id;renderTestList();
    $('#testDetail').innerHTML=`<div class="test-hero"><div><span class="test-status ${t.status}">${testStatusLabel(t.status)}</span><h2>${t.id} · ${t.title}</h2><p>${t.goal}</p></div><div class="confidence-box"><strong>${t.confidence}%</strong><span>Confidence</span></div></div>
      <section class="test-section"><h3>Procedure</h3><div class="steps">${t.procedure.map(s=>`<div class="step">${s}</div>`).join('')}</div></section>
      <section class="test-section"><h3>Evidence chain</h3><div class="evidence-chain">
        ${[['manual','Handleiding'],['test','Praktijktest'],['savegame','Savegame'],['executable','Executable']].map(([key,label])=>`<div class="evidence-chip ${t.evidence[key]?'yes':'no'}"><b>${t.evidence[key]?'✓':'○'}</b><span>${label}</span></div>`).join('')}
      </div></section>
      <section class="test-section"><h3>Resultaat</h3><div class="result-card">${t.result}</div></section>
      <section class="test-section"><h3>Conclusie</h3><div class="conclusion-card">${t.conclusion}</div></section>
      <section class="test-section"><h3>Gerelateerde engines</h3><div class="tag-list">${t.engines.map(e=>{const engine=baseData.engines.find(x=>x.id===e);return `<button class="tag" data-test-engine="${e}">${engine?engine.name:e}</button>`}).join('')}</div></section>
      <section class="test-section"><h3>Bestanden & screenshots</h3><div class="file-list">${[...t.files,...t.screenshots].map(f=>`<div class="file-card">${f}</div>`).join('')||'<div class="file-card">Geen bestanden geregistreerd.</div>'}</div></section>
      <section class="test-section"><h3>Open vragen</h3><div class="item-list">${t.openQuestions.map(q=>`<div class="item hyp"><i></i><span>${q}</span></div>`).join('')}</div></section>`;
    $$('[data-test-engine]').forEach(b=>b.onclick=()=>{switchView('explorer');openExplorer(b.dataset.testEngine)});
  }
  function renderResearchMatrix(){
    $('#researchMatrixBody').innerHTML=baseData.engines.map(e=>{
      const related=baseData.tests.filter(t=>t.engines.includes(e.id));
      const manual=related.some(t=>t.evidence.manual);
      const save=related.some(t=>t.evidence.savegame);
      const exe=related.some(t=>t.evidence.executable);
      return `<tr><td><strong>${e.name}</strong></td><td>${related.length}</td><td>${manual?'✓':'○'}</td><td>${save?'✓':'○'}</td><td>${exe?'✓':'○'}</td><td>${e.confidence}%</td></tr>`;
    }).join('');
  }
  function renderResearchCenter(){
    renderResearchMetrics();renderTestList();renderResearchMatrix();
  }


  let selectedSavegame = null;

  function renderSaveMetrics(){
    const files=baseData.savegames.reduce((a,s)=>a+s.files.length,0);
    const verified=baseData.savegames.filter(s=>s.status==='verified').length;
    const avg=Math.round(baseData.savegames.flatMap(s=>s.files).reduce((a,f)=>a+f.confidence,0)/Math.max(1,files));
    const tests=new Set(baseData.savegames.flatMap(s=>s.relatedTests)).size;
    $('#saveMetrics').innerHTML=[
      ['Save sets',baseData.savegames.length],['Verified',verified],['Bestanden',files],['Gem. confidence',avg+'%']
    ].map(([label,value])=>`<article class="panel metric"><span>${label}</span><strong>${value}</strong></article>`).join('');
  }
  function populateSaveCategories(){
    const select=$('#saveCategoryFilter');
    const current=select.value;
    const cats=[...new Set(baseData.savegames.map(s=>s.category))].sort();
    select.innerHTML='<option value="">Alle categorieën</option>'+cats.map(c=>`<option ${c===current?'selected':''}>${c}</option>`).join('');
  }
  function renderSaveList(){
    const q=($('#saveSearch').value||'').toLowerCase().trim();
    const cat=$('#saveCategoryFilter').value;
    const list=baseData.savegames.filter(s=>(!cat||s.category===cat)&&(!q||(s.name+' '+s.description+' '+s.relatedTests.join(' ')+' '+s.files.map(f=>f.name).join(' ')).toLowerCase().includes(q)));
    $('#saveList').innerHTML=list.map(s=>`<button class="save-link ${selectedSavegame===s.id?'active':''}" data-save-id="${s.id}">
      <div class="save-link-top"><div><strong>${s.name}</strong><small>${s.category}</small></div><span class="test-status ${s.status}">${s.status}</span></div>
      <p>${s.description}</p>
    </button>`).join('');
    $$('[data-save-id]').forEach(b=>b.onclick=()=>openSavegame(b.dataset.saveId));
  }
  function changeClass(change){
    const c=change.toLowerCase().replace(/\s+/g,'-');
    return c==='strong-growth'?'strong-growth':c;
  }
  function openSavegame(id){
    const s=baseData.savegames.find(x=>x.id===id);if(!s)return;selectedSavegame=id;renderSaveList();
    $('#saveDetail').innerHTML=`<div class="save-hero"><div><span class="test-status ${s.status}">${s.status}</span><h2>${s.name}</h2><p>${s.description}</p></div><div class="confidence-box"><strong>${s.files.length}</strong><span>Files tracked</span></div></div>
      <section class="test-section"><h3>Bestanden</h3><div class="save-files">${s.files.map(f=>`<article class="save-file-card"><div class="save-file-top"><div><h4>${f.name}</h4><small>${f.type}</small></div><span class="change-badge ${changeClass(f.change)}">${f.change}</span></div><div class="save-confidence"><span><b>Confidence</b><b>${f.confidence}%</b></span><div class="progress"><i style="width:${f.confidence}%"></i></div></div></article>`).join('')}</div></section>
      <section class="test-section"><h3>Gerelateerde tests</h3><div class="tag-list">${s.relatedTests.map(t=>`<button class="tag" data-save-test="${t}">${t}</button>`).join('')}</div></section>
      <section class="test-section"><h3>Differential analysis</h3><div class="diff-callout">${s.notes.join('<br>')}</div></section>`;
    $$('[data-save-test]').forEach(b=>b.onclick=()=>{switchView('research');openTest(b.dataset.saveTest)});
  }
  function fileState(save,ext){
    const f=save.files.find(x=>x.name.endsWith(ext));if(!f)return '<span class="matrix-change no">○</span>';
    const strong=f.change.toLowerCase().includes('strong');
    return `<span class="matrix-change ${strong?'strong':'yes'}">${strong?'▲':'✓'}</span>`;
  }
  function renderSaveMatrix(){
    $('#saveMatrixBody').innerHTML=baseData.savegames.map(s=>`<tr><td><strong>${s.name}</strong></td>${['.sav','.bin','.chs','.mhs','.phs','.dhs'].map(ext=>`<td>${fileState(s,ext)}</td>`).join('')}</tr>`).join('');
  }
  function renderSavegameExplorer(){
    renderSaveMetrics();populateSaveCategories();renderSaveList();renderSaveMatrix();
  }


  let selectedExecutableRecord = null;

  function allExecutableRecords(){
    return [
      ...baseData.executableFunctions.map(x=>({...x,recordType:'function'})),
      ...baseData.executableStructures.map(x=>({...x,recordType:'structure'})),
      ...baseData.executableModules.map(x=>({...x,recordType:'module'})),
      ...baseData.executableAddresses.map((x,i)=>({...x,id:'ADDRESS_'+i,name:x.label,description:x.notes,recordType:'address'}))
    ];
  }
  function exeStatusLabel(status){
    return {verified:'Verified',active:'Active',research:'Research',hypothesis:'Hypothesis',planned:'Planned',unresolved:'Unresolved'}[status]||status;
  }
  function renderExeMetrics(){
    const records=allExecutableRecords();
    const resolved=baseData.executableAddresses.filter(a=>a.status!=='unresolved').length;
    const avg=Math.round(records.reduce((a,r)=>a+(r.confidence||0),0)/Math.max(1,records.length));
    $('#exeMetrics').innerHTML=[
      ['Modules',baseData.executableModules.length],
      ['Functions',baseData.executableFunctions.length],
      ['Structures',baseData.executableStructures.length],
      ['Gem. confidence',avg+'%']
    ].map(([label,value])=>`<article class="panel metric"><span>${label}</span><strong>${value}</strong></article>`).join('');
  }
  function renderExeList(){
    const q=($('#exeSearch').value||'').toLowerCase().trim();
    const type=$('#exeTypeFilter').value;
    const records=allExecutableRecords().filter(r=>(!type||r.recordType===type)&&(!q||JSON.stringify(r).toLowerCase().includes(q)));
    $('#exeList').innerHTML=records.map(r=>`<button class="exe-link ${selectedExecutableRecord===r.id?'active':''}" data-exe-id="${r.id}" data-exe-type="${r.recordType}">
      <div class="exe-link-top"><div><strong>${r.name||r.label}</strong>${r.address?`<code>${r.address}</code>`:''}</div><span class="record-type ${r.recordType}">${r.recordType}</span></div>
      <p>${r.description||r.notes||''}</p>
    </button>`).join('');
    $$('[data-exe-id]').forEach(b=>b.onclick=()=>openExecutableRecord(b.dataset.exeId,b.dataset.exeType));
  }
  function getExecutableRecord(id,type){
    if(type==='function')return baseData.executableFunctions.find(x=>x.id===id);
    if(type==='structure')return baseData.executableStructures.find(x=>x.id===id);
    if(type==='module')return baseData.executableModules.find(x=>x.id===id);
    const index=+id.replace('ADDRESS_','');return baseData.executableAddresses[index];
  }
  function openExecutableRecord(id,type){
    const r=getExecutableRecord(id,type);if(!r)return;selectedExecutableRecord=id;renderExeList();
    if(type==='function')renderFunctionRecord(r);
    else if(type==='structure')renderStructureRecord(r);
    else if(type==='module')renderModuleRecord(r);
    else renderAddressRecord(r);
  }
  function baseExeHero(r,type){
    return `<div class="exe-hero"><div><span class="record-type ${type}">${type}</span><h2>${r.name||r.label}</h2>${r.address?`<span class="exe-address">${r.address}</span>`:''}<p>${r.description||r.notes||''}</p></div><div class="confidence-box"><strong>${r.confidence||0}%</strong><span>Confidence</span></div></div>`;
  }
  function renderFunctionRecord(r){
    const engine=baseData.engines.find(e=>e.id===r.engine);
    $('#exeDetail').innerHTML=baseExeHero(r,'function')+`
      <div class="exe-meta-grid"><div class="exe-meta"><span>Status</span><strong>${exeStatusLabel(r.status)}</strong></div><div class="exe-meta"><span>Engine</span><strong>${engine?engine.name:r.engine}</strong></div><div class="exe-meta"><span>Category</span><strong>${r.category}</strong></div></div>
      <section class="test-section"><h3>Signature</h3><div class="code-block">${r.signature}</div></section>
      <section class="test-section"><h3>Calls</h3><div class="xref-list">${r.calls.map(x=>`<div class="xref-card">${x}</div>`).join('')}</div></section>
      <section class="test-section"><h3>Cross references</h3><div class="xref-list">${r.crossReferences.map(x=>`<div class="xref-card">${x}</div>`).join('')}</div></section>
      <section class="test-section"><h3>Evidence</h3><div class="tag-list">${r.evidence.map(x=>`<span class="tag">${x}</span>`).join('')}</div></section>
      <section class="test-section"><h3>Related tests</h3><div class="tag-list">${r.relatedTests.length?r.relatedTests.map(x=>`<button class="tag" data-exe-test="${x}">${x}</button>`).join(''):'<span>Geen tests gekoppeld.</span>'}</div></section>
      <section class="test-section"><h3>Related savegames</h3><div class="tag-list">${r.relatedSavegames.length?r.relatedSavegames.map(x=>`<button class="tag" data-exe-save="${x}">${x}</button>`).join(''):'<span>Geen savegames gekoppeld.</span>'}</div></section>
      <section class="test-section"><h3>Research notes</h3><div class="item-list">${r.notes.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section>
      <section class="test-section"><h3>Open questions</h3><div class="item-list">${r.openQuestions.map(x=>`<div class="item hyp"><i></i><span>${x}</span></div>`).join('')}</div></section>`;
    bindExeLinks();
  }
  function renderStructureRecord(r){
    const engine=baseData.engines.find(e=>e.id===r.engine);
    $('#exeDetail').innerHTML=baseExeHero(r,'structure')+`
      <div class="exe-meta-grid"><div class="exe-meta"><span>Status</span><strong>${exeStatusLabel(r.status)}</strong></div><div class="exe-meta"><span>Engine</span><strong>${engine?engine.name:r.engine}</strong></div><div class="exe-meta"><span>Size</span><strong>${r.size}</strong></div></div>
      <section class="test-section"><h3>Fields</h3><div class="table-wrap"><table class="field-table"><thead><tr><th>Offset</th><th>Name</th><th>Type</th><th>Status</th></tr></thead><tbody>${r.fields.map(f=>`<tr><td><code>${f.offset}</code></td><td>${f.name}</td><td>${f.type}</td><td>${f.status}</td></tr>`).join('')}</tbody></table></div></section>
      <section class="test-section"><h3>Related functions</h3><div class="tag-list">${r.relatedFunctions.map(x=>`<button class="tag" data-exe-function="${x}">${x}</button>`).join('')}</div></section>
      <section class="test-section"><h3>Notes</h3><div class="item-list">${r.notes.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section>`;
    bindExeLinks();
  }
  function renderModuleRecord(r){
    $('#exeDetail').innerHTML=baseExeHero(r,'module')+`
      <div class="exe-meta-grid"><div class="exe-meta"><span>Status</span><strong>${exeStatusLabel(r.status)}</strong></div><div class="exe-meta"><span>Format</span><strong>${r.format}</strong></div><div class="exe-meta"><span>Architecture</span><strong>${r.architecture}</strong></div></div>
      <section class="test-section"><h3>Tools</h3><div class="exe-tool-list">${r.tools.map(x=>`<span class="exe-tool">${x}</span>`).join('')}</div></section>
      <section class="test-section"><h3>Notes</h3><div class="item-list">${r.notes.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section>`;
  }
  function renderAddressRecord(r){
    const engine=baseData.engines.find(e=>e.id===r.engine);
    $('#exeDetail').innerHTML=baseExeHero(r,'address')+`
      <div class="exe-meta-grid"><div class="exe-meta"><span>Status</span><strong>${exeStatusLabel(r.status)}</strong></div><div class="exe-meta"><span>Kind</span><strong>${r.kind}</strong></div><div class="exe-meta"><span>Engine</span><strong>${engine?engine.name:r.engine}</strong></div></div>
      <section class="test-section"><h3>Notes</h3><div class="note-card">${r.notes}</div></section>`;
  }
  function bindExeLinks(){
    $$('[data-exe-test]').forEach(b=>b.onclick=()=>{switchView('research');openTest(b.dataset.exeTest)});
    $$('[data-exe-save]').forEach(b=>b.onclick=()=>{switchView('savegames');openSavegame(b.dataset.exeSave)});
    $$('[data-exe-function]').forEach(b=>b.onclick=()=>openExecutableRecord(b.dataset.exeFunction,'function'));
  }
  function renderReverseStatus(){
    $('#reverseStatusBody').innerHTML=baseData.engines.map(e=>{
      const fn=baseData.executableFunctions.some(f=>f.engine===e.id);
      const st=baseData.executableStructures.some(s=>s.engine===e.id);
      const exe=fn||st||e.id==='executable';
      const memory=e.id==='executable'?'◐':'○';
      const save=['savegame','player','training','tactics','match','transfer','competition'].includes(e.id);
      return `<tr><td><strong>${e.name}</strong></td><td>✓</td><td>${save?'✓':'○'}</td><td>${exe?'◐':'○'}</td><td>${memory}</td><td>${e.confidence}%</td></tr>`;
    }).join('');
  }
  function renderAddressRegister(){
    $('#addressRegisterBody').innerHTML=baseData.executableAddresses.map(a=>`<tr><td><code>${a.address}</code></td><td>${a.label}</td><td>${a.kind}</td><td>${a.engine}</td><td><span class="address-status ${a.status}">${a.status}</span></td><td>${a.confidence}%</td></tr>`).join('');
  }
  function renderExecutableExplorer(){
    renderExeMetrics();renderExeList();renderReverseStatus();renderAddressRegister();
  }


  let selectedScreenAnalysis=null;
  function renderRegistry(){const q=($('#registrySearch').value||'').toLowerCase();const ds=[...new Set(baseData.engineRegistryV1.map(e=>e.domain))];$('#registryDomains').innerHTML=ds.map(d=>{const es=baseData.engineRegistryV1.filter(e=>e.domain===d&&(!q||(e.name+' '+d).toLowerCase().includes(q)));return es.length?`<section class="panel registry-domain"><h3>${d}</h3><div class="registry-grid">${es.map(e=>`<article class="registry-engine"><div class="registry-engine-top"><div><h4>${e.name}</h4><small>${e.status}</small></div><strong>${e.progress}%</strong></div><div class="progress"><i style="width:${e.progress}%"></i></div><small>Confidence ${e.confidence}%</small></article>`).join('')}</div></section>`:''}).join('')}
  function renderDiscoveries(){const q=($('#discoverySearch').value||'').toLowerCase();$('#discoveryList').innerHTML=baseData.discoveries.filter(d=>!q||JSON.stringify(d).toLowerCase().includes(q)).map(d=>`<article class="panel discovery-card"><div class="discovery-head"><div><span class="badge active">${d.id}</span><h3>${d.title}</h3></div><div class="confidence-box"><strong>${d.confidence}%</strong><span>Confidence</span></div></div><p>${d.summary}</p>${d.screens.map(x=>`<span class="source-pill">Screen ${x}</span>`).join('')}${d.engines.map(x=>`<span class="source-pill">${x}</span>`).join('')}${d.confirmedBy.map(x=>`<span class="source-pill yes">${x}</span>`).join('')}</article>`).join('')}
  function renderScreenList(){const q=($('#screenSearch').value||'').toLowerCase();$('#screenList').innerHTML=baseData.screenAnalyses.filter(s=>!q||JSON.stringify(s).toLowerCase().includes(q)).map(s=>`<button class="screen-link ${selectedScreenAnalysis===s.id?'active':''}" data-screen-analysis="${s.id}"><strong>${s.chapter} · ${s.title}</strong><small>Screenshot ${s.id}</small></button>`).join('');$$('[data-screen-analysis]').forEach(b=>b.onclick=()=>openScreenAnalysis(b.dataset.screenAnalysis))}
  function openScreenAnalysis(id){const s=baseData.screenAnalyses.find(x=>x.id===id);selectedScreenAnalysis=id;renderScreenList();$('#screenDetail').innerHTML=`<span class="badge active">Screenshot ${s.id}</span><h2>${s.chapter} · ${s.title}</h2><p class="purpose">${s.purpose}</p><section class="ppas-section"><h3>Engines</h3><div class="tag-list">${s.engines.map(x=>`<span class="tag">${x}</span>`).join('')}</div></section><section class="ppas-section"><h3>UI analysis</h3><div class="item-list">${s.ui.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section><section class="ppas-section"><h3>Workflow</h3><div class="workflow-flow">${s.workflow.map(x=>`<span class="workflow-step">${x}</span>`).join('')}</div></section><section class="ppas-section"><h3>Discoveries</h3><div class="tag-list">${s.discoveries.map(x=>`<span class="tag">${x}</span>`).join('')}</div></section><section class="ppas-section"><h3>Reverse engineering targets</h3><div class="item-list">${s.reverseTargets.map(x=>`<div class="item"><i></i><span>${x}</span></div>`).join('')}</div></section><section class="ppas-section"><h3>Open questions</h3><div class="item-list">${s.openQuestions.map(x=>`<div class="item hyp"><i></i><span>${x}</span></div>`).join('')}</div></section><section class="ppas-section"><h3>Validation</h3><div class="validation-grid">${Object.entries(s.validation).map(([k,v])=>`<div class="validation-card ${v?'yes':''}"><b>${v?'✓':'○'}</b><span>${k}</span></div>`).join('')}</div></section>`}
  function renderPrinciples(){$('#principleGrid').innerHTML=baseData.designPrinciples.map(p=>`<article class="panel principle-card"><span class="pid">${p.id}</span><h3>${p.title}</h3><p>${p.summary}</p>${p.examples.map(x=>`<span class="example-chip">${x}</span>`).join('')}</article>`).join('')}
  function renderEngineRegistryV1(){renderRegistry();renderDiscoveries();renderScreenList();renderPrinciples()}
  function exportProgress(){
    const payload={version:baseData.version,exported:new Date().toISOString(),engines:baseData.engines.map(e=>({id:e.id,progress:e.progress,confidence:e.confidence,status:e.status}))};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.download='ppcc-progress.json';a.click();URL.revokeObjectURL(a.href);toast('Voortgang geëxporteerd')
  }

  $$('.nav').forEach(n=>n.onclick=()=>switchView(n.dataset.view));
  $$('[data-go]').forEach(b=>b.onclick=()=>switchView(b.dataset.go));
  $('#explorerSearch').oninput=e=>renderExplorerList(e.target.value);
  $('#graphSearch').oninput=e=>renderGraph(e.target.value);
  $('#graphReset').onclick=resetGraph;
  $('#testSearch').oninput=renderTestList;
  $('#testStatusFilter').onchange=renderTestList;
  $('#saveSearch').oninput=renderSaveList;
  $('#saveCategoryFilter').onchange=renderSaveList;
  $('#exeSearch').oninput=renderExeList;
  $('#exeTypeFilter').onchange=renderExeList;
  $('#registrySearch').oninput=renderRegistry;
  $('#discoverySearch').oninput=renderDiscoveries;
  $('#screenSearch').oninput=renderScreenList;
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
