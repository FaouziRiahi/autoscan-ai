import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, AlertTriangle, ArrowLeft, BarChart3, Bell, Car, Check, CheckCircle2,
  ChevronRight, CircleGauge, Clock3, Download, FileText, Filter, Gauge, History,
  ImagePlus, LayoutDashboard, Menu, MoreHorizontal, Pencil, Play, Plus, Search,
  Settings, ShieldCheck, SlidersHorizontal, Sparkles, Upload, Wrench, X, Zap,
  Thermometer, Fuel, Wifi, RotateCcw, Trash2, Database, Radio
} from 'lucide-react'
import './styles.css'

const seedScans = [
  { id: 'AS-2408', car: 'BMW 116i', meta: '2009 · 168.420 km', plate: 'BS · FR 116', date: '08.09.2026, 16:42', status: 'warn', score: 68, recommendation: 'Vor Kauf prüfen', codes: ['P0012', 'P0420'], cost: '650–1.400 €', vin: 'WBAUA31070E123456', engine: '1.6 l Benzin · 90 kW', battery: '12,4 V', temp: '91 °C' },
  { id: 'AS-2407', car: 'Volkswagen Golf VII', meta: '2018 · 92.180 km', plate: 'H · GV 418', date: '07.09.2026, 11:18', status: 'good', score: 91, recommendation: 'Kauf empfohlen', codes: [], cost: '0–250 €', vin: 'WVWZZZAUZJW123456', engine: '1.5 TSI · 96 kW', battery: '12,7 V', temp: '88 °C' },
  { id: 'AS-2406', car: 'Audi A3 Sportback', meta: '2014 · 143.920 km', plate: 'SZ · AR 303', date: '05.09.2026, 09:07', status: 'bad', score: 39, recommendation: 'Nicht kaufen', codes: ['P0299', 'P0401', 'P2002'], cost: '2.100–3.800 €', vin: 'WAUZZZ8V1EA123456', engine: '2.0 TDI · 110 kW', battery: '12,1 V', temp: '96 °C' },
  { id: 'AS-2405', car: 'Mercedes-Benz A 180', meta: '2020 · 61.340 km', plate: 'BS · MB 180', date: '02.09.2026, 18:21', status: 'good', score: 87, recommendation: 'Kauf empfohlen', codes: ['B1000'], cost: '100–300 €', vin: 'WDD1770841J123456', engine: '1.3 l Benzin · 100 kW', battery: '12,6 V', temp: '89 °C' },
  { id: 'AS-2404', car: 'Opel Corsa E', meta: '2017 · 107.600 km', plate: 'WOB · OC 17', date: '30.08.2026, 13:52', status: 'warn', score: 72, recommendation: 'Vor Kauf prüfen', codes: ['P0171'], cost: '350–700 €', vin: 'W0L0XEP6814123456', engine: '1.4 l Benzin · 66 kW', battery: '12,5 V', temp: '90 °C' },
]

const statusData = {
  good: { label: 'Kauf empfohlen', short: 'Gut', icon: CheckCircle2 },
  warn: { label: 'Vor Kauf prüfen', short: 'Prüfen', icon: AlertTriangle },
  bad: { label: 'Nicht kaufen', short: 'Kritisch', icon: X },
}

function Logo() {
  return <div className="logo"><div className="logo-mark"><Car size={21}/><span/></div><div><strong>AutoScan</strong><small>AI</small></div></div>
}

function Status({ status, compact = false }) {
  const s = statusData[status]
  const Icon = s.icon
  return <span className={`status ${status}`}><Icon size={14}/>{compact ? s.short : s.label}</span>
}

