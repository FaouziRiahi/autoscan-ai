import React, { useState, useEffect, useRef } from "react";
import {
  Home, Activity, Car, FileText, Menu, Bluetooth, AlertTriangle,
  CheckCircle2, ChevronRight, ChevronLeft, Wrench, MapPin, Settings,
  HelpCircle, Info, X, Plus, Gauge, Search, Share2, Download, ShieldCheck,
  Upload, Edit3, Newspaper, ExternalLink,
} from "lucide-react";
import { recognize } from "tesseract.js";

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
.as-btn:disabled { opacity: 0.45; cursor: default; }
.as-btn:disabled:hover { opacity: 0.45; }
.as-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: 13.5px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s ease;
}
.as-input:focus { border-color: var(--blue); }
.as-fade { animation: asFade 0.4s ease both; }
@keyframes asFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
@keyframes asDash { to { stroke-dashoffset: var(--dash-end); } }
@media (prefers-reduced-motion: reduce) { .as-fade { animation: none; } }
`;

/* ---------- data ---------- */

const VEHICLE = { name: "VW Golf VI 1.6 TDI", year: 2011, km: "187.000 km", vin: "WVWZZZ1KZBW••••42" };

// Raw, uninterpreted scan output — interpretFindings() below turns these into the
// human-readable findings, risk score and negotiation advice shown in the app.
const RAW_SCAN_FINDINGS = [
  "OBD2-Fehlercode P0303: Zündaussetzer erkannt, Zylinder 3",
  "OBD2-Fehlercode P0171: Gemisch zu mager, Bank 1",
  "Sichtprüfung: Bremsbeläge vorne, Restdicke unter 3 mm",
  "Sichtprüfung: Ölstand und Ölfarbe unauffällig",
];

// No paid API involved — this is a small local rule engine that recognizes the known
// demo findings above and produces the same report shape a real diagnosis service would.
const FINDING_RULES = [
  {
    match: (s) => s.includes("P0303"),
    title: "Zündaussetzer Zylinder 3",
    level: "critical",
    description: "Der Motor erkennt unregelmäßige Verbrennung in Zylinder 3. Mögliche Ursachen: defekte Einspritzdüse, Glühkerze oder Kompressionsverlust.",
    costRangeEur: "450–900 €",
  },
  {
    match: (s) => s.includes("P0171"),
    title: "Gemisch zu mager (Bank 1)",
    level: "warning",
    description: "Das Luft-Kraftstoff-Gemisch weicht vom Sollwert ab. Häufig durch undichten Ansaugtrakt oder verschmutzten Luftmassenmesser.",
    costRangeEur: "80–250 €",
  },
  {
    match: (s) => /bremsbel/i.test(s),
    title: "Bremsbeläge vorne, Restdicke gering",
    level: "warning",
    description: "Sichtprüfung zeigt weniger als 3 mm Restbelag. Wechsel in den nächsten 3.000–5.000 km empfohlen.",
    costRangeEur: "120–200 €",
  },
  {
    match: (s) => /ölstand/i.test(s),
    title: "Ölstand & Ölqualität",
    level: "ok",
    description: "Ölstand im Sollbereich, keine Auffälligkeiten bei Farbe oder Konsistenz.",
    costRangeEur: "—",
  },
];

function parseCostRange(str) {
  const m = str.match(/(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)/);
  if (!m) return null;
  const parseNum = (s) => parseInt(s.replace(/\./g, ""), 10);
  return [parseNum(m[1]), parseNum(m[2])];
}

function interpretFindings(rawFindings) {
  const findings = rawFindings.map((raw) => {
    const rule = FINDING_RULES.find((r) => r.match(raw));
    return rule
      ? { code: raw, title: rule.title, level: rule.level, description: rule.description, costRangeEur: rule.costRangeEur }
      : { code: raw, title: raw, level: "warning", description: "Dieser Befund konnte nicht automatisch eingeordnet werden — bitte in einer Werkstatt prüfen lassen.", costRangeEur: "—" };
  });

  const criticalCount = findings.filter((f) => f.level === "critical").length;
  const warningCount = findings.filter((f) => f.level === "warning").length;
  const score = Math.max(5, 100 - criticalCount * 25 - warningCount * 12);

  const costRanges = findings.map((f) => parseCostRange(f.costRangeEur)).filter(Boolean);
  const totalLow = costRanges.reduce((sum, [lo]) => sum + lo, 0);
  const totalHigh = costRanges.reduce((sum, [, hi]) => sum + hi, 0);
  const totalCostText = costRanges.length ? `${totalLow.toLocaleString("de-DE")}–${totalHigh.toLocaleString("de-DE")} €` : null;

  const summary =
    criticalCount > 0
      ? `${criticalCount} kritischer Fund, ${warningCount} zu beachtende ${warningCount === 1 ? "Punkt" : "Punkte"}. Kauf nur mit Preisverhandlung empfehlenswert.`
      : warningCount > 0
        ? `${warningCount} zu beachtende ${warningCount === 1 ? "Punkt" : "Punkte"}, keine kritischen Befunde. Insgesamt guter Zustand.`
        : "Keine Auffälligkeiten festgestellt. Fahrzeug in gutem technischen Zustand.";

  const negotiationAdvice = totalCostText
    ? `Geschätzte Reparaturkosten von ${totalCostText} rechtfertigen einen Preisnachlass in dieser Höhe — oder ein Abstand vom Kauf, falls der Verkäufer nicht verhandelt.`
    : "Keine nennenswerten Reparaturkosten zu erwarten — eine Preisverhandlung aufgrund technischer Mängel ist hier nicht notwendig.";

  return { score, summary, findings, negotiationAdvice };
}

const CHECKLIST = [
  { label: "Serviceheft vollständig & lückenlos", checked: true },
  { label: "Nachweis Zahnriemenwechsel vorhanden", checked: false },
  { label: "Rost an Schwellern & Radläufen", checked: true },
  { label: "Unfallfreiheit über HU-Bericht plausibel", checked: true },
];

const GARAGE = [
  { name: "VW Golf VI 1.6 TDI", year: "2011", km: "187.000", vin: VEHICLE.vin, note: "Kleinanzeige A", score: 62, level: "warning" },
  { name: "Opel Astra J 1.4", year: "2013", km: "142.000", vin: "W0L0AHL4863123456", note: "Kleinanzeige B", score: 88, level: "ok" },
  { name: "Ford Focus III", year: "2012", km: "165.000", vin: "WF0KXXGCDKBA12345", note: "Kleinanzeige C", score: 34, level: "critical" },
];

function vehicleMeta(v) {
  return [v.year, v.km ? `${v.km} km` : null, v.note || null].filter(Boolean).join(" · ");
}

const MENU_ITEMS = [
  { id: "news", icon: Newspaper, title: "Aktuelle KFZ-News", desc: "Tägliche Rückruf- und Marktmeldungen, automatisch zusammengestellt." },
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
  if (level === "new") return { fg: "var(--ink-faint)", bg: "var(--panel-2)", label: "Nicht geprüft" };
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

function VehicleAvatar({ score, size = 48 }) {
  if (score == null) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--panel-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Car size={Math.round(size * 0.42)} color="var(--ink-faint)" />
      </div>
    );
  }
  return <RiskGauge score={score} size={size} />;
}

const vehicleImageCache = new Map();

const BRAND_ALIASES = { vw: "Volkswagen", mercedes: "Mercedes-Benz", skoda: "Škoda" };
const BMW_SERIES_RE = /^(\d)er$/i;
const GEN_TOKEN_RE = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|[A-Z])$/;

// Turns a free-text vehicle name ("VW Golf VI 1.6 TDI") into Commons search phrases:
// a specific one including the generation code ("Volkswagen Golf VI") and a broader
// fallback without it ("Volkswagen Golf"), since generation codes aren't always present
// or don't always match how the file happens to be titled on Commons.
function vehicleSearchTerms(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return { specific: null, broad: name };

  const brand = BRAND_ALIASES[words[0].toLowerCase()] || words[0];
  const bmwSeries = (words[1] || "").match(BMW_SERIES_RE);
  const model = bmwSeries ? `${bmwSeries[1]} Series` : words[1] || "";
  const genWord = words[2] || "";

  const broad = `${brand} ${model}`.trim();
  const specific = GEN_TOKEN_RE.test(genWord) ? `${broad} ${genWord}` : null;
  return { specific, broad };
}

async function fetchCommonsVehiclePhoto(phrase) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `intitle:"${phrase}"`,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|mime",
    iiurlwidth: "160",
    format: "json",
    origin: "*",
  });
  const data = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`).then((r) => r.json());
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  // only accept actual photos — search hits can include PDFs, SVG diagrams, scanned documents, etc.
  const match = pages.find((p) => {
    const mime = p?.imageinfo?.[0]?.mime || "";
    return mime === "image/jpeg" || mime === "image/png";
  });
  return match?.imageinfo?.[0]?.thumburl || null;
}

