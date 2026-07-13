import { useEffect, useMemo, useState } from 'react'
import {
  Activity, BookOpen, BrainCircuit, ChevronRight, Download, Flame, GitBranch,
  Home, Menu, Moon, Search, Sun, History, X, Database, Beaker, FileText
} from 'lucide-react'
import { documents, engines as initialEngines, milestones, type Engine, type Status } from './data/project'

const statusStyle: Record<Status, { label: string; cls: string; bar: string }> = {
  complete: { label: 'Afgerond', cls: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10', bar: 'from-emerald-500 to-teal-300' },
  active: { label: 'Actief', cls: 'text-sky-300 border-sky-400/30 bg-sky-400/10', bar: 'from-blue-500 to-cyan-300' },
  research: { label: 'Onderzoek', cls: 'text-amber-300 border-amber-400/30 bg-amber-400/10', bar: 'from-amber-500 to-yellow-300' },
  blocked: { label: 'Geblokkeerd', cls: 'text-rose-300 border-rose-400/30 bg-rose-400/10', bar: 'from-rose-500 to-red-300' },
}

type View = 'home' | 'engines' | 'docs' | 'evidence' | 'timeline'

function App() {
  const [view, setView] = useState<View>('home')
  const [engines, setEngines] = useState<Engine[]>(() => {
    const saved = localStorage.getItem('ppcc-engines-v01')
    return saved ? JSON.parse(saved) : initialEngines
  })
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Engine | null>(null)
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => localStorage.setItem('ppcc-engines-v01', JSON.stringify(engines)), [engines])
  useEffect(() => { document.documentElement.classList.toggle('light', !dark) }, [dark])

  const overall = Math.round(engines.reduce((sum, e) => sum + e.progress, 0) / engines.length)
  const confidence = Math.round(engines.reduce((sum, e) => sum + e.confidence, 0) / engines.length)
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return engines.filter(e => !q || `${e.name} ${e.group} ${e.summary}`.toLowerCase().includes(q))
  }, [engines, query])

  const nav = [
    ['home', Home, 'Overzicht'],
    ['engines', BrainCircuit, 'Engines'],
    ['docs', BookOpen, 'Documentatie'],
    ['evidence', GitBranch, 'Evidence'],
    ['timeline', History, 'Tijdlijn'],
  ] as const

  const changeProgress = (id: string, progress: number) =>
    setEngines(items => items.map(e => e.id === id ? { ...e, progress } : e))

  return (
    <div className="grid-noise min-h-screen text-slate-100 light:text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <aside className="hidden w-72 shrink-0 border-r border-slate-700/30 bg-slate-950/45 p-5 backdrop-blur-xl lg:block light:bg-white/50">
          <Brand />
          <nav className="mt-10 space-y-2">
            {nav.map(([id, Icon, label]) => (
              <button key={id} onClick={() => setView(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${view === id ? 'bg-sky-500/15 text-sky-300 light:text-sky-700' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white light:hover:bg-slate-200 light:hover:text-slate-900'}`}>
                <Icon size={18}/>{label}
              </button>
            ))}
          </nav>
          <div className="glass mt-10 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[.22em] text-slate-500">Sprint 1</p>
            <p className="mt-2 font-semibold">Reverse Engineering</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800 light:bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-phoenix-500 to-amber-300" style={{width: `${overall}%`}}/>
            </div>
            <p className="mt-2 text-xs text-slate-400">{overall}% gewogen voortgang</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-700/30 bg-slate-950/75 px-4 py-3 backdrop-blur-xl sm:px-7 light:bg-white/75">
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-slate-700/50 p-2"><Menu size={20}/></button>
              <Brand compact />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-sky-400">Project Phoenix Command Center</p>
              <h1 className="mt-1 text-lg font-semibold">{nav.find(n => n[0] === view)?.[2]}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDark(v => !v)} className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-2.5 light:bg-white">
                {dark ? <Sun size={18}/> : <Moon size={18}/>}
              </button>
              <a href="./Project_Phoenix_Documentation_v0.3.zip" download className="hidden items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-400 sm:flex">
                <Download size={17}/> Documentatie
              </a>
            </div>
          </header>

          <main className="p-4 sm:p-7 xl:p-9">
            {view === 'home' && <HomeView engines={engines} overall={overall} confidence={confidence} go={setView} setSelected={setSelected}/>}
            {view === 'engines' && <EnginesView engines={filtered} query={query} setQuery={setQuery} setSelected={setSelected}/>}
            {view === 'docs' && <DocsView/>}
            {view === 'evidence' && <EvidenceView engines={engines}/>}
            {view === 'timeline' && <TimelineView/>}
          </main>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 p-4 backdrop-blur">
          <div className="glass h-full rounded-3xl p-5">
            <div className="flex items-center justify-between"><Brand/><button onClick={() => setMobileOpen(false)}><X/></button></div>
            <nav className="mt-10 space-y-2">{nav.map(([id, Icon, label]) => (
              <button key={id} onClick={() => { setView(id); setMobileOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left font-semibold hover:bg-slate-800/60">
                <Icon size={19}/>{label}
              </button>
            ))}</nav>
          </div>
        </div>
      )}

      {selected && <EngineDrawer engine={selected} close={() => setSelected(null)} onProgress={changeProgress}/>}
    </div>
  )
}

function Brand({compact=false}:{compact?:boolean}) {
  return <div className="flex items-center gap-3">
    <div className={`${compact?'h-9 w-9':'h-11 w-11'} grid place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-500/20`}><Flame size={compact?19:23}/></div>
    <div><p className="font-black tracking-tight">Project Phoenix</p>{!compact && <p className="text-xs text-slate-500">Command Center · v0.1</p>}</div>
  </div>
}

function HomeView({engines, overall, confidence, go, setSelected}:{engines:Engine[];overall:number;confidence:number;go:(v:View)=>void;setSelected:(e:Engine)=>void}) {
  const lowest = [...engines].sort((a,b)=>a.progress-b.progress).slice(0,5)
  return <div className="space-y-7">
    <section className="grid gap-5 xl:grid-cols-[1.45fr_.55fr]">
      <div className="glass overflow-hidden rounded-3xl p-6 sm:p-9">
        <p className="text-xs font-extrabold uppercase tracking-[.25em] text-phoenix-400">Milestone 1 bereikt</p>
        <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] sm:text-6xl">Van game-archeologie naar een bewijsbare digitale blauwdruk.</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">Het centrale zenuwstelsel voor documentatie, reverse engineering, bewijs, planning en later live engine-debugging.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={()=>go('engines')} className="rounded-xl bg-sky-500 px-5 py-3 font-bold text-white hover:bg-sky-400">Bekijk engines</button>
          <button onClick={()=>go('docs')} className="rounded-xl border border-slate-600/50 px-5 py-3 font-bold hover:bg-slate-800/60 light:hover:bg-slate-100">Lees documentatie</button>
        </div>
      </div>
      <div className="glass flex min-h-72 items-center justify-center rounded-3xl p-7">
        <ProgressRing value={overall} label="Overall progress"/>
      </div>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={Activity} value={`${overall}%`} label="Gewogen voortgang"/>
      <Metric icon={Beaker} value={`${confidence}%`} label="Gemiddelde confidence"/>
      <Metric icon={Database} value={String(engines.filter(e=>e.status==='active').length)} label="Actief onderzocht"/>
      <Metric icon={FileText} value={String(documents.length)} label="Documenten"/>
    </section>

    <section className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
      <div className="glass rounded-3xl p-5 sm:p-7">
        <Header title="Engine-overzicht" subtitle="Klik op een kaart voor facts, hypotheses, tests en vervolgstappen."/>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {engines.slice(0,6).map(e=><EngineCard key={e.id} engine={e} onClick={()=>setSelected(e)} compact/> )}
        </div>
      </div>
      <div className="glass rounded-3xl p-5 sm:p-7">
        <Header title="Onderzoeksfocus" subtitle="Categorieën met de laagste huidige voortgang."/>
        <div className="mt-5 space-y-4">
          {lowest.map(e=><button key={e.id} onClick={()=>setSelected(e)} className="w-full rounded-2xl border border-slate-700/40 bg-slate-900/35 p-4 text-left hover:border-sky-500/40 light:bg-white">
            <div className="flex items-center justify-between gap-4"><span className="font-semibold">{e.name}</span><span className="font-black">{e.progress}%</span></div>
            <p className="mt-2 text-xs text-slate-400">{e.next}</p>
          </button>)}
        </div>
      </div>
    </section>
  </div>
}

