import { useEffect, useMemo, useState } from 'react'
import {
  Activity, BookOpen, BrainCircuit, ChevronRight, Download, Flame, GitBranch,
  Home, Menu, Moon, Search, Sun, Timeline, X, Database, Beaker, FileText
} from 'lucide-react'
import './App.css'

type Status = 'complete' | 'active' | 'research' | 'blocked'
type View = 'home' | 'engines' | 'docs' | 'evidence' | 'timeline'

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

const initialEngines: Engine[] = [
  {id:'manual',name:'Handleidinganalyse',group:'Bronnen',progress:100,confidence:100,status:'complete',summary:'De volledige originele handleiding is als primaire ontwerpbron verwerkt.',facts:['Alle pagina’s behandeld','Terminologie vastgelegd','Koppelingen naar engines en domeinobjecten'],hypotheses:[],next:'Blijvend gebruiken als functionele referentie.',tests:['HM-001 t/m HM-088']},
  {id:'savegame',name:'Savegame Engine',group:'Reverse engineering',progress:70,confidence:72,status:'active',summary:'Modulaire save-opbouw onderzocht met gecontroleerde testreeksen.',facts:['.sav en .bin reageren op team- en tactiekwijzigingen','.mhs groeit na wedstrijden','.chs groeit bij club- en transfergebeurtenissen'],hypotheses:['.phs bevat vaste spelerrecords','.dhs bevat divisie- of competitiehistorie'],next:'Binaire offsets, records en eventuele checksums vaststellen.',tests:['Baseline','TM-01 t/m TM-07','TR-01/02','ME-01']},
  {id:'player',name:'Player Engine',group:'Engines',progress:62,confidence:68,status:'active',summary:'Zichtbare skills, hidden attributes, potential en dynamische wedstrijdwaarden zijn geïdentificeerd.',facts:['Acht zichtbare trainbare skills','Hidden attributes bestaan','Fitness en morale veranderen tijdens wedstrijden'],hypotheses:['Dynamische overall rating','Leeftijd × potential × training bepaalt ontwikkeling'],next:'Player-recordstructuur en developmentformule technisch bewijzen.',tests:['PS-01/02','ME-01','Editoronderzoek']},
  {id:'training',name:'Training Engine',group:'Engines',progress:90,confidence:92,status:'complete',summary:'Teamtraining, presets, Custom-schema’s, trainingskamp en individuele training zijn functioneel beschreven.',facts:['Balanced/Defensive/Offensive/Week Off','Custom na wijziging','Delegate hangt af van Head Trainer rating'],hypotheses:['Exacte effectgroottes per trainingsactiviteit'],next:'Ontwikkelings- en vermoeidheidsformules reverse engineeren.',tests:['Balanced → Offensive','Offensive → Defensive']},
  {id:'tactics',name:'Tactical Engine',group:'Engines',progress:88,confidence:90,status:'active',summary:'Formaties, teamorders, spelerorders, marking, coverage en set pieces zijn beschreven.',facts:['Tactiek bestaat uit situaties','Player Orders vormen een bias op Team Orders','Coverage beïnvloedt belasting'],hypotheses:['Exacte runtime-weging van orders en coverage'],next:'Gecontroleerde wedstrijdbatches met één tactische variabele uitvoeren.',tests:['TM-01 t/m TM-07','Matchscreenshots']},
  {id:'match',name:'Match Engine',group:'Engines',progress:55,confidence:62,status:'active',summary:'Niet-deterministische eventgeneratie, live statistieken en dynamische spelersstatus zijn bevestigd.',facts:['Resultaten variëren','Team- en spelerstatistieken worden live bijgehouden','Presentatie staat los van simulatie'],hypotheses:['Centrale event queue','Hidden composite ratings sturen eventkansen'],next:'Dezelfde wedstrijd minimaal tienmaal gecontroleerd simuleren.',tests:['ME-01','Herhaalde wedstrijden']},
  {id:'transfer',name:'Transfer & Contract Engine',group:'Engines',progress:68,confidence:75,status:'active',summary:'Bod, clubreactie, spelersonderhandeling, contractstatus, shortlist en huur zijn beschreven.',facts:['Club- en spelersonderhandeling zijn aparte fasen','Shortlist werkt als monitoringsysteem'],hypotheses:['AI-biedingsmodel','Waardebepaling en onderhandelingsgewichten'],next:'Een volledige transfer van bod tot inschrijving volgen.',tests:['TR-01/02','PS-01/02']},
  {id:'finance',name:'Finance & Banking Engine',group:'Engines',progress:58,confidence:68,status:'research',summary:'Tickets, merchandising, sponsoring, leningen, overdraft en projecties zijn functioneel gemodelleerd.',facts:['Ticketprijs beïnvloedt opkomst','Projecties zijn niet zelfcorrigerend','Leningen en overdraft zijn afzonderlijk'],hypotheses:['Attendance-formule','Sponsor- en bank-AI'],next:'Gecontroleerde prijs-, sponsor- en krediettests uitvoeren.',tests:[]},
  {id:'stadium',name:'Stadium Engine',group:'Engines',progress:62,confidence:72,status:'research',summary:'Bouwprojecten hebben een levenscyclus, betalingen, voortgang en onderhoudskosten.',facts:['Gefaseerde betalingen','Onderhoud na oplevering','Faciliteiten beïnvloeden club en supporters'],hypotheses:['Exacte bouwduur en ROI per project'],next:'Bouwproject in savegames isoleren.',tests:[]},
  {id:'staff',name:'Staff Engine',group:'Engines',progress:70,confidence:78,status:'active',summary:'Persoonlijkheden, relaties, werkdruk, afdelingsrollen, rapporten en delegatie zijn beschreven.',facts:['Staf kan meerdere rollen hebben','Overwerken veroorzaakt klachten','Rapportkwaliteit hangt af van medewerkers'],hypotheses:['Relatiematrix en exacte kwaliteitsmodifiers'],next:'Stafleden met verschillende ratings op dezelfde taak vergelijken.',tests:[]},
  {id:'supporters',name:'Supporter Engine',group:'Engines',progress:48,confidence:58,status:'research',summary:'Resultaten, ticketprijzen en faciliteiten beïnvloeden tevredenheid, opkomst en omzet.',facts:['Hoge prijzen kunnen opkomst verlagen','Sportief succes verhoogt prijsruimte'],hypotheses:['Invloed van weer, tegenstander, derby en loyaliteit'],next:'Attendance-experimenten met gecontroleerde variabelen.',tests:[]},
  {id:'competition',name:'Competition Engine',group:'Engines',progress:40,confidence:50,status:'research',summary:'Fixtures, standen, bekers, regels, historie en seizoensovergang zijn functioneel aanwezig.',facts:['Wedstrijdregels zijn raadpleegbaar','Historische standen en fixtures worden bewaard'],hypotheses:['Planningalgoritme','Promotie/degradatie en Europese kwalificatie'],next:'Competitie- en seizoenssavegames verzamelen.',tests:[]},
  {id:'executable',name:'Executable Reconstruction',group:'Reverse engineering',progress:15,confidence:20,status:'research',summary:'Ghidra, x32dbg en API Monitor zijn voorbereid; enginegerichte analyse moet nog beginnen.',facts:['UEFA2000b.exe is de werkende executable','DirectDraw rendering is aangeroepen'],hypotheses:['Enginefuncties zijn via data- en stringsreferenties te koppelen'],next:'Player- en save-structuren als eerste in Ghidra lokaliseren.',tests:['Ghidra setup','API Monitor','x32dbg']}
]