function useVehicleImageUrl(name) {
  const [url, setUrl] = useState(() => (vehicleImageCache.has(name) ? vehicleImageCache.get(name) : undefined));

  useEffect(() => {
    if (!name) return;
    if (vehicleImageCache.has(name)) {
      setUrl(vehicleImageCache.get(name));
      return;
    }
    let cancelled = false;
    (async () => {
      let found = null;
      try {
        const { specific, broad } = vehicleSearchTerms(name);
        if (specific) found = await fetchCommonsVehiclePhoto(specific);
        if (!found) found = await fetchCommonsVehiclePhoto(broad);
      } catch {
        found = null;
      }
      vehicleImageCache.set(name, found);
      if (!cancelled) setUrl(found);
    })();
    return () => {
      cancelled = true;
    };
  }, [name]);

  return url;
}

function VehiclePhoto({ name, size = 40 }) {
  const url = useVehicleImageUrl(name);
  const [errored, setErrored] = useState(false);
  const showFallback = !url || errored;

  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
      {showFallback ? (
        <Car size={Math.round(size * 0.5)} color="var(--ink-faint)" />
      ) : (
        <img
          src={url}
          alt={name}
          onError={() => setErrored(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
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
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 8px" }}>{f.description}</p>
          {f.costRangeEur && f.costRangeEur !== "—" && (
            <div className="as-mono" style={{ fontSize: 11.5, color: c.fg }}>Geschätzte Reparaturkosten: {f.costRangeEur}</div>
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

function HomeScreen({ onStartDiagnose, onOpenGarage, vehicles }) {
  const diagnosed = vehicles.filter((v) => v.score != null);
  const criticalCount = vehicles.filter((v) => v.level === "critical").length;

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
          <div className="as-display" style={{ fontSize: 22, fontWeight: 700 }}>{vehicles.length}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Fahrzeuge im Vergleich</div>
        </div>
        <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)" }}>
          <div className="as-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--red)" }}>{criticalCount}</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>kritischer Fund offen</div>
        </div>
      </div>

      <div style={{ marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>GEPRÜFTE FAHRZEUGE</span>
        <button onClick={onOpenGarage} style={{ background: "none", border: "none", color: "var(--blue)", fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>
          Alle ansehen
        </button>
      </div>
      {diagnosed.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>Noch keine Diagnose durchgeführt.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {diagnosed.map((v, i) => (
            <button
              key={i}
              onClick={onOpenGarage}
              style={{ width: "100%", textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
            >
              <VehicleAvatar score={v.score} size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{vehicleMeta(v)}</div>
              </div>
              <ChevronRight size={16} color="var(--ink-faint)" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Diagnose flow ---------- */

function DiagnoseFlow({ onDone, vehicles, sub, goToSub }) {
  const [scanPct, setScanPct] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [openFault, setOpenFault] = useState(null);
  const [selected, setSelected] = useState(0);
  const [report, setReport] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const SUBS = ["Fahrzeug", "Verbindung", "Scan", "Ergebnis", "Kaufberatung"];
  const chosen = vehicles[selected] ?? null;

  useEffect(() => {
    if (sub !== 2) return;
    setScanPct(0);
    setFoundCount(0);
    setReport(null);
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

  useEffect(() => {
    if (sub !== 2 || scanPct < 100 || report) return;
    setEvaluating(true);
    const t = setTimeout(() => {
      setReport(interpretFindings(RAW_SCAN_FINDINGS));
      setEvaluating(false);
    }, 600);
    return () => clearTimeout(t);
  }, [sub, scanPct, report]);

  const reportLevel = report ? (report.score >= 75 ? "ok" : report.score >= 45 ? "warning" : "critical") : null;
  const reportBannerText = { critical: "KRITISCHER BEFUND", warning: "ERHÖHTES RISIKO", ok: "GERINGES RISIKO" }[reportLevel];

  return (
    <div className="as-fade">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        {sub > 0 && (
          <button onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <ChevronLeft size={18} />
          </button>
        )}
        <div className="as-mono" style={{ fontSize: 11, color: "var(--blue)" }}>
          SCHRITT {sub + 1}/5 · {SUBS[sub].toUpperCase()}
        </div>
      </div>

      {sub === 0 && (
        <div>
          <ScreenHeader title="Welches Fahrzeug prüfst du?" subtitle="Wähle eines deiner gespeicherten Fahrzeuge aus der Garage." />
          {vehicles.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
              Noch keine Fahrzeuge in der Garage. Füge zuerst eines hinzu.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {vehicles.map((v, i) => {
                const active = i === selected;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, textAlign: "left", borderRadius: 10, padding: "13px 15px", cursor: "pointer",
                      border: active ? "1px solid var(--blue)" : "1px solid var(--line)",
                      background: active ? "var(--blue-soft)" : "var(--panel)",
                    }}
                  >
                    <VehiclePhoto name={v.name} size={40} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: active ? "var(--blue-deep)" : "var(--ink)" }}>{v.name}</div>
                      <div className="as-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{v.vin || "keine FIN hinterlegt"} · {vehicleMeta(v)}</div>
                    </div>
                    {active && <CheckCircle2 size={18} color="var(--blue-deep)" style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          )}
          <button className="as-btn" disabled={!chosen} onClick={() => goToSub(1)}>Weiter <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
        </div>
      )}

      {sub === 1 && (
        <div>
          <ScreenHeader title="Wie möchtest du prüfen?" subtitle="Ein OBD2-Adapter liest Motordaten direkt aus. Ohne Zugriff führt dich AutoScan durch eine manuelle Inspektion." />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <button onClick={() => goToSub(2)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--blue)", borderRadius: 10, padding: "14px", background: "var(--blue-soft)", cursor: "pointer" }}>
              <Bluetooth size={20} color="var(--blue-deep)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue-deep)" }}>OBD2-Adapter verbinden</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Empfohlen — Bluetooth-Dongle am Fahrzeug</div>
              </div>
            </button>
            <button onClick={() => goToSub(2)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)", cursor: "pointer" }}>
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
          {scanPct < 100 ? (
            <button className="as-btn as-btn-ghost" disabled style={{ opacity: 0.5, cursor: "default" }}>Scan läuft…</button>
          ) : evaluating ? (
            <button className="as-btn as-btn-ghost" disabled style={{ opacity: 0.6, cursor: "default" }}>Befunde werden ausgewertet…</button>
          ) : (
            <button className="as-btn" onClick={() => goToSub(3)}>Ergebnis ansehen <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
          )}
        </div>
      )}

      {sub === 3 && (
        <div>
          {!report ? (
            <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Kein Ergebnis verfügbar — bitte Scan erneut durchführen.</p>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18, padding: 16, border: "1px solid var(--line)", borderRadius: 12, background: "var(--panel)" }}>
                <RiskGauge score={report.score} size={76} />
                <div>
                  <div className="as-mono" style={{ fontSize: 11, color: levelColor(reportLevel).fg, marginBottom: 4 }}>{reportBannerText}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{report.summary}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {report.findings.map((f, i) => (
                  <FaultCard key={i} f={f} open={openFault === i} onToggle={() => setOpenFault(openFault === i ? null : i)} />
                ))}
              </div>
              <button className="as-btn" onClick={() => goToSub(4)}>Zur Kaufberatung <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
            </>
          )}
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
          {report && (
            <div style={{ border: "1px solid var(--amber)", background: "var(--amber-soft)", borderRadius: 10, padding: 16, marginBottom: 18 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--amber)", marginBottom: 6 }}>Verhandlungsempfehlung</div>
              <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>{report.negotiationAdvice}</p>
            </div>
          )}
          <button className="as-btn" onClick={onDone}>Bericht speichern <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} /></button>
        </div>
      )}
    </div>
  );
}

/* ---------- Garage ---------- */

function TextField({ label, value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label className="as-mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", display: "block", marginBottom: 4 }}>
        {label}{required && " *"}
      </label>
      <input
        className="as-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const EMPTY_VEHICLE_FORM = { name: "", year: "", km: "", vin: "", plate: "" };

const KNOWN_BRANDS = [
  "VW", "Volkswagen", "BMW", "Audi", "Mercedes-Benz", "Mercedes", "Opel", "Ford",
  "Skoda", "Škoda", "Seat", "Renault", "Peugeot", "Citroen", "Citroën", "Fiat",
  "Toyota", "Honda", "Hyundai", "Kia", "Mazda", "Nissan", "Volvo", "Mini", "Porsche",
];

function parseVehicleDoc(rawText) {
  const joined = rawText.replace(/\s+/g, " ");
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  const vinMatch = joined.match(/\b[A-HJ-NPR-Z0-9]{17}\b/);
  const dateMatch = joined.match(/\b\d{2}\.\d{2}\.(\d{4})\b/);
  const yearMatch = dateMatch || joined.match(/\b(19|20)\d{2}\b/);
  const plateMatch = joined.match(/\b[A-ZÄÖÜ]{1,3}[\s-][A-Z]{1,2}[\s-]?\d{1,4}\b/);

  const isFieldLabelLine = (l) =>
    /^[A-Z]\.?\d?\s|^\d\.\d\s|^(Marke|Handelsbezeichnung|Kennzeichen|Erstzulassung|Fahrzeug-Ident|Datum)/i.test(l);

  let brandModel = "";
  const brandLineIdx = lines.findIndex((l) => KNOWN_BRANDS.some((b) => l.toUpperCase().includes(b.toUpperCase())));
  if (brandLineIdx !== -1) {
    const cleanedFirst = lines[brandLineIdx]
      .replace(/^(D\.?1|D\.?2|Marke|Handelsbezeichnung)[:\s.]*?/i, "")
      .trim();
    const next = lines[brandLineIdx + 1];
    const parts = [cleanedFirst];
    if (next && !isFieldLabelLine(next)) parts.push(next);
    brandModel = parts.filter(Boolean).join(" ").trim().slice(0, 60);
  }

  return {
    brandModel,
    year: yearMatch ? yearMatch[yearMatch.length - 1] : "",
    vin: vinMatch ? vinMatch[0] : "",
    plate: plateMatch ? plateMatch[0] : "",
  };
}

function AddVehicleFlow({ onCancel, onSave }) {
  const [step, setStep] = useState("choice"); // choice | analyzing | form | error
  const [viaUpload, setViaUpload] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState(EMPTY_VEHICLE_FORM);
  const [notice, setNotice] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  async function handleFilePicked(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setFileName(file.name);
    setNotice(null);
    setProgress(0);
    setStep("analyzing");
    try {
      const { data } = await recognize(file, "deu+eng", {
        logger: (m) => {
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      const extracted = parseVehicleDoc(data.text || "");

      setForm({
        name: extracted.brandModel,
        year: extracted.year,
        km: "",
        vin: extracted.vin,
        plate: extracted.plate,
      });
      setViaUpload(true);
      if (!extracted.brandModel && !extracted.vin) {
        setNotice("Es konnten kaum Angaben ausgelesen werden (Texterkennung läuft lokal im Browser und ist bei Fotos empfindlich) — bitte Felder manuell ergänzen oder ein schärferes Foto versuchen.");
      } else {
        setNotice("Angaben per Texterkennung im Browser ausgelesen — bitte sorgfältig gegen das Dokument prüfen.");
      }
      setStep("form");
    } catch (err) {
      setErrorMsg(err.message || "Die Texterkennung ist fehlgeschlagen.");
      setStep("error");
    }
  }

  function startManual() {
    setForm(EMPTY_VEHICLE_FORM);
    setViaUpload(false);
    setNotice(null);
    setStep("form");
  }

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canSave = form.name.trim() && form.year.trim() && form.vin.trim();

  function handleSave() {
    if (!canSave) return;
    onSave({
      name: form.name.trim(),
      year: form.year.trim(),
      km: form.km.trim(),
      vin: form.vin.trim(),
      note: form.plate.trim() || null,
      score: null,
      level: "new",
    });
  }

  return (
    <div className="as-fade">
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFilePicked} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {step === "form" && (
            <button onClick={() => setStep("choice")} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <ChevronLeft size={18} />
            </button>
          )}
          <div className="as-mono" style={{ fontSize: 11, color: "var(--blue)" }}>FAHRZEUG HINZUFÜGEN</div>
        </div>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <X size={18} color="var(--ink-faint)" />
        </button>
      </div>

      {step === "choice" && (
        <div>
          <ScreenHeader title="Wie möchtest du das Fahrzeug erfassen?" subtitle="Lade ein Foto von Seite 1 der Zulassungsbescheinigung hoch — die Texterkennung läuft kostenlos direkt in deinem Browser und versucht, Marke, Modell, FIN und Erstzulassung auszulesen. Alternativ trägst du alle Angaben selbst ein." />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--blue)", borderRadius: 10, padding: "14px", background: "var(--blue-soft)", cursor: "pointer" }}>
              <Upload size={20} color="var(--blue-deep)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue-deep)" }}>Zulassungsbescheinigung hochladen</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Foto von Seite 1 (Fahrzeugschein) — kostenlose Texterkennung im Browser</div>
              </div>
            </button>
            <button onClick={startManual} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "14px", background: "var(--panel)", cursor: "pointer" }}>
              <Edit3 size={20} color="var(--ink-soft)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Alle Felder manuell ausfüllen</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Marke, Modell, FIN & Co. selbst eintragen</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {step === "analyzing" && (
        <div>
          <ScreenHeader title="Dokument wird analysiert" subtitle="Texterkennung läuft lokal in deinem Browser — es werden keine Daten hochgeladen." />
          <div className="as-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={14} /> {fileName}
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "var(--panel-2)", overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "var(--blue)", transition: "width 0.1s linear" }} />
          </div>
          <div className="as-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{progress < 100 ? Math.round(progress) : 100}%</div>
        </div>
      )}

      {step === "error" && (
        <div>
          <ScreenHeader title="Analyse fehlgeschlagen" subtitle="Das Dokument konnte nicht ausgewertet werden." />
          <div style={{ border: "1px solid var(--red)", background: "var(--red-soft)", borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AlertTriangle size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>{errorMsg}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="as-btn" onClick={() => setStep("choice")}>Erneut versuchen</button>
            <button className="as-btn as-btn-ghost" onClick={startManual}>Stattdessen manuell eingeben</button>
          </div>
        </div>
      )}

      {step === "form" && (
        <div>
          <ScreenHeader
            title={viaUpload ? "Erkannte Fahrzeugdaten prüfen" : "Fahrzeugdaten eingeben"}
            subtitle={viaUpload ? "Bitte kontrolliere die aus der Zulassungsbescheinigung erkannten Angaben und ergänze den Kilometerstand." : "Trage die Angaben zum Fahrzeug ein."}
          />
          {notice && (
            <div style={{ border: "1px solid var(--amber)", background: "var(--amber-soft)", borderRadius: 10, padding: 12, marginBottom: 14, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <AlertTriangle size={15} color="var(--amber)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>{notice}</p>
            </div>
          )}
          <TextField label="Marke & Modell" required value={form.name} onChange={(v) => updateField("name", v)} placeholder="z. B. VW Golf VI 1.6 TDI" />
          <TextField label="Erstzulassung (Jahr)" required value={form.year} onChange={(v) => updateField("year", v)} placeholder="z. B. 2015" />
          <TextField label="Kilometerstand" value={form.km} onChange={(v) => updateField("km", v)} placeholder="z. B. 142.000" />
          <TextField label="Fahrzeug-Ident-Nr. (FIN/VIN)" required value={form.vin} onChange={(v) => updateField("vin", v)} placeholder="z. B. WVWZZZ1KZBW123456" />
          <TextField label="Kennzeichen" value={form.plate} onChange={(v) => updateField("plate", v)} placeholder="z. B. M-AS 1234" />
          <button className="as-btn" disabled={!canSave} onClick={handleSave} style={{ width: "100%", marginTop: 6 }}>
            Fahrzeug speichern <ChevronRight size={14} style={{ verticalAlign: -2, marginLeft: 2 }} />
          </button>
        </div>
      )}
    </div>
  );
}

function GarageScreen({ vehicles, onAddVehicle, adding, setAdding }) {
  if (adding) {
    return (
      <AddVehicleFlow
        onCancel={() => window.history.back()}
        onSave={(v) => {
          onAddVehicle(v);
          window.history.back();
        }}
      />
    );
  }

  return (
    <div className="as-fade">
      <ScreenHeader title="Meine Garage" subtitle="Vergleiche alle Fahrzeuge, die du gerade in Erwägung ziehst." />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {vehicles.map((v, i) => {
          const c = levelColor(v.level);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)" }}>
              <VehicleAvatar score={v.score} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{vehicleMeta(v)}</div>
              </div>
              <span className="as-mono" style={{ fontSize: 10.5, padding: "3px 9px", borderRadius: 20, background: c.bg, color: c.fg, whiteSpace: "nowrap" }}>
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
      <button className="as-btn as-btn-ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => setAdding(true)}>
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

function NewsScreen({ onCancel }) {
  const [state, setState] = useState({ status: "loading", updatedAt: null, items: [] });

  useEffect(() => {
    let cancelled = false;
    fetch("/news.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("news.json nicht gefunden");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const items = Array.isArray(data.items) ? data.items.filter((it) => it.link) : [];
        setState({ status: "ok", updatedAt: data.updatedAt || null, items });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", updatedAt: null, items: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="as-fade">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div className="as-mono" style={{ fontSize: 11, color: "var(--blue)" }}>AKTUELLE KFZ-NEWS</div>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <X size={18} color="var(--ink-faint)" />
        </button>
      </div>
      <ScreenHeader
        title="Rückruf- & Marktmeldungen"
        subtitle={state.updatedAt ? `Zuletzt aktualisiert: ${new Date(state.updatedAt).toLocaleString("de-DE")}` : "Wird täglich per n8n-Workflow aktualisiert."}
      />
      {state.status === "loading" && <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Lade News…</p>}
      {state.status === "error" && (
        <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Keine News gefunden — der n8n-Workflow muss zuerst einmal laufen.</p>
      )}
      {state.status === "ok" && state.items.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>Noch keine News vorhanden — der n8n-Workflow wurde noch nicht ausgeführt.</p>
      )}
      {state.status === "ok" && state.items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {state.items.map((it, i) => (
            <a
              key={i}
              href={it.link}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)", textDecoration: "none", color: "inherit" }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4 }}>{it.title}</div>
                <div className="as-mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 4 }}>
                  {it.source || "Quelle unbekannt"}{it.pubDate ? ` · ${new Date(it.pubDate).toLocaleDateString("de-DE")}` : ""}
                </div>
              </div>
              <ExternalLink size={15} color="var(--ink-faint)" style={{ flexShrink: 0, marginTop: 2 }} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuScreen({ newsOpen, setNewsOpen }) {
  if (newsOpen) {
    return <NewsScreen onCancel={() => window.history.back()} />;
  }

  return (
    <div className="as-fade">
      <ScreenHeader title="Mehr" subtitle="Weitere Bereiche der App." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MENU_ITEMS.map((m, i) => {
          const Icon = m.icon;
          return (
            <button
              key={i}
              onClick={m.id === "news" ? () => setNewsOpen(true) : undefined}
              style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", border: "1px solid var(--line)", borderRadius: 10, padding: "13px 15px", background: "var(--panel)", cursor: "pointer" }}
            >
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

const INITIAL_NAV = { entered: false, tab: "home", diagnoseSub: 0, garageAdding: false, newsOpen: false };

function useAppNav(initialState) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (window.history.state?.__asNav) {
      setState(window.history.state.nav);
    } else {
      window.history.replaceState({ __asNav: true, nav: initialState }, "");
    }
    function onPopState(e) {
      setState(e.state?.__asNav ? e.state.nav : initialState);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigate(patch) {
    const next = typeof patch === "function" ? patch(state) : { ...state, ...patch };
    window.history.pushState({ __asNav: true, nav: next }, "");
    setState(next);
  }

  return [state, navigate];
}

const VEHICLES_STORAGE_KEY = "autoscan.vehicles";

function loadStoredVehicles() {
  try {
    const raw = window.localStorage.getItem(VEHICLES_STORAGE_KEY);
    if (!raw) return GARAGE;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : GARAGE;
  } catch {
    return GARAGE;
  }
}

export default function AutoScanApp() {
  const [nav, navigate] = useAppNav(INITIAL_NAV);
  const { entered, tab, diagnoseSub, garageAdding, newsOpen } = nav;
  const [vehicles, setVehicles] = useState(loadStoredVehicles);

  useEffect(() => {
    try {
      window.localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
    } catch {
      // storage unavailable (private mode, quota, etc.) — app still works, just without persistence
    }
  }, [vehicles]);

  function goToTab(next) {
    navigate({ tab: next, diagnoseSub: 0, garageAdding: false, newsOpen: false });
  }

  return (
    <div className="as-root" style={{ width: "100vw", height: "100vh" }}>
      <style>{FONTS + TOKENS}</style>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "var(--paper)", overflow: "hidden" }}>
        <div
          style={
            !entered
              ? { flex: 1, overflow: "auto", padding: "1.5rem 1.35rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }
              : { flex: 1, overflow: "auto", padding: "1.5rem 1.35rem 1.1rem" }
          }
        >
          {!entered ? (
            <Intro onStart={() => navigate({ entered: true })} />
          ) : (
            <>
              {tab === "home" && <HomeScreen onStartDiagnose={() => goToTab("diagnose")} onOpenGarage={() => goToTab("garage")} vehicles={vehicles} />}
              {tab === "diagnose" && (
                <DiagnoseFlow
                  onDone={() => goToTab("reports")}
                  vehicles={vehicles}
                  sub={diagnoseSub}
                  goToSub={(n) => navigate({ diagnoseSub: n })}
                />
              )}
              {tab === "garage" && (
                <GarageScreen
                  vehicles={vehicles}
                  onAddVehicle={(v) => setVehicles((list) => [...list, v])}
                  adding={garageAdding}
                  setAdding={(v) => navigate({ garageAdding: v })}
                />
              )}
              {tab === "reports" && <ReportsScreen />}
              {tab === "menu" && <MenuScreen newsOpen={newsOpen} setNewsOpen={(v) => navigate({ newsOpen: v })} />}
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
                  onClick={() => goToTab(t.id)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                    padding: "16px 4px 18px", background: "none", border: "none", cursor: "pointer",
                    color: active ? "var(--blue)" : "var(--ink-faint)",
                  }}
                >
                  <Icon size={26} strokeWidth={active ? 2.4 : 2} />
                  <span style={{ fontSize: 13, fontWeight: active ? 600 : 500 }}>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
