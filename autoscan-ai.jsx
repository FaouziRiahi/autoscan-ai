import React, { useState, useEffect, useRef } from "react";
import {
  Home, Activity, Car, FileText, Menu, Bluetooth, AlertTriangle,
  CheckCircle2, ChevronRight, ChevronLeft, Wrench, MapPin, Settings,
  HelpCircle, Info, X, Plus, Gauge, Search, Share2, Download, ShieldCheck,
} from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const TOKENS = `
.as-root {
  --paper: #E9EDEF;
  --panel: #F7F9FA;
  --panel-2: #EFF2F4;
  --ink: #1B2430;
  --ink-soft: #57626F;
  --ink-faint: #8A93A0;
  --blue: #2C5F8A;
  --blue-deep: #1E4463;
  --blue-soft: #D8E4EC;
  --amber: #B9740E;
  --amber-soft: #F3E1C4;
  --red: #A93226;
  --red-soft: #F1D6D1;
  --green: #2E7D4F;
  --green-soft: #D9EADF;
  --line: #C9D2D8;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  font-family: var(--font-body);
  color: var(--ink);
  width: 100%;
  box-sizing: border-box;
}
.as-root * { box-sizing: border-box; }
.as-mono { font-family: var(--font-mono); }
.as-display { font-family: var(--font-display); }
.as-btn {
  font-family: var(--font-body);
  font-size: 13.5px;
  font-weight: 600;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid var(--blue-deep);
  background: var(--blue-deep);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.as-btn:hover { opacity: 0.88; }
.as-btn:active { transform: scale(0.98); }
.as-btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line);
}
.as-btn-ghost:hover { background: var(--panel-2); border-color: var(--ink-faint); }
.as-fade { animation: asFade 0.4s ease both; }
@keyframes asFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@keyframes asDash { to { stroke-dashoffset: var(--dash-end); } }
@media (prefers-reduced-motion: reduce) { .as-fade { animation: none; } }
`;

/* ---------- data ---------- */

const VEHICLE = { name: "VW Golf VI 1.6 TDI", year: 2011, km: "187.000 km", vin: "WVWZZZ1KZBW••••42" };

const FAULT_CODES = [
  {
    code: "P0303",
    title: "Zündaussetzer Zylinder 3",
    level: "critical",
    desc: "Der Motor erkennt unregelmäßige Verbrennung in Zylinder 3. Mögliche Ursachen: defekte Einspritzdüse, Glühkerze oder Kompressionsverlust.",
    cost: "450–900 €",
  },
  {
    code: "P0171",
    title: "Gemisch zu mager (Bank 1)",
    level: "warning",
    desc: "Das Luft-Kraftstoff-Gemisch weicht vom Sollwert ab. Häufig durch undichten Ansaugtrakt oder verschmutzten Luftmassenmesser.",
    cost: "80–250 €",
  },
  {
    code: "—",
    title: "Bremsbeläge vorne, Restdicke gering",
    level: "warning",
    desc: "Visuelle Prüfung zeigt weniger als 3 mm Restbelag. Wechsel in den nächsten 3.000–5.000 km empfohlen.",
    cost: "120–200 €",
  },
  {
    code: "—",
    title: "Ölstand & Ölqualität",
    level: "ok",
    desc: "Ölstand im Sollbereich, keine Auffälligkeiten bei Farbe oder Konsistenz.",
    cost: "—",
  },
];

const CHECKLIST = [
  { label: "Serviceheft vollständig & lückenlos", checked: true },
  { label: "Nachweis Zahnriemenwechsel vorhanden", checked: false },
  { label: "Rost an Schwellern & Radläufen", checked: true },
  { label: "Unfallfreiheit über HU-Bericht plausibel", checked: true },
];

const GARAGE = [
  { name: "VW Golf VI 1.6 TDI", meta: "2011 · 187.000 km · Kleinanzeige A", score: 62, level: "warning" },
  { name: "Opel Astra J 1.4", meta: "2013 · 142.000 km · Kleinanzeige B", score: 88, level: "ok" },
  { name: "Ford Focus III", meta: "2012 · 165.000 km · Kleinanzeige C", score: 34, level: "critical" },
];

const MENU_ITEMS = [
  { icon: MapPin, title: "Werkstatt-Finder", desc: "Zweitmeinung von einer geprüften Werkstatt in deiner Nähe einholen." },
  { icon: Search, title: "Fehlercode-Datenbank", desc: "Bekannte Probleme nach Modell und Code durchsuchen." },
  { icon: Settings, title: "Einstellungen", desc: "Adapter, Konto, Einheiten und Sprache verwalten." },
  { icon: HelpCircle, title: "Hilfe & Support", desc: "Anleitungen zum OBD2-Adapter und häufige Fragen." },
  { icon: Info, title: "Über AutoScan AI", desc: "Version, Datenschutz und rechtliche Hinweise." },
];