const documents = [
  ['Reverse Engineering Logbook','Chronologische tests, observaties en technisch bewijs.','Reverse_Engineering_Logbook_v0.3.md'],
  ['Functional Specification','Wat de originele game functioneel doet.','Functional_Specification_v0.3.md'],
  ['Engine Specification','Simulatie-engines, afhankelijkheden en open vragen.','Engine_Specification_v0.3.md'],
  ['Domain Model Specification','Domeinobjecten en hun onderlinge relaties.','Domain_Model_Specification_v0.3.md'],
  ['Design Decision Log','Vastgelegde ontwerpkeuzes en fidelity-regels.','Design_Decision_Log_v0.3.md'],
  ['Knowledge Graph','Concepten, bewijs en relaties tussen systemen.','Knowledge_Graph_v0.3.md'],
  ['Requirements Traceability Matrix','Bewijs per categorie en bron.','Requirements_Traceability_Matrix_v0.3.csv'],
  ['Originele handleiding','Originele Engelstalige UEFA Manager 2000-handleiding.','UEFA_Manager_2000_Manual_EN.pdf']
]

const milestones = [
  ['5 juli 2026','Project Phoenix gestart','Doel: eerst een functioneel 1-op-1 webspel, daarna pas remasteren.'],
  ['6 juli 2026','Gecontroleerde testcatalogus','Baseline-, training-, team-, transfer- en wedstrijdtests gestart.'],
  ['12 juli 2026','Handleiding volledig verwerkt','De originele handleiding is als primaire ontwerpbron opgenomen.'],
  ['13 juli 2026','PPCC v1.1','De eerste volledig geteste productiebuild van het Command Center.']
]