function EnginesView({engines, query, setQuery, setSelected}:{engines:Engine[];query:string;setQuery:(q:string)=>void;setSelected:(e:Engine)=>void}) {
  return <div>
    <Header title="Engine Registry" subtitle="Functionele kennis, technisch bewijs en open onderzoek per simulatie-engine."/>
    <div className="glass mt-6 flex items-center gap-3 rounded-2xl px-4 py-3">
      <Search size={18} className="text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek in engines, groepen en samenvattingen…" className="w-full bg-transparent outline-none placeholder:text-slate-600"/>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{engines.map(e=><EngineCard key={e.id} engine={e} onClick={()=>setSelected(e)}/>)}</div>
  </div>
}

function EngineCard({engine,onClick,compact=false}:{engine:Engine;onClick:()=>void;compact?:boolean}) {
  const s=statusStyle[engine.status]
  return <button onClick={onClick} className={`glass group w-full rounded-2xl ${compact?'p-4':'p-5'} text-left transition hover:-translate-y-1 hover:border-sky-500/40`}>
    <div className="flex items-start justify-between gap-4">
      <div><span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${s.cls}`}>{s.label}</span><h3 className="mt-3 font-bold">{engine.name}</h3><p className="mt-1 text-xs text-slate-500">{engine.group}</p></div>
      <span className="text-2xl font-black">{engine.progress}%</span>
    </div>
    {!compact && <p className="mt-4 min-h-16 text-sm leading-6 text-slate-400">{engine.summary}</p>}
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800 light:bg-slate-200"><div className={`h-full rounded-full bg-gradient-to-r ${s.bar}`} style={{width:`${engine.progress}%`}}/></div>
    <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>Confidence {engine.confidence}%</span><ChevronRight size={16} className="transition group-hover:translate-x-1"/></div>
  </button>
}

function DocsView() {
  return <div><Header title="Documentatiebibliotheek" subtitle="Werkdocumenten en originele bronnen, direct downloadbaar."/>
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{documents.map(([title,desc,file])=>
      <article key={file} className="glass flex min-h-52 flex-col rounded-3xl p-6">
        <BookOpen className="text-sky-400"/><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{desc}</p>
        <a href={`./docs/${file}`} download className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 px-4 py-3 text-sm font-bold hover:bg-sky-500 light:bg-slate-100 light:hover:bg-sky-500 light:hover:text-white"><Download size={16}/>Download</a>
      </article>)}</div>
  </div>
}

function EvidenceView({engines}:{engines:Engine[]}) {
  return <div><Header title="Evidence & Traceability" subtitle="Per engine wordt zichtbaar welke bron de huidige kennis ondersteunt."/>
    <div className="glass mt-6 overflow-x-auto rounded-3xl p-3 sm:p-6">
      <table className="w-full min-w-[850px] text-left text-sm"><thead className="text-xs uppercase tracking-wider text-slate-500"><tr><th className="p-3">Engine</th><th>Handleiding</th><th>Tests</th><th>Savegames</th><th>Executable</th><th>Confidence</th></tr></thead>
      <tbody>{engines.map(e=><tr key={e.id} className="border-t border-slate-700/30"><td className="p-3 font-semibold">{e.name}</td><td>✓</td><td>{e.tests.length?'✓':'○'}</td><td>{['savegame','player','training','tactics','match','transfer'].includes(e.id)?'✓':'○'}</td><td>{e.id==='executable'?'◐':'○'}</td><td>{e.confidence}%</td></tr>)}</tbody></table>
    </div>
  </div>
}

function TimelineView() {
  return <div><Header title="Projecttijdlijn" subtitle="De ontwikkeling van Project Phoenix als levend onderzoeksproject."/>
    <div className="glass mt-6 rounded-3xl p-6 sm:p-9"><div className="relative ml-3 border-l border-slate-700/60 pl-8">
      {milestones.map(([date,title,text])=><article key={title} className="relative pb-9 last:pb-0"><span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-phoenix-500 light:border-white"/><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{date}</p><h3 className="mt-2 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></article>)}
    </div></div>
  </div>
}

function EngineDrawer({engine,close,onProgress}:{engine:Engine;close:()=>void;onProgress:(id:string,p:number)=>void}) {
  const s=statusStyle[engine.status]
  return <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm" onMouseDown={close}>
    <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-slate-700/40 bg-slate-950 p-5 shadow-2xl sm:p-8 light:bg-white" onMouseDown={e=>e.stopPropagation()}>
      <div className="flex items-start justify-between gap-5"><div><span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${s.cls}`}>{s.label}</span><h2 className="mt-4 text-3xl font-black">{engine.name}</h2><p className="mt-2 text-slate-400">{engine.summary}</p></div><button onClick={close} className="rounded-xl border border-slate-700/40 p-2"><X/></button></div>
      <div className="mt-8 grid grid-cols-2 gap-4"><Metric icon={Activity} value={`${engine.progress}%`} label="Voortgang"/><Metric icon={Beaker} value={`${engine.confidence}%`} label="Confidence"/></div>
      <div className="glass mt-6 rounded-2xl p-5"><label className="text-xs font-bold uppercase tracking-wider text-slate-500">Voortgang lokaal aanpassen</label><input type="range" min="0" max="100" value={engine.progress} onChange={e=>onProgress(engine.id,+e.target.value)} className="mt-4 w-full accent-sky-500"/></div>
      <SectionList title="Confirmed facts" items={engine.facts} tone="emerald"/>
      <SectionList title="Hypotheses" items={engine.hypotheses} tone="amber"/>
      <SectionList title="Gerelateerde tests" items={engine.tests} tone="sky"/>
      <div className="glass mt-6 rounded-2xl p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Volgende stap</p><p className="mt-3 leading-7">{engine.next}</p></div>
    </aside>
  </div>
}