function Sidebar({ page, setPage, open, close }) {
  const nav = [
    ['dashboard', LayoutDashboard, 'Dashboard'],
    ['scan', CircleGauge, 'Neuer Scan'],
    ['history', History, 'Scan-Verlauf'],
    ['reports', FileText, 'Berichte'],
    ['live', Gauge, 'Live-Dashboard'],
    ['diagnostics', Wrench, 'Diagnosezentrum'],
    ['monitor', Radio, 'Live-Monitor'],
    ['logs', Database, 'OBD-Protokolle'],
  ]
  return <>
    {open && <div className="scrim" onClick={close}/>} 
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <Logo/>
      <nav>
        <p>ÜBERSICHT</p>
        {nav.map(([id, Icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => { setPage(id); close() }}><Icon size={19}/><span>{label}</span>{id === 'scan' && <b>+</b>}</button>)}
        <p>VERWALTUNG</p>
        <button className={page === 'settings' ? 'active' : ''} onClick={() => { setPage('settings'); close() }}><Settings size={19}/><span>Einstellungen</span></button>
        <button><ShieldCheck size={19}/><span>Datenschutz</span></button>
      </nav>
      <div className="sidebar-foot">
        <div className="plan"><Sparkles size={18}/><div><strong>AutoScan Pro</strong><span>12 von 25 Scans genutzt</span></div></div>
        <div className="usage"><i style={{width:'48%'}}/></div>
        <button className="upgrade">Plan verwalten</button>
        <div className="user"><div>FR</div><span><strong>Faouzi Riahi</strong><small>faouzi@example.de</small></span><MoreHorizontal size={18}/></div>
      </div>
    </aside>
  </>
}

function Topbar({ title, menu, startScan }) {
  return <header className="topbar"><button className="menu-btn" onClick={menu}><Menu/></button><div><span>AutoScan AI</span><h1>{title}</h1></div><div className="top-actions"><button className="icon-btn"><Bell size={19}/><i/></button><button className="primary" onClick={startScan}><Plus size={18}/>Neuer Scan</button></div></header>
}

function Dashboard({ scans, selectScan, goHistory, startScan }) {
  const avg = Math.round(scans.reduce((a,s)=>a+s.score,0)/scans.length)
  return <div className="page animate">
    <section className="welcome"><div><span className="eyebrow"><Zap size={13}/> FAHRZEUGDIAGNOSE MIT KI</span><h2>Guten Abend, Faouzi.</h2><p>Alle Fahrzeugprüfungen auf einen Blick – klar bewertet und sofort verständlich.</p></div><button className="primary large" onClick={startScan}><CircleGauge size={20}/>Fahrzeug jetzt scannen</button></section>
    <section className="stats">
      <div className="stat"><span className="stat-icon blue"><Activity/></span><div><small>SCANS GESAMT</small><strong>{scans.length + 19}</strong><em>+4 diesen Monat</em></div></div>
      <div className="stat"><span className="stat-icon green"><CheckCircle2/></span><div><small>KAUFEMPFEHLUNGEN</small><strong>{scans.filter(s=>s.status==='good').length + 7}</strong><em>38 % aller Scans</em></div></div>
      <div className="stat"><span className="stat-icon amber"><AlertTriangle/></span><div><small>OFFENE PRÜFUNGEN</small><strong>3</strong><em>2 mit hoher Priorität</em></div></div>
      <div className="stat"><span className="stat-icon purple"><BarChart3/></span><div><small>Ø FAHRZEUG-SCORE</small><strong>{avg}<sup>/100</sup></strong><em>+3 Punkte zum Vormonat</em></div></div>
    </section>
    <section className="grid-main">
      <div className="panel recent"><div className="panel-head"><div><h3>Letzte Scans</h3><p>Deine zuletzt geprüften Fahrzeuge</p></div><button className="text-btn" onClick={goHistory}>Alle anzeigen <ChevronRight size={16}/></button></div>
        <div className="scan-list">{scans.slice(0,4).map(scan => <button className="scan-row" key={scan.id} onClick={()=>selectScan(scan)}><div className="vehicle-avatar"><Car/></div><div className="vehicle-main"><strong>{scan.car}</strong><span>{scan.meta}</span></div><div className="scan-date"><Clock3 size={14}/>{scan.date}</div><div className={`score ${scan.status}`}>{scan.score}<small>/100</small></div><Status status={scan.status}/><ChevronRight size={18}/></button>)}</div>
      </div>
      <div className="panel tasks"><div className="panel-head"><div><h3>Offene Aufgaben</h3><p>Das solltest du noch prüfen</p></div><span className="count">3</span></div>
        <div className="task"><span className="task-severity high"/><div><strong>Öldruck beim BMW prüfen</strong><p>Fehlercode P0012 kann auf ein Problem mit der Steuerkette hinweisen.</p><small>BMW 116i · Hohe Priorität</small></div><ChevronRight/></div>
        <div className="task"><span className="task-severity medium"/><div><strong>Probefahrt dokumentieren</strong><p>Fahrverhalten und Geräusche ergänzen.</p><small>Opel Corsa · Mittlere Priorität</small></div><ChevronRight/></div>
        <div className="task"><span className="task-severity low"/><div><strong>Bericht exportieren</strong><p>Prüfbericht für den Verkäufer erstellen.</p><small>VW Golf VII · Niedrige Priorität</small></div><ChevronRight/></div>
      </div>
    </section>
    <section className="insight"><span><Sparkles/></span><div><strong>AutoScan AI Hinweis</strong><p>Bei 2 deiner letzten 5 Fahrzeuge wurden kostenintensive Motorfehler erkannt. Ein Werkstattcheck vor dem Kauf kann dich vor hohen Folgekosten schützen.</p></div><button onClick={goHistory}>Scans vergleichen <ChevronRight size={16}/></button></section>
  </div>
}

function HistoryPage({ scans, selectScan, exportCsv }) {
  const [query,setQuery] = useState(''); const [status,setStatus] = useState('all')
  const filtered = useMemo(()=>scans.filter(s => (s.car+s.meta+s.plate).toLowerCase().includes(query.toLowerCase()) && (status==='all'||s.status===status)),[scans,query,status])
  return <div className="page animate"><div className="page-title"><div><h2>Scan-Verlauf</h2><p>Alle Fahrzeugprüfungen durchsuchen, filtern und vergleichen.</p></div><button className="secondary" onClick={()=>exportCsv(filtered)}><Download size={17}/>CSV exportieren</button></div>
    <div className="panel history-panel"><div className="filters"><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Fahrzeug, Kennzeichen oder Modell suchen …"/></label><div className="status-tabs">{[['all','Alle'],['good','Empfohlen'],['warn','Prüfen'],['bad','Kritisch']].map(([id,label])=><button className={status===id?'active':''} onClick={()=>setStatus(id)} key={id}>{label}</button>)}</div><button className="filter"><SlidersHorizontal size={17}/>Weitere Filter</button></div>
      <div className="table"><div className="table-row table-head"><span>FAHRZEUG</span><span>SCAN-DATUM</span><span>SCORE</span><span>ERGEBNIS</span><span>KOSTENRISIKO</span><span/></div>{filtered.map(s=><button className="table-row" key={s.id} onClick={()=>selectScan(s)}><span className="car-cell"><i><Car/></i><b>{s.car}<small>{s.meta} · {s.plate}</small></b></span><span>{s.date}<small>{s.id}</small></span><span><b className={`score ${s.status}`}>{s.score}<small>/100</small></b></span><span><Status status={s.status}/></span><span><b>{s.cost}</b></span><span><ChevronRight/></span></button>)}</div>
      {!filtered.length && <div className="empty"><Search/><h3>Keine Scans gefunden</h3><p>Ändere deine Suche oder setze die Filter zurück.</p><button className="secondary" onClick={()=>{setQuery('');setStatus('all')}}>Filter zurücksetzen</button></div>}
    </div>
  </div>
}

function DetailPage({ scan, back, updateScan, printReport }) {
  const [editing,setEditing] = useState(false); const [form,setForm] = useState(scan)
  const save=()=>{updateScan(form);setEditing(false)}
  return <div className="page animate detail-page"><button className="back" onClick={back}><ArrowLeft size={17}/>Zurück zum Verlauf</button>
    <div className="detail-title"><div className="vehicle-big"><Car/></div><div><span>{scan.id} · {scan.date}</span><h2>{scan.car}</h2><p>{scan.meta} · {scan.plate}</p></div><div className="detail-actions"><button className="secondary" onClick={()=>setEditing(true)}><Pencil size={16}/>Daten korrigieren</button><button className="primary" onClick={printReport}><Download size={17}/>PDF-Bericht</button></div></div>
    <div className={`result-hero ${scan.status}`}><div className="result-score"><span>{scan.score}</span><small>von 100</small></div><div><Status status={scan.status}/><h3>{scan.recommendation}</h3><p>{scan.status==='good'?'Keine kritischen Fehler erkannt. Das Fahrzeug macht technisch einen guten Eindruck.':scan.status==='warn'?'Technische Auffälligkeiten erkannt. Vor dem Kauf empfehlen wir eine gezielte Prüfung in einer Werkstatt.':'Mehrere kritische Fehler erkannt. Das finanzielle Risiko ist aktuell zu hoch.'}</p></div><div className="risk"><small>GESCHÄTZTES KOSTENRISIKO</small><strong>{scan.cost}</strong><span>inkl. Teile & Arbeitszeit</span></div></div>
    <div className="detail-grid"><section className="panel"><div className="panel-head"><div><h3>Erkannte Fahrzeugdaten</h3><p>Direkt über OBD-II ausgelesen</p></div><span className="verified"><ShieldCheck size={15}/>Verifiziert</span></div><div className="data-grid">{[['FIN / VIN',scan.vin],['Motor',scan.engine],['Kilometerstand',scan.meta.split('·')[1]],['Batteriespannung',scan.battery],['Kühlmitteltemperatur',scan.temp],['Kennzeichen',scan.plate]].map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div></section>
      <section className="panel"><div className="panel-head"><div><h3>Diagnosecodes</h3><p>{scan.codes.length} Einträge im Fehlerspeicher</p></div></div>{scan.codes.length ? <div className="codes">{scan.codes.map((c,i)=><div className="code" key={c}><span className={i===0&&scan.status!=='good'?'critical':'medium'}><AlertTriangle/></span><div><strong>{c}</strong><p>{c==='P0012'?'Nockenwellenposition – Zeitpunkt zu spät':c==='P0420'?'Katalysatorsystem – Wirkung unter Grenzwert':'Diagnoseeintrag benötigt weitere Prüfung'}</p></div><em>{i===0?'PRIORITÄT HOCH':'PRÜFEN'}</em></div>)}</div>:<div className="no-codes"><CheckCircle2/><strong>Keine Motorfehler erkannt</strong><p>Der OBD-Fehlerspeicher ist frei.</p></div>}</section>
    </div>
    <section className="panel recommendation"><div className="panel-head"><div><h3>KI-Einschätzung</h3><p>Aus Fehlercodes, Live-Daten und Fahrzeughistorie</p></div><span className="ai-badge"><Sparkles size={15}/>AI ANALYSE</span></div><div className="recommend-grid"><div><Wrench/><h4>Vor dem Kauf prüfen</h4><ul><li>Öldruck und Steuerkette kontrollieren lassen</li><li>Kaltstart durchführen und Geräusche dokumentieren</li><li>Reparaturkosten im Kaufpreis berücksichtigen</li></ul></div><div><Gauge/><h4>Positive Signale</h4><ul><li>Batteriespannung im Normalbereich</li><li>Kühlmitteltemperatur stabil</li><li>Keine Auffälligkeit bei der Laufleistung</li></ul></div></div></section>
    {editing&&<div className="modal-wrap"><div className="scrim"/><div className="modal"><div className="modal-head"><div><h3>Fahrzeugdaten korrigieren</h3><p>Manuelle Änderungen werden im Bericht gekennzeichnet.</p></div><button onClick={()=>setEditing(false)}><X/></button></div>{[['car','Fahrzeug'],['meta','Baujahr & Kilometerstand'],['plate','Kennzeichen'],['vin','FIN / VIN'],['engine','Motor']].map(([key,label])=><label key={key}>{label}<input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></label>)}<div className="modal-actions"><button className="secondary" onClick={()=>setEditing(false)}>Abbrechen</button><button className="primary" onClick={save}><Check size={17}/>Änderungen speichern</button></div></div></div>}
  </div>
}

function ScanPage({ complete }) {
  const [stage,setStage]=useState(0); const [progress,setProgress]=useState(0); const [files,setFiles]=useState([])
  useEffect(()=>{if(stage!==2)return; const id=setInterval(()=>setProgress(p=>{if(p>=100){clearInterval(id);setTimeout(()=>setStage(3),400);return 100}return p+4}),90);return()=>clearInterval(id)},[stage])
  return <div className="page scan-page animate"><div className="page-title"><div><h2>Neuer Fahrzeugscan</h2><p>Verbinde den OBD-II-Adapter und folge den einzelnen Schritten.</p></div><span className="secure"><ShieldCheck/>Daten lokal verschlüsselt</span></div>
    <div className="stepper">{['Fahrzeug verbinden','Daten bestätigen','Diagnose läuft','Ergebnis'].map((s,i)=><div className={i<=stage?'active':''} key={s}><span>{i<stage?<Check size={16}/>:i+1}</span><b>{s}</b>{i<3&&<i/>}</div>)}</div>
    <div className="scan-workspace">
      {stage===0&&<div className="connect-card"><div className="pulse-wrap"><div className="pulse"/><Car size={48}/><span><Zap size={20}/></span></div><h3>Bereit für den Fahrzeugscan?</h3><p>Stecke den OBD-II-Adapter ein, schalte die Zündung ein und starte die Verbindung.</p><div className="instructions"><div><span>1</span><p><strong>Adapter einstecken</strong><small>OBD-II-Buchse meist unter dem Lenkrad</small></p></div><div><span>2</span><p><strong>Zündung einschalten</strong><small>Motor muss noch nicht laufen</small></p></div><div><span>3</span><p><strong>Bluetooth aktivieren</strong><small>Adapter in der Nähe bereithalten</small></p></div></div><button className="primary large" onClick={()=>setStage(1)}><Zap size={19}/>OBD-Adapter verbinden</button><small className="compat">Kompatibel mit Fahrzeugen ab Baujahr 2001 (Benzin) bzw. 2004 (Diesel)</small></div>}
      {stage===1&&<div className="confirm-card"><div className="success-icon"><Check/></div><h3>Fahrzeug erfolgreich erkannt</h3><p>Bitte bestätige die Daten vor dem Start der Diagnose.</p><div className="detected"><div><small>FAHRZEUG</small><strong>BMW 116i</strong><span>Baujahr 2009</span></div><div><small>MOTOR</small><strong>1.6 l Benzin</strong><span>90 kW / 122 PS</span></div><div><small>FIN / VIN</small><strong>WBAUA31070E••••••</strong><span>Automatisch erkannt</span></div></div><div className="upload-zone"><input type="file" multiple accept="image/*" onChange={e=>setFiles([...e.target.files])}/><ImagePlus/><div><strong>Fahrzeugfotos hinzufügen <em>(optional)</em></strong><span>Mehrere Bilder auswählen: Fahrzeug, Kilometerstand oder Dokumente</span></div><button className="secondary"><Upload size={16}/>Auswählen</button></div>{files.length>0&&<div className="file-list">{files.map(f=><span key={f.name}><CheckCircle2/>{f.name}</span>)}</div>}<div className="scan-buttons"><button className="secondary" onClick={()=>setStage(0)}>Zurück</button><button className="primary large" onClick={()=>setStage(2)}><Play size={18}/>Diagnose starten</button></div></div>}
      {stage===2&&<div className="progress-card"><div className="scanner"><CircleGauge/><i style={{transform:`rotate(${progress*3.6}deg)`}}/></div><h3>Fahrzeug wird analysiert</h3><p>Bitte Zündung eingeschaltet lassen und Adapter nicht entfernen.</p><div className="progress"><i style={{width:`${progress}%`}}/></div><strong>{progress}%</strong><div className="scan-checks">{[['Fahrzeugdaten auslesen',15],['Fehlerspeicher prüfen',40],['Live-Daten analysieren',70],['KI-Bewertung erstellen',95]].map(([x,n])=><span className={progress>=n?'done':''} key={x}>{progress>=n?<CheckCircle2/>:<Clock3/>}{x}</span>)}</div></div>}
      {stage===3&&<div className="finish-card"><div className="finish-ring"><strong>76</strong><small>/100</small></div><Status status="warn"/><h3>Scan erfolgreich abgeschlossen</h3><p>Zwei Fehlercodes benötigen eine genauere Prüfung. Die KI empfiehlt einen Werkstattcheck vor dem Kauf.</p><button className="primary large" onClick={complete}>Vollständiges Ergebnis ansehen <ChevronRight size={18}/></button></div>}
    </div>
  </div>
}

function ReportsPage({ scans, selectScan, exportCsv }) { return <div className="page animate"><div className="page-title"><div><h2>Berichte & Export</h2><p>Prüfberichte herunterladen oder Fahrzeugdaten weiterverarbeiten.</p></div></div><div className="report-options"><div className="panel export-card"><span className="export-icon pdf"><FileText/></span><h3>PDF-Prüfbericht</h3><p>Professioneller Bericht mit Score, Diagnosecodes, KI-Einschätzung und Kostenschätzung.</p><button className="primary" onClick={()=>selectScan(scans[0])}>Fahrzeug auswählen <ChevronRight size={16}/></button></div><div className="panel export-card"><span className="export-icon csv"><BarChart3/></span><h3>CSV-Datenexport</h3><p>Alle Scans als strukturierte Tabelle für Excel oder eine eigene Auswertung exportieren.</p><button className="secondary" onClick={()=>exportCsv(scans)}><Download size={16}/>Alle Daten exportieren</button></div></div></div> }

function Dial({ value, max, unit, label, color='#2180ef' }) {
  const angle = Math.min(100, value/max*100)*2.7
  return <div className="dial-card"><div className="dial" style={{'--angle':`${angle}deg`,'--dial-color':color}}><div className="dial-inner"><strong>{value}</strong><small>{unit}</small></div></div><h3>{label}</h3><span>0 <i>{max}</i></span></div>
}

function LiveDashboard() {
  const [running,setRunning]=useState(true); const [tick,setTick]=useState(0)
  useEffect(()=>{if(!running)return;const id=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(id)},[running])
  const rpm=running?2280+(tick%4)*35:0, speed=running?35+(tick%3):0
  return <div className="page animate"><div className="page-title"><div><h2>Live-Dashboard</h2><p>Motordaten während Fahrt oder Diagnose in Echtzeit beobachten.</p></div><div className="connection"><i/><span><strong>OBD verbunden</strong><small>BMW 116i · 42 PID/s</small></span></div></div>
    <div className="live-top">{[['Verbrauch gesamt','8,9','l/100 km'],['Momentanverbrauch','7,5','l/100 km'],['Kraftstoffrate','1,12','l/h'],['Fahrtdistanz','4,29','km']].map(([a,b,c])=><div className="metric" key={a}><small>{a}</small><strong>{b}</strong><span>{c}</span></div>)}</div>
    <div className="live-grid"><Dial value={rpm} max={7000} unit="U/min" label="Motordrehzahl" color="#2b85f0"/><div className="bars-card"><div className="vertical-meter"><small>KÜHLMITTEL</small><div><i style={{height:'72%'}}/></div><strong>91 °C</strong></div><div className="vertical-meter"><small>MOTORLAST</small><div><i style={{height:'34%'}}/></div><strong>34 %</strong></div></div><Dial value={speed} max={220} unit="km/h" label="Geschwindigkeit" color="#21a77a"/></div>
    <div className="live-controls"><button className={running?'danger-button':'primary'} onClick={()=>setRunning(!running)}>{running?<><X size={17}/>Live-Daten stoppen</>:<><Play size={17}/>Live-Daten starten</>}</button><button className="secondary" onClick={()=>setTick(0)}><RotateCcw size={16}/>Fahrt zurücksetzen</button><span><span className="live-dot"/>Letzte Aktualisierung: gerade eben</span></div>
  </div>
}

const dtcs=[['P0012','Nockenwellenposition „A“ – Zeitpunkt zu spät','Motor / Antriebsstrang','Hoch'],['P0420','Katalysatorsystem – Wirkung unter Grenzwert','Abgassystem','Mittel'],['B1000','Steuergerät – Kommunikationshinweis','Karosserie','Niedrig']]
function DiagnosticsPage(){const [cleared,setCleared]=useState(false);return <div className="page animate"><div className="page-title"><div><h2>Diagnosezentrum</h2><p>Fehlerspeicher aller verfügbaren Steuergeräte lesen und bewerten.</p></div><button className="primary" onClick={()=>setCleared(false)}><Activity size={17}/>Neu auslesen</button></div><div className="diagnostic-summary"><div><span className="stat-icon red"><AlertTriangle/></span><strong>{cleared?0:3}<small>Fehlercodes erkannt</small></strong></div><div><span className="stat-icon green"><CheckCircle2/></span><strong>7<small>Steuergeräte erreichbar</small></strong></div><div><span className="stat-icon blue"><Clock3/></span><strong>1,8 s<small>Antwortzeit</small></strong></div><button className="secondary" disabled={cleared} onClick={()=>setCleared(true)}><Trash2 size={16}/>Fehlerspeicher löschen</button></div><div className="panel dtc-panel"><div className="panel-head"><div><h3>Diagnosecodes (DTC)</h3><p>Gespeicherte und ausstehende Fehler</p></div><Status status={cleared?'good':'warn'} compact/></div>{cleared?<div className="no-codes"><CheckCircle2/><strong>Fehlerspeicher ist leer</strong><p>Es sind momentan keine Diagnosecodes gespeichert.</p></div>:dtcs.map((d,i)=><div className="dtc-row" key={d[0]}><span className={`dtc-level l${i}`}/><b>{d[0]}</b><div><strong>{d[1]}</strong><small>{d[2]}</small></div><em>{d[3]}</em><button><ChevronRight/></button></div>)}</div></div>}

function MonitorPage(){const sensors=[['Kühlmitteltemperatur','91','°C',72],['Ansauglufttemperatur','38','°C',38],['Batteriespannung','12,4','V',62],['Motorlast','34','%',34],['Drosselklappenposition','21','%',21],['Kraftstoffstand','58','%',58],['Ladedruck','0,96','bar',48],['Lambdawert','1,01','λ',51]];return <div className="page animate"><div className="page-title"><div><h2>Live-Monitor</h2><p>Ausgewählte PID-Sensorwerte und Grenzbereiche überwachen.</p></div><div className="connection"><i/><span><strong>Monitoring aktiv</strong><small>8 Sensoren · 1 Hz</small></span></div></div><div className="sensor-grid">{sensors.map(([n,v,u,p],i)=><div className="sensor-card" key={n}><span>{i===0?<Thermometer/>:i===5?<Fuel/>:<Activity/>}</span><div><small>{n}</small><strong>{v}<em>{u}</em></strong><div className="sensor-bar"><i style={{width:`${p}%`}}/></div><b>Normalbereich</b></div></div>)}</div></div>}

function LogsPage(){const [query,setQuery]=useState('');const logs=[['22:18:04','010C','41 0C 23 A0','Motordrehzahl: 2280 U/min','OK'],['22:18:03','010D','41 0D 23','Geschwindigkeit: 35 km/h','OK'],['22:18:02','0105','41 05 83','Kühlmittel: 91 °C','OK'],['22:18:01','03','43 01 12 04 20','DTCs: P0012, P0420','WARN'],['22:17:59','0104','41 04 57','Motorlast: 34 %','OK'],['22:17:58','ATRV','12.4V','Batteriespannung','OK']].filter(x=>x.join(' ').toLowerCase().includes(query.toLowerCase()));return <div className="page animate"><div className="page-title"><div><h2>OBD-Protokolle</h2><p>Kommunikation zwischen Adapter und Fahrzeug nachvollziehen.</p></div><button className="secondary"><Download size={16}/>Protokoll exportieren</button></div><div className="panel log-panel"><div className="filters"><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="PID, Antwort oder Messwert suchen …"/></label><span className="log-count">{logs.length} Einträge</span></div><div className="log-head"><span>ZEIT</span><span>BEFEHL</span><span>ECU-ANTWORT</span><span>INTERPRETATION</span><span>STATUS</span></div>{logs.map((l,i)=><div className="log-row" key={i}>{l.map((x,j)=><span className={j===4?(x==='OK'?'ok':'warn'):''} key={j}>{x}</span>)}</div>)}</div></div>}

function SettingsPage(){const [saved,setSaved]=useState(false);return <div className="page animate"><div className="page-title"><div><h2>Einstellungen</h2><p>OBD-Adapter, Einheiten und Scan-Verhalten konfigurieren.</p></div></div><div className="settings-grid"><section className="panel settings-card"><h3><Wifi/>OBD-Verbindung</h3><label>Adaptertyp<select><option>Bluetooth OBD-II (ELM327)</option><option>WLAN OBD-II</option><option>USB OBD-II</option></select></label><label>Automatisch verbinden<input type="checkbox" defaultChecked/></label><label>Verbindungs-Timeout<select><option>10 Sekunden</option><option>20 Sekunden</option><option>30 Sekunden</option></select></label></section><section className="panel settings-card"><h3><SlidersHorizontal/>Anzeige & Einheiten</h3><label>Geschwindigkeit<select><option>km/h</option><option>mph</option></select></label><label>Temperatur<select><option>Celsius (°C)</option><option>Fahrenheit (°F)</option></select></label><label>Verbrauch<select><option>l/100 km</option><option>MPG</option></select></label></section></div><button className="primary settings-save" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),1800)}}>{saved?<><Check/>Gespeichert</>:<>Einstellungen speichern</>}</button></div>}