const statusStyle: Record<Status,{label:string;className:string;bar:string}> = {
  complete:{label:'Afgerond',className:'badge complete',bar:'bar complete'},
  active:{label:'Actief',className:'badge active',bar:'bar active'},
  research:{label:'Onderzoek',className:'badge research',bar:'bar research'},
  blocked:{label:'Geblokkeerd',className:'badge blocked',bar:'bar blocked'}
}

export default function App(){
  const [view,setView]=useState<View>('home')
  const [engines,setEngines]=useState<Engine[]>(()=>{
    const saved=localStorage.getItem('ppcc-v11-engines')
    return saved?JSON.parse(saved):initialEngines
  })
  const [query,setQuery]=useState('')
  const [selected,setSelected]=useState<Engine|null>(null)
  const [dark,setDark]=useState(true)
  const [mobile,setMobile]=useState(false)
  useEffect(()=>localStorage.setItem('ppcc-v11-engines',JSON.stringify(engines)),[engines])
  useEffect(()=>{ document.body.classList.toggle('light',!dark) },[dark])
  const overall=Math.round(engines.reduce((s,e)=>s+e.progress,0)/engines.length)
  const confidence=Math.round(engines.reduce((s,e)=>s+e.confidence,0)/engines.length)
  const filtered=useMemo(()=>engines.filter(e=>!query||`${e.name} ${e.group} ${e.summary}`.toLowerCase().includes(query.toLowerCase())),[engines,query])
  const nav:[View,React.ComponentType<{size?:number}>,string][]=[['home',Home,'Overzicht'],['engines',BrainCircuit,'Engines'],['docs',BookOpen,'Documentatie'],['evidence',GitBranch,'Evidence'],['timeline',Timeline,'Tijdlijn']]
  const updateProgress=(id:string,progress:number)=>setEngines(x=>x.map(e=>e.id===id?{...e,progress}:e))
  return <div className="app-shell">
    <aside className="sidebar">
      <Brand/>
      <nav>{nav.map(([id,Icon,label])=><button key={id} className={view===id?'nav-button active':'nav-button'} onClick={()=>setView(id)}><Icon size={18}/>{label}</button>)}</nav>
      <div className="sprint-card"><span>Sprint 1</span><strong>Reverse Engineering</strong><div className="progress-track"><i style={{width:`${overall}%`}}/></div><small>{overall}% gewogen voortgang</small></div>
    </aside>
    <div className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobile(true)}><Menu size={20}/></button>
        <div className="top-title"><span>Project Phoenix Command Center</span><strong>{nav.find(n=>n[0]===view)?.[2]}</strong></div>
        <div className="top-actions"><button onClick={()=>setDark(v=>!v)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><a href="./docs/Project_Phoenix_Documentation_v0.3.zip" download><Download size={17}/>Documentatie</a></div>
      </header>
      <main>
        {view==='home'&&<HomeView engines={engines} overall={overall} confidence={confidence} go={setView} select={setSelected}/>} 
        {view==='engines'&&<EnginesView engines={filtered} query={query} setQuery={setQuery} select={setSelected}/>} 
        {view==='docs'&&<DocsView/>}
        {view==='evidence'&&<EvidenceView engines={engines}/>} 
        {view==='timeline'&&<TimelineView/>}
      </main>
    </div>
    {mobile&&<div className="mobile-drawer"><div className="mobile-panel"><div className="mobile-head"><Brand/><button onClick={()=>setMobile(false)}><X/></button></div><nav>{nav.map(([id,Icon,label])=><button key={id} onClick={()=>{setView(id);setMobile(false)}}><Icon size={19}/>{label}</button>)}</nav></div></div>}
    {selected&&<EngineDrawer engine={selected} close={()=>setSelected(null)} onProgress={updateProgress}/>} 
  </div>
}

