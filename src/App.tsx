import { useEffect, useMemo, useState } from 'react'

type Status = 'complete' | 'active' | 'research' | 'blocked'
type View = 'home' | 'engines' | 'docs' | 'evidence' | 'timeline' | 'updates' | 'manage'

type Engine = {
  id: string
  name: string
  group: string
  progress: number
  confidence: number
  status: Status
  summary: string
  facts: string[]
  hypotheses: string[]
  next: string
  tests: string[]
}

type ProjectData = {
  meta: { name: string; version: string; updated: string; phase: string; mission: string }
  engines: Engine[]
  documents: { title: string; description: string; file: string; type: string }[]
  milestones: { date: string; title: string; text: string }[]
  updates: { date: string; title: string; category: string; type: string; summary: string }[]
}

const statusMap: Record<Status, {label:string;color:string}> = {
  complete:{label:'Afgerond',color:'#42d392'},
  active:{label:'Actief',color:'#4aa8ff'},
  research:{label:'Onderzoek',color:'#ffbe55'},
  blocked:{label:'Geblokkeerd',color:'#ff6b75'}
}

const navItems: {id:View;label:string;icon:string}[] = [
  {id:'home',label:'Overzicht',icon:'⌂'},
  {id:'engines',label:'Engines',icon:'◈'},
  {id:'docs',label:'Documentatie',icon:'▤'},
  {id:'evidence',label:'Evidence',icon:'⌘'},
  {id:'timeline',label:'Tijdlijn',icon:'◷'},
  {id:'updates',label:'Updates',icon:'✦'},
  {id:'manage',label:'Beheer',icon:'⚙'}
]

function App(){
  const [data,setData] = useState<ProjectData|null>(null)
  const [view,setView] = useState<View>('home')
  const [query,setQuery] = useState('')
  const [selected,setSelected] = useState<Engine|null>(null)
  const [dark,setDark] = useState(true)
  const [mobile,setMobile] = useState(false)
  const [notice,setNotice] = useState('')

  useEffect(()=>{
    fetch('./content/project.json').then(r=>r.json()).then((base:ProjectData)=>{
      const local = localStorage.getItem('ppcc-local-data-v1')
      setData(local ? JSON.parse(local) : base)
    }).catch(()=>setNotice('project.json kon niet worden geladen.'))
  },[])

  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark])

  const saveLocal=(next:ProjectData)=>{
    setData(next)
    localStorage.setItem('ppcc-local-data-v1',JSON.stringify(next))
    toast('Lokale wijzigingen opgeslagen')
  }
  const toast=(msg:string)=>{setNotice(msg);setTimeout(()=>setNotice(''),2200)}

  const overall = useMemo(()=>data ? Math.round(data.engines.reduce((s,e)=>s+e.progress,0)/data.engines.length):0,[data])
  const avgConfidence = useMemo(()=>data ? Math.round(data.engines.reduce((s,e)=>s+e.confidence,0)/data.engines.length):0,[data])
  const filtered = useMemo(()=>{
    if(!data) return []
    const q=query.toLowerCase().trim()
    return data.engines.filter(e=>!q || `${e.name} ${e.group} ${e.summary}`.toLowerCase().includes(q))
  },[data,query])

  if(!data) return <div className="loading">PPCC wordt geladen…</div>

  const go=(v:View)=>{setView(v);setMobile(false);window.scrollTo({top:0,behavior:'smooth'})}
  const updateEngine=(id:string,patch:Partial<Engine>)=>saveLocal({...data,engines:data.engines.map(e=>e.id===id?{...e,...patch}:e)})
  const resetLocal=()=>{localStorage.removeItem('ppcc-local-data-v1');location.reload()}

  return <div className="app-shell">
    <aside className="sidebar desktop-only">
      <Brand data={data}/>
      <nav>{navItems.map(n=><button key={n.id} className={view===n.id?'active':''} onClick={()=>go(n.id)}><span>{n.icon}</span>{n.label}</button>)}</nav>
      <div className="side-progress card">
        <div className="eyebrow">{data.meta.phase}</div>
        <strong>{overall}%</strong>
        <Progress value={overall} color="#f77b16"/>
        <small>Gewogen voortgang</small>
      </div>
    </aside>

    <div className="main-wrap">
      <header className="topbar">
        <div className="mobile-brand mobile-only"><button className="icon-btn" onClick={()=>setMobile(true)}>☰</button><Brand data={data} compact/></div>
        <div className="desktop-only"><div className="eyebrow">Project Phoenix Command Center</div><h1>{navItems.find(n=>n.id===view)?.label}</h1></div>
        <div className="top-actions"><button className="icon-btn" onClick={()=>setDark(v=>!v)}>{dark?'☀':'☾'}</button><a className="primary-btn desktop-only" href="./Project_Phoenix_Documentation_v0.3.zip" download>↓ Documentatie</a></div>
      </header>

      <main>
        {view==='home' && <Home data={data} overall={overall} avgConfidence={avgConfidence} go={go} select={setSelected}/>} 
        {view==='engines' && <Engines engines={filtered} query={query} setQuery={setQuery} select={setSelected}/>} 
        {view==='docs' && <Docs data={data}/>} 
        {view==='evidence' && <Evidence data={data}/>} 
        {view==='timeline' && <TimelineView data={data}/>} 
        {view==='updates' && <Updates data={data}/>} 
        {view==='manage' && <Manage data={data} save={saveLocal} reset={resetLocal} toast={toast}/>} 
      </main>
    </div>

    {mobile && <div className="mobile-overlay"><div className="mobile-panel card"><div className="mobile-menu-head"><Brand data={data}/><button className="icon-btn" onClick={()=>setMobile(false)}>×</button></div><nav>{navItems.map(n=><button key={n.id} onClick={()=>go(n.id)}><span>{n.icon}</span>{n.label}</button>)}</nav></div></div>}
    {selected && <EngineDrawer engine={selected} close={()=>setSelected(null)} update={updateEngine}/>} 
    {notice && <div className="toast">{notice}</div>}
  </div>
}