/* ---------- helpers ---------- */

function levelColor(level) {
  if (level === "critical") return { fg: "var(--red)", bg: "var(--red-soft)", label: "Kritisch" };
  if (level === "warning") return { fg: "var(--amber)", bg: "var(--amber-soft)", label: "Beachten" };
  return { fg: "var(--green)", bg: "var(--green-soft)", label: "In Ordnung" };
}

function RiskGauge({ score, size = 84 }) {
  const [dash, setDash] = useState(0);
  const circumference = 2 * Math.PI * 34;
  const level = score >= 75 ? "ok" : score >= 45 ? "warning" : "critical";
  const c = levelColor(level);
  useEffect(() => {
    const t = setTimeout(() => setDash((score / 100) * circumference), 150);
    return () => clearTimeout(t);
  }, [score]);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 84 84" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="42" cy="42" r="34" fill="none" stroke="var(--panel-2)" strokeWidth="8" />
        <circle
          cx="42" cy="42" r="34" fill="none" stroke={c.fg} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span className="as-display" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{score}</span>
        <span className="as-mono" style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>/ 100</span>
      </div>
    </div>
  );
}

function FaultCard({ f, open, onToggle }) {
  const c = levelColor(f.level);
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 10, background: "var(--panel)", overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.fg, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{f.title}</div>
          <div className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{f.code}</div>
        </div>
        <span className="as-mono" style={{ fontSize: 10.5, padding: "3px 9px", borderRadius: 20, background: c.bg, color: c.fg, whiteSpace: "nowrap" }}>
          {c.label}
        </span>
        <ChevronRight size={16} color="var(--ink-faint)" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="as-fade" style={{ padding: "0 14px 14px 34px" }}>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 8px" }}>{f.desc}</p>
          {f.cost !== "—" && (
            <div className="as-mono" style={{ fontSize: 11.5, color: c.fg }}>Geschätzte Reparaturkosten: {f.cost}</div>
          )}
        </div>
      )}
    </div>
  );
}

function ScreenHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 className="as-display" style={{ fontSize: 21, fontWeight: 700, margin: "0 0 4px" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>{subtitle}</p>}
    </div>
  );
}

/* ---------- Home ---------- */