function SectionList({title,items,tone}:{title:string;items:string[];tone:'emerald'|'amber'|'sky'}) {
  const dot={emerald:'bg-emerald-400',amber:'bg-amber-400',sky:'bg-sky-400'}[tone]
  return <section className="mt-7"><h3 className="text-lg font-bold">{title}</h3>{items.length?<ul className="mt-3 space-y-3">{items.map(i=><li key={i} className="glass flex gap-3 rounded-xl p-4 text-sm text-slate-300 light:text-slate-700"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dot}`}/>{i}</li>)}</ul>:<p className="mt-3 text-sm text-slate-500">Geen items geregistreerd.</p>}</section>
}

function Metric({icon:Icon,value,label}:{icon:any;value:string;label:string}) {
  return <div className="glass rounded-2xl p-5"><Icon size={20} className="text-sky-400"/><p className="mt-4 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p></div>
}
function Header({title,subtitle}:{title:string;subtitle:string}) {
  return <div><h2 className="text-3xl font-black sm:text-4xl">{title}</h2><p className="mt-2 text-slate-400">{subtitle}</p></div>
}
function ProgressRing({value,label}:{value:number;label:string}) {
  return <div className="relative grid h-52 w-52 place-items-center rounded-full" style={{background:`conic-gradient(#42d392 ${value*3.6}deg,#15304b 0)`}}>
    <div className="grid h-44 w-44 place-items-center rounded-full bg-slate-950 light:bg-white"><div className="text-center"><p className="text-5xl font-black">{value}%</p><p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{label}</p></div></div>
  </div>
}

export default App