function Brand({data,compact=false}:{data:ProjectData;compact?:boolean}){
  return <div className="brand"><div className="brand-mark">🔥</div><div><b>Project Phoenix</b>{!compact&&<small>Command Center · v{data.meta.version}</small>}</div></div>
}

function Home({data,overall,avgConfidence,go,select}:{data:ProjectData;overall:number;avgConfidence:number;go:(v:View)=>void;select:(e:Engine)=>void}){
  const focus=[...data.engines].sort((a,b)=>a.progress-b.progress).slice(0,5)
  return <div className="stack">
    <section className="hero-grid">
      <article className="hero card"><div className="eyebrow">Milestone 1 bereikt</div><h2>Van game-archeologie naar een bewijsbare digitale blauwdruk.</h2><p>{data.meta.mission} Het PPCC bewaakt kennis, bewijs, voortgang en vervolgstappen.</p><div className="actions"><button className="primary-btn" onClick={()=>go('engines')}>Bekijk engines</button><button className="secondary-btn" onClick={()=>go('docs')}>Lees documentatie</button></div></article>
      <article className="card ring-card"><Ring value={overall}/></article>
    </section>
    <section className="metrics"><Metric icon="◴" value={`${overall}%`} label="Gewogen voortgang"/><Metric icon="◎" value={`${avgConfidence}%`} label="Gemiddelde confidence"/><Metric icon="◉" value={String(data.engines.filter(e=>e.status==='active').length)} label="Actief onderzocht"/><Metric icon="▤" value={String(data.documents.length)} label="Documenten"/></section>
    <section className="split-grid">
      <article className="card section-card"><SectionHeader title="Engine-overzicht" subtitle="Klik voor feiten, hypotheses, tests en vervolgstappen."/><div className="mini-engine-grid">{data.engines.slice(0,6).map(e=><EngineCard key={e.id} engine={e} select={()=>select(e)} compact/>)}</div></article>
      <article className="card section-card"><SectionHeader title="Onderzoeksfocus" subtitle="Laagste huidige voortgang."/><div className="focus-list">{focus.map(e=><button key={e.id} onClick={()=>select(e)}><div><b>{e.name}</b><small>{e.next}</small></div><strong>{e.progress}%</strong></button>)}</div></article>
    </section>
  </div>
}

