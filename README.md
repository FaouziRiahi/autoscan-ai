# AutoScan AI

AutoScan AI ist eine intelligente Lösung zur schnellen und einfachen Analyse von Fahrzeugen. Über einen OBD2-Adapter oder eine geführte Sichtprüfung erfasst die App den technischen Zustand eines Gebrauchtwagens und übersetzt Fehlercodes und Befunde in eine klare, verständliche Kaufempfehlung.

## Funktionen

- **Diagnose-Flow**: Fahrzeug auswählen → OBD2-Adapter oder manuelle Inspektion → Scan → Ergebnis mit Risiko-Score → Kaufberatung mit Verhandlungsempfehlung.
- **Garage**: Verwaltung mehrerer Fahrzeuge. Neue Fahrzeuge werden entweder manuell erfasst oder per Foto der Zulassungsbescheinigung (kostenlose Texterkennung direkt im Browser).
- **Fahrzeugfotos**: Passende Fotos pro Marke/Modell/Generation werden automatisch und kostenlos von Wikimedia Commons geladen.
- **Berichte & Verlauf**: Übersicht aller bereits geprüften Fahrzeuge, dynamisch aus den echten Daten berechnet.
- **Aktuelle KFZ-News**: Täglich aktualisierter News-Feed (Rückrufe, Marktmeldungen), gespeist durch eine separate n8n-Automatisierung.

## Architektur

Die App ist bewusst **ohne eigenes Backend** gebaut — ein statischer Vite/React-Build, der komplett im Browser läuft:

| Bereich | Umsetzung |
|---|---|
| Persistenz | `localStorage` (Fahrzeugliste übersteht Neuladen, gerätegebunden) |
| Dokumenten-Erkennung | `tesseract.js` — Texterkennung läuft lokal im Browser, kein API-Key, keine Kosten |
| Fahrzeugfotos | Live-Suche gegen die Wikimedia-Commons-API (marke- und generationsspezifisch, auf echte Fotos gefiltert) |
| Diagnose-Interpretation | Lokale Regel-Engine (`interpretFindings`), die rohe Scan-Befunde in Titel/Schweregrad/Kosten/Kaufberatung übersetzt — bewusst kostenlos statt einer bezahlten KI-API |
| Navigation | Eigener History-Hook (`useAppNav`), der jede Navigation an die Browser-History koppelt — der Zurück-Button funktioniert überall wie erwartet |
| Tägliche News | Separater n8n-Workflow schreibt einmal täglich `frontend/public/news.json`; die App liest die Datei bei jedem Öffnen des News-Bildschirms. Push (Workflow) und Pull (App) sind bewusst entkoppelt — es gibt keine direkte Verbindung zwischen beiden Systemen |

## Projektstruktur

```
frontend/           Die eigentliche React-App (Vite)
  src/autoscan-ai.jsx   Hauptkomponente mit allen Screens
  public/news.json      Von n8n täglich geschriebene News-Datei
n8n/                 Exportierbarer n8n-Workflow für die täglichen KFZ-News
autoscan-ai.jsx      Ursprünglicher Prototyp (Referenz, nicht mehr aktiv gepflegt)
kfz-news-pipeline.png   Architektur-Diagramm der News-Pipeline
kfz-pipeline-table.png  Übersichtstabelle der n8n-Workflow-Schritte
```

## Setup

```bash
cd frontend
npm install
npm run dev
```

Die App läuft danach unter `http://localhost:5173`.

### n8n-Workflow einrichten

1. `n8n/daily-kfz-news-workflow.json` in eine laufende n8n-Instanz importieren.
2. Im letzten Knoten ("In App-Ordner schreiben") den Platzhalterpfad durch den echten, absoluten Pfad zu `frontend/public/news.json` auf dem Rechner ersetzen, auf dem n8n läuft.
3. Funktioniert nur, wenn n8n auf demselben Rechner wie dieses Projekt läuft (direkter Dateisystem-Zugriff, kein Upload-Schritt).