function HomeScreen({ onStartDiagnose, onOpenGarage }) {
  return (
    <div className="as-fade">
      <div style={{ marginBottom: 20 }}>
        <div className="as-mono" style={{ fontSize: 11, color: "var(--blue)", letterSpacing: "0.06em", marginBottom: 6 }}>WILLKOMMEN ZURÜCK</div>
        <h1 className="as-display" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Bevor du unterschreibst,<br />weißt du, was kaputt ist.</h1>
      </div>

      <button
        onClick={onStartDiagnose}
        style={{ width: "100%", textAlign: "left", border: "1px solid var(--blue-deep)", borderRadius: 12, padding: "16px 18px", background: "var(--blue-deep)", color: "#fff", cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Activity size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Neue Diagnose starten</div>
          <div style={{ fontSize: 12.5, opacity: 0.8 }}>OBD2-Scan oder geführte Inspektion</div>
        </div>
        <ChevronRight size={18} />
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)" }}>
          <div className="as-display" style={{ fontSize: 22, fontWeight: 700 }}>3</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Fahrzeuge im Vergleich</div>
        </div>
        <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)" }}>
          <div className="as-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--red)" }}>1</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>kritischer Fund offen</div>
        </div>
      </div>

      <div style={{ marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>LETZTE DIAGNOSE</span>
        <button onClick={onOpenGarage} style={{ background: "none", border: "none", color: "var(--blue)", fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>
          Alle ansehen
        </button>
      </div>
      <button
        onClick={onOpenGarage}
        style={{ width: "100%", textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
      >
        <RiskGauge score={62} size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{VEHICLE.name}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{VEHICLE.year} · {VEHICLE.km}</div>
        </div>
        <ChevronRight size={16} color="var(--ink-faint)" />
      </button>
    </div>
  );
}

/* ---------- Diagnose flow ---------- */

function DiagnoseFlow({ onDone }) {
  const [sub, setSub] = useState(0);
  const [scanPct, setScanPct] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [openFault, setOpenFault] = useState(null);
  const SUBS = ["Fahrzeug", "Verbindung", "Scan", "Ergebnis", "Kaufberatung"];

  useEffect(() => {
    if (sub !== 2) return;
    setScanPct(0);
    setFoundCount(0);
    const iv = setInterval(() => {
      setScanPct((p) => {
        const next = Math.min(p + 4, 100);
        if (next > 30 && foundCount < 1) setFoundCount(1);
        if (next > 60 && foundCount < 2) setFoundCount(2);
        if (next > 85 && foundCount < 3) setFoundCount(3);
        return next;
      });
    }, 90);
    return () => clearInterval(iv);
  }, [sub]);

  return (
    <div className="as-fade">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        {sub > 0 && (
          <button onClick={() => setSub((s) => s - 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <ChevronLeft size={18} />
          </button>
        )}
        <div className="as-mono" style={{ fontSize: 11, color: "var(--blue)" }}>
          SCHRITT {sub + 1}/5 · {SUBS[sub].toUpperCase()}
        </div>
      </div>

      {sub === 0 && (
        <div>
          <ScreenHeader title="Welches Fahrzeug prüfst du?" subtitle="Gib die Fahrzeugdaten ein oder wähle ein gespeichertes Fahrzeug." />
          <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 14, background: "var(--panel)", marginBottom: 12 }}>
            <label className="as-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>FAHRZEUG / VIN</label>
            <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 4 }}>{VEHICLE.name}</div>
            <div className="as-mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{VEHICLE.vin} · {VEHICLE.km}</div>
          </div>
          <button className="as-btn" onClick={() => setSub(1)}>Weiter <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
        </div>
      )}

      {sub === 1 && (
        <div>
          <ScreenHeader title="Wie möchtest du prüfen?" subtitle="Ein OBD2-Adapter liest Motordaten direkt aus. Ohne Zugriff führt dich AutoScan durch eine manuelle Inspektion." />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <button onClick={() => setSub(2)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--blue)", borderRadius: 10, padding: "14px", background: "var(--blue-soft)", cursor: "pointer" }}>
              <Bluetooth size={20} color="var(--blue-deep)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue-deep)" }}>OBD2-Adapter verbinden</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Empfohlen — Bluetooth-Dongle am Fahrzeug</div>
              </div>
            </button>
            <button onClick={() => setSub(2)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)", cursor: "pointer" }}>
              <Wrench size={20} color="var(--ink-soft)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Geführte Inspektion ohne Adapter</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Checkliste für Sichtprüfung & Probefahrt</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {sub === 2 && (
        <div>
          <ScreenHeader title="Scan läuft" subtitle="Halte die Verbindung zum Adapter aufrecht, bis der Scan abgeschlossen ist." />
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
            <RiskGauge score={100 - scanPct} size={70} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 6, borderRadius: 3, background: "var(--panel-2)", overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${scanPct}%`, background: "var(--blue)", transition: "width 0.1s linear" }} />
              </div>
              <div className="as-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{scanPct}% · {foundCount} Auffälligkeiten erkannt</div>
            </div>
          </div>
          {scanPct >= 100 ? (
            <button className="as-btn" onClick={() => setSub(3)}>Ergebnis ansehen <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
          ) : (
            <button className="as-btn as-btn-ghost" disabled style={{ opacity: 0.5, cursor: "default" }}>Scan läuft…</button>
          )}
        </div>
      )}

      {sub === 3 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18, padding: 16, border: "1px solid var(--line)", borderRadius: 12, background: "var(--panel)" }}>
            <RiskGauge score={62} size={76} />
            <div>
              <div className="as-mono" style={{ fontSize: 11, color: "var(--amber)", marginBottom: 4 }}>ERHÖHTES RISIKO</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>1 kritischer Fund, 2 zu beachtende Punkte. Kauf nur mit Preisverhandlung empfehlenswert.</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {FAULT_CODES.map((f, i) => (
              <FaultCard key={i} f={f} open={openFault === i} onToggle={() => setOpenFault(openFault === i ? null : i)} />
            ))}
          </div>
          <button className="as-btn" onClick={() => setSub(4)}>Zur Kaufberatung <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
        </div>
      )}

      {sub === 4 && (
        <div>
          <ScreenHeader title="Kaufberatung" subtitle="Basierend auf der Diagnose und einer kurzen Sichtprüfungs-Checkliste." />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {CHECKLIST.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                {c.checked ? <CheckCircle2 size={16} color="var(--green)" /> : <AlertTriangle size={16} color="var(--amber)" />}
                <span style={{ color: c.checked ? "var(--ink)" : "var(--ink-soft)" }}>{c.label}</span>
              </div>
            ))}
          </div>
          <div style={{ border: "1px solid var(--amber)", background: "var(--amber-soft)", borderRadius: 10, padding: 16, marginBottom: 18 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--amber)", marginBottom: 6 }}>Verhandlungsempfehlung</div>
            <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>
              Geschätzte Reparaturkosten von 650–1.150 € rechtfertigen einen Preisnachlass in dieser Höhe — oder ein Abstand vom Kauf, falls der Verkäufer nicht verhandelt.
            </p>
          </div>
          <button className="as-btn" onClick={onDone}>Bericht speichern <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
        </div>
      )}
    </div>
  );
}

/* ---------- Garage ---------- */

function GarageScreen() {
  return (
    <div className="as-fade">
      <ScreenHeader title="Meine Garage" subtitle="Vergleiche alle Fahrzeuge, die du gerade in Erwägung ziehst." />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {GARAGE.map((v, i) => {
          const c = levelColor(v.level);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)" }}>
              <RiskGauge score={v.score} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{v.meta}</div>
              </div>
              <span className="as-mono" style={{ fontSize: 10.5, padding: "3px 9px", borderRadius: 20, background: c.bg, color: c.fg, whiteSpace: "nowrap" }}>
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
      <button className="as-btn as-btn-ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Plus size={15} /> Fahrzeug hinzufügen
      </button>
    </div>
  );
}

/* ---------- Reports ---------- */

function ReportsScreen() {
  return (
    <div className="as-fade">
      <ScreenHeader title="Berichte" subtitle="Diagnoseberichte zum Teilen mit Verkäufer oder Werkstatt." />
      <div style={{ border: "1px solid var(--line)", borderRadius: 12, background: "var(--panel)", padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="as-display" style={{ fontSize: 16, fontWeight: 700 }}>{VEHICLE.name}</div>
            <div className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>{VEHICLE.vin}</div>
          </div>
          <RiskGauge score={62} size={52} />
        </div>
        <div className="as-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginBottom: 8 }}>ZUSAMMENFASSUNG</div>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 14px" }}>
          1 kritischer Fehlercode (Zylinder 3), 2 zu beachtende Punkte, empfohlener Preisnachlass 650–1.150 €.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="as-btn" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Download size={14} /> Als PDF
          </button>
          <button className="as-btn as-btn-ghost" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Share2 size={14} /> Teilen
          </button>
        </div>
      </div>
      <div className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>2 weitere gespeicherte Berichte</div>
    </div>
  );
}

/* ---------- Menu ---------- */

function MenuScreen() {
  return (
    <div className="as-fade">
      <ScreenHeader title="Mehr" subtitle="Weitere Bereiche der App." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MENU_ITEMS.map((m, i) => {
          const Icon = m.icon;
          return (
            <button key={i} style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={17} color="var(--blue-deep)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{m.desc}</div>
              </div>
              <ChevronRight size={16} color="var(--ink-faint)" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Intro ---------- */

function Intro({ onStart }) {
  return (
    <div className="as-fade" style={{ padding: "1.5rem 0" }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: "var(--blue-deep)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Gauge size={26} color="#fff" />
      </div>
      <h1 className="as-display" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: "0 0 14px" }}>
        AutoScan AI
      </h1>
      <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 420 }}>
        Prüfe ein Auto in wenigen Minuten, bevor du es privat kaufst. Per OBD2-Adapter oder geführter Inspektion —
        AutoScan erkennt technische Risiken und übersetzt sie in eine klare Kaufentscheidung.
      </p>
      <button className="as-btn" onClick={onStart}>App öffnen <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
    </div>
  );
}

/* ---------- Shell ---------- */

const TABS = [
  { id: "home", label: "Start", icon: Home },
  { id: "diagnose", label: "Diagnose", icon: Activity },
  { id: "garage", label: "Garage", icon: Car },
  { id: "reports", label: "Berichte", icon: FileText },
  { id: "menu", label: "Mehr", icon: Menu },
];

export default function AutoScanApp() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("home");

  return (
    <div className="as-root" style={{ maxWidth: 420, margin: "0 auto" }}>
      <style>{FONTS + TOKENS}</style>
      <div style={{ border: "1px solid var(--line)", borderRadius: 20, background: "var(--paper)", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem 1.35rem 1.1rem", minHeight: 480 }}>
          {!entered ? (
            <Intro onStart={() => setEntered(true)} />
          ) : (
            <>
              {tab === "home" && <HomeScreen onStartDiagnose={() => setTab("diagnose")} onOpenGarage={() => setTab("garage")} />}
              {tab === "diagnose" && <DiagnoseFlow onDone={() => setTab("reports")} />}
              {tab === "garage" && <GarageScreen />}
              {tab === "reports" && <ReportsScreen />}
              {tab === "menu" && <MenuScreen />}
            </>
          )}
        </div>

        {entered && (
          <div style={{ display: "flex", borderTop: "1px solid var(--line)", background: "var(--panel)" }}>
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                    padding: "10px 4px 12px", background: "none", border: "none", cursor: "pointer",
                    color: active ? "var(--blue-deep)" : "var(--ink-faint)",
                  }}
                >
                  <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                  <span style={{ fontSize: 10.5, fontWeight: active ? 600 : 500 }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