function Engines({engines,query,setQuery,select}:{engines:Engine[];query:string;setQuery:(q:string)=>void;select:(e:Engine)=>void}){
 return <div><SectionHeader title="Engine Registry" subtitle="Functionele kennis, technisch bewijs en open onderzoek per engine."/><div className="searchbox">⌕<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek in engines, groepen en samenvattingen…"/></div><div className="engine-grid">{engines.map(e=><EngineCard key={e.id} engine={e} select={()=>select(e)}/>)}</div></div>
}

function EngineCard({engine,select,compact=false}:{engine:Engine;select:()=>void;compact?:boolean}){
 const s=statusMap[engine.status]
 return <button className={`engine-card card ${compact?'compact':''}`} onClick={select} style={{'--status':s.color} as React.CSSProperties}><div className="engine-head"><div><span className="status-pill">● {s.label}</span><h3>{engine.name}</h3><small>{engine.group}</small></div><strong>{engine.progress}%</strong></div>{!compact&&<p>{engine.summary}</p>}<Progress value={engine.progress} color={s.color}/><footer><span>Confidence {engine.confidence}%</span><span>›</span></footer></button>
}

function Docs({data}:{data:ProjectData}){
 return <div><SectionHeader title="Documentatiebibliotheek" subtitle="Werkdocumenten en originele bronnen, direct downloadbaar."/><div className="doc-grid">{data.documents.map(d=><article className="doc-card card" key={d.file}><div className="doc-icon">▤</div><span>{d.type}</span><h3>{d.title}</h3><p>{d.description}</p><a href={`./docs/${d.file}`} download>↓ Download</a></article>)}</div></div>
}

function Evidence({data}:{data:ProjectData}){
 return <div><SectionHeader title="Evidence & Traceability" subtitle="Welke bronnen ondersteunen de huidige kennis?"/><div className="card table-wrap"><table><thead><tr><th>Engine</th><th>Handleiding</th><th>Tests</th><th>Savegames</th><th>Executable</th><th>Confidence</th></tr></thead><tbody>{data.engines.map(e=><tr key={e.id}><td><b>{e.name}</b></td><td>✓</td><td>{e.tests.length?'✓':'○'}</td><td>{['savegame','player','training','tactics','match','transfer'].includes(e.id)?'✓':'○'}</td><td>{e.id==='executable'?'◐':'○'}</td><td>{e.confidence}%</td></tr>)}</tbody></table></div></div>
}