function App(){
  const [page,setPage]=useState('dashboard'); const [scans,setScans]=useState(seedScans); const [selected,setSelected]=useState(null); const [mobile,setMobile]=useState(false)
  const titles={dashboard:'Dashboard',scan:'Neuer Scan',history:'Scan-Verlauf',reports:'Berichte',live:'Live-Dashboard',diagnostics:'Diagnosezentrum',monitor:'Live-Monitor',logs:'OBD-Protokolle',settings:'Einstellungen'}
  const selectScan=s=>{setSelected(s);setPage('detail')}; const updateScan=u=>{setScans(x=>x.map(s=>s.id===u.id?u:s));setSelected(u)}
  const exportCsv=(rows)=>{const head='ID,Fahrzeug,Details,Kennzeichen,Datum,Score,Empfehlung,Kostenrisiko'; const csv=[head,...rows.map(s=>[s.id,s.car,s.meta,s.plate,s.date,s.score,s.recommendation,s.cost].map(v=>`"${v}"`).join(','))].join('\n'); const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='autoscan-verlauf.csv';a.click();URL.revokeObjectURL(a.href)}
  const printReport=()=>window.print()
  const completed={...seedScans[0],id:'AS-2409',date:'Heute, 22:18',score:76,recommendation:'Vor Kauf prüfen'}
  return <div className="app"><Sidebar page={page} setPage={p=>{setPage(p);setSelected(null)}} open={mobile} close={()=>setMobile(false)}/><main><Topbar title={page==='detail'?'Scan-Ergebnis':titles[page]} menu={()=>setMobile(true)} startScan={()=>{setPage('scan');setSelected(null)}}/>
    {page==='dashboard'&&<Dashboard scans={scans} selectScan={selectScan} goHistory={()=>setPage('history')} startScan={()=>setPage('scan')}/>} 
    {page==='history'&&<HistoryPage scans={scans} selectScan={selectScan} exportCsv={exportCsv}/>} 
    {page==='detail'&&selected&&<DetailPage scan={selected} back={()=>setPage('history')} updateScan={updateScan} printReport={printReport}/>} 
    {page==='scan'&&<ScanPage complete={()=>{setScans([completed,...scans]);selectScan(completed)}}/>}
    {page==='reports'&&<ReportsPage scans={scans} selectScan={selectScan} exportCsv={exportCsv}/>} 
    {page==='live'&&<LiveDashboard/>}
    {page==='diagnostics'&&<DiagnosticsPage/>}
    {page==='monitor'&&<MonitorPage/>}
    {page==='logs'&&<LogsPage/>}
    {page==='settings'&&<SettingsPage/>}
  </main></div>
}

createRoot(document.getElementById('root')).render(<App/>)