function Brand(){return <div className="brand"><div className="brand-icon"><Flame size={23}/></div><div><strong>Project Phoenix</strong><span>Command Center · v1.1</span></div></div>}
function Header({title,subtitle}:{title:string;subtitle:string}){return <div className="section-header"><h2>{title}</h2><p>{subtitle}</p></div>}
function HomeView({engines,overall,confidence,go,select}:{engines:Engine[];overall:number;confidence:number;go:(v:View)=>void;select:(e:Engine)=>void}){
  const lowest=[...engines].sort((a,b)=>a.progress-b.progress).slice(0,5)
  return <div className="stack">
    <section className="hero-grid"><div className="panel hero"><span className="eyebrow">Milestone 1 bereikt</span><h2>Van game-archeologie naar een bewijsbare digitale blauwdruk.</h2><p>Het centrale zenuwstelsel voor documentatie, reverse engineering, bewijs, planning en later live engine-debugging.</p><div className="button-row"><button onClick={()=>go('engines')} className="primary">Bekijk engines</button><button onClick={()=>go('docs')}>Lees documentatie</button></div></div><div className="panel ring-panel"><ProgressRing value={overall}/></div></section>
    <section className="metrics"><Metric icon={Activity} value={`${overall}%`} label="Gewogen voortgang"/><Metric icon={Beaker} value={`${confidence}%`} label="Gemiddelde confidence"/><Metric icon={Database} value={String(engines.filter(e=>e.status==='active').length)} label="Actief onderzocht"/><Metric icon={FileText} value={String(documents.length)} label="Documenten"/></section>
    <section className="home-lower"><div className="panel"><Header title="Engine-overzicht" subtitle="Klik voor feiten, hypotheses, tests en vervolgstappen."/><div className="engine-mini-grid">{engines.slice(0,6).map(e=><EngineCard key={e.id} engine={e} onClick={()=>select(e)} compact/>)}</div></div><div className="panel"><Header title="Onderzoeksfocus" subtitle="Categorieën met de laagste voortgang."/><div className="focus-list">{lowest.map(e=><button key={e.id} onClick={()=>select(e)}><div><strong>{e.name}</strong><b>{e.progress}%</b></div><span>{e.next}</span></button>)}</div></div></section>
  </div>
}
function EnginesView({engines,query,setQuery,select}:{engines:Engine[];query:string;setQuery:(q:string)=>void;select:(e:Engine)=>void}){return <div><Header title="Engine Registry" subtitle="Functionele kennis, technisch bewijs en open onderzoek per engine."/><div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek in engines..."/></div><div className="engine-grid">{engines.map(e=><EngineCard key={e.id} engine={e} onClick={()=>select(e)}/>)}</div></div>}
function EngineCard({engine,onClick,compact=false}:{engine:Engine;onClick:()=>void;compact?:boolean}){const s=statusStyle[engine.status];return <button onClick={onClick} className={`panel engine-card ${compact?'compact':''}`}><div className="engine-top"><div><span className={s.className}>{s.label}</span><h3>{engine.name}</h3><small>{engine.group}</small></div><b>{engine.progress}%</b></div>{!compact&&<p>{engine.summary}</p>}<div className="progress-track"><i className={s.bar} style={{width:`${engine.progress}%`}}/></div><div className="engine-meta"><span>Confidence {engine.confidence}%</span><ChevronRight size={16}/></div></button>}
function DocsView(){return <div><Header title="Documentatiebibliotheek" subtitle="Werkdocumenten en originele bronnen, direct downloadbaar."/><div className="doc-grid">{documents.map(([title,desc,file])=><article className="panel doc-card" key={file}><BookOpen size={24}/><h3>{title}</h3><p>{desc}</p><a href={`./docs/${file}`} download><Download size={16}/>Download</a></article>)}</div></div>}
function EvidenceView({engines}:{engines:Engine[]}){return <div><Header title="Evidence & Traceability" subtitle="Welke bron ondersteunt de huidige kennis per engine?"/><div className="panel table-wrap"><table><thead><tr><th>Engine</th><th>Handleiding</th><th>Tests</th><th>Savegames</th><th>Executable</th><th>Confidence</th></tr></thead><tbody>{engines.map(e=><tr key={e.id}><td>{e.name}</td><td>✓</td><td>{e.tests.length?'✓':'○'}</td><td>{['savegame','player','training','tactics','match','transfer'].includes(e.id)?'✓':'○'}</td><td>{e.id==='executable'?'◐':'○'}</td><td>{e.confidence}%</td></tr>)}</tbody></table></div></div>}
function TimelineView(){return <div><Header title="Projecttijdlijn" subtitle="Belangrijkste mijlpalen van Project Phoenix."/><div className="panel timeline">{milestones.map(([date,title,text])=><article key={title}><i/><span>{date}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>}
function EngineDrawer({engine,close,onProgress}:{engine:Engine;close:()=>void;onProgress:(id:string,p:number)=>void}){const s=statusStyle[engine.status];return <div className="drawer-backdrop" onMouseDown={close}><aside className="drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><div><span className={s.className}>{s.label}</span><h2>{engine.name}</h2><p>{engine.summary}</p></div><button onClick={close}><X/></button></div><div className="metrics two"><Metric icon={Activity} value={`${engine.progress}%`} label="Voortgang"/><Metric icon={Beaker} value={`${engine.confidence}%`} label="Confidence"/></div><div className="panel slider-card"><label>Voortgang lokaal aanpassen</label><input type="range" min="0" max="100" value={engine.progress} onChange={e=>onProgress(engine.id,+e.target.value)}/></div><SectionList title="Confirmed facts" items={engine.facts} tone="green"/><SectionList title="Hypotheses" items={engine.hypotheses} tone="amber"/><SectionList title="Gerelateerde tests" items={engine.tests} tone="blue"/><div className="panel next-card"><span>Volgende stap</span><p>{engine.next}</p></div></aside></div>}
function SectionList({title,items,tone}:{title:string;items:string[];tone:'green'|'amber'|'blue'}){return <section className="list-section"><h3>{title}</h3>{items.length?<ul>{items.map(i=><li key={i}><i className={tone}/>{i}</li>)}</ul>:<p>Geen items geregistreerd.</p>}</section>}
function Metric({icon:Icon,value,label}:{icon:React.ComponentType<{size?:number}>;value:string;label:string}){return <div className="panel metric"><Icon size={20}/><b>{value}</b><span>{label}</span></div>}
function ProgressRing({value}:{value:number}){return <div className="progress-ring" style={{background:`conic-gradient(#42d392 ${value*3.6}deg,#17304b 0)`}}><div><b>{value}%</b><span>Overall progress</span></div></div>}