function TimelineView({data}:{data:ProjectData}){
 return <div><SectionHeader title="Projecttijdlijn" subtitle="De ontwikkeling van Project Phoenix als levend onderzoeksproject."/><div className="timeline card">{data.milestones.map(m=><article key={m.title}><i></i><time>{new Date(m.date+'T12:00').toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'})}</time><h3>{m.title}</h3><p>{m.text}</p></article>)}</div></div>
}

function Updates({data}:{data:ProjectData}){
 return <div><SectionHeader title="Updatefeed" subtitle="Ontdekkingen, mijlpalen en wijzigingen in de kennisbasis."/><div className="updates-list">{data.updates.map((u,i)=><article className="card update-card" key={i}><div className="update-meta"><span>{u.type}</span><time>{new Date(u.date+'T12:00').toLocaleDateString('nl-NL')}</time></div><h3>{u.title}</h3><small>{u.category}</small><p>{u.summary}</p></article>)}</div></div>
}

function Manage({data,save,reset,toast}:{data:ProjectData;save:(d:ProjectData)=>void;reset:()=>void;toast:(s:string)=>void}){
 const [form,setForm]=useState({title:'',category:'General',type:'discovery',summary:'',date:new Date().toISOString().slice(0,10)})
 const addUpdate=()=>{if(!form.title.trim()||!form.summary.trim()){toast('Titel en samenvatting zijn verplicht');return}save({...data,meta:{...data.meta,updated:form.date},updates:[form,...data.updates]});setForm({...form,title:'',summary:''})}
 const exportAll=()=>downloadJson(data,'ppcc-update-pack.json')
 const importFile=(file:File)=>file.text().then(t=>{try{save(JSON.parse(t));toast('Updatepakket geïmporteerd')}catch{toast('Ongeldig JSON-bestand')}})
 return <div><SectionHeader title="Beheer & Update Packs" subtitle="Voeg lokaal updates toe en exporteer één bestand voor GitHub."/><div className="manage-grid"><article className="card form-card"><h3>Nieuwe update</h3><label>Datum<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Titel<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Bijvoorbeeld: Player record gevonden"/></label><label>Categorie<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label><label>Type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>discovery</option><option>milestone</option><option>test</option><option>documentation</option></select></label><label>Samenvatting<textarea value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} rows={5}/></label><button className="primary-btn" onClick={addUpdate}>Update lokaal toevoegen</button></article><article className="card form-card"><h3>Updatepakket</h3><p>Het PPCC slaat lokale wijzigingen in deze browser op. Exporteer daarna het volledige JSON-bestand en vervang op GitHub <code>public/content/project.json</code>.</p><button className="primary-btn" onClick={exportAll}>↓ Exporteer project.json</button><label className="file-button">↑ Importeer updatepakket<input type="file" accept=".json" onChange={e=>e.target.files?.[0]&&importFile(e.target.files[0])}/></label><button className="danger-btn" onClick={reset}>Lokale wijzigingen wissen</button></article></div></div>
}

function EngineDrawer({engine,close,update}:{engine:Engine;close:()=>void;update:(id:string,p:Partial<Engine>)=>void}){
 const [progress,setProgress]=useState(engine.progress)
 const [confidence,setConfidence]=useState(engine.confidence)
 return <div className="drawer-backdrop" onMouseDown={close}><aside className="drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="status-pill" style={{color:statusMap[engine.status].color}}>● {statusMap[engine.status].label}</span><h2>{engine.name}</h2><p>{engine.summary}</p></div><button className="icon-btn" onClick={close}>×</button></div><div className="drawer-metrics"><Metric icon="◴" value={`${progress}%`} label="Voortgang"/><Metric icon="◎" value={`${confidence}%`} label="Confidence"/></div><div className="card slider-card"><label>Voortgang<input type="range" min="0" max="100" value={progress} onChange={e=>setProgress(+e.target.value)}/></label><label>Confidence<input type="range" min="0" max="100" value={confidence} onChange={e=>setConfidence(+e.target.value)}/></label><button className="primary-btn" onClick={()=>update(engine.id,{progress,confidence})}>Lokaal opslaan</button></div><List title="Confirmed facts" items={engine.facts} color="#42d392"/><List title="Hypotheses" items={engine.hypotheses} color="#ffbe55"/><List title="Gerelateerde tests" items={engine.tests} color="#4aa8ff"/><div className="card next-card"><div className="eyebrow">Volgende stap</div><p>{engine.next}</p></div></aside></div>
}

function List({title,items,color}:{title:string;items:string[];color:string}){return <section className="drawer-section"><h3>{title}</h3>{items.length?items.map(i=><div className="list-item card" key={i}><i style={{background:color}}></i>{i}</div>):<p className="muted">Geen items geregistreerd.</p>}</section>}
function SectionHeader({title,subtitle}:{title:string;subtitle:string}){return <header className="section-header"><h2>{title}</h2><p>{subtitle}</p></header>}
function Metric({icon,value,label}:{icon:string;value:string;label:string}){return <article className="metric card"><span>{icon}</span><strong>{value}</strong><small>{label}</small></article>}
function Progress({value,color}:{value:number;color:string}){return <div className="progress"><i style={{width:`${value}%`,background:`linear-gradient(90deg,${color},#8fe8ff)`}}></i></div>}
function Ring({value}:{value:number}){return <div className="ring" style={{background:`conic-gradient(#42d392 ${value*3.6}deg,#17304b 0)`}}><div><strong>{value}%</strong><span>Overall progress</span></div></div>}
function downloadJson(obj:unknown,name:string){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;a.click();URL.revokeObjectURL(a.href)}

export default App
