# AutoScan AI – Werkstatt-Assistent

n8n-Workflow, der aus einer Kundenanfrage (Text in jeder Sprache, Fahrzeugschein- und Armaturenbrett-Foto) einen Werkstattbericht mit Ursachen, Teilen, Kostenspanne, Empfehlung und Terminvorschlägen erstellt und per E-Mail an die Werkstatt schickt.

**Aktueller Stand:** v3.0.2 → [`workflows/autoscan-v3-werkstatt-assistent.json`](workflows/autoscan-v3-werkstatt-assistent.json) · Einrichtung: [`docs/SETUP_v3.md`](docs/SETUP_v3.md)

## Ordner

| Ordner | Inhalt |
|---|---|
| `app-prototyp/` | Erster React-Prototyp (September 2026) |
| `workflows/` | Workflows: `v0.*` Anfänge, `uebungen/` Tagesaufgaben, `module/` Subworkflows, `autoscan-werkstattanfrage.json` (v1–v2), `autoscan-v3-*` (v3) |
| `datenbank/` | Supabase-Schema für Läufe, Logs und Statistik |
| `docs/` | Setup, Tests, Aufgaben, Präsentationen |

## Entwicklungszyklus

| Phase | Zeitraum | Tags | Schwerpunkt |
|---|---|---|---|
| **1 · Prototyp** | 09.09.–01.10.2026 | `v0.1.0`, `v0.2.0`, `phase-1-prototyp` | App-Prototyp, Diagnose-Agent, Fahrzeug-API, erste Testfälle |
| **2 · Robustheit + Integrationen** | 12.10.–14.10.2026 | `v1.0.0` … `v2.0.0`, `phase-2-integration` | Fehlerbehandlung, Webhooks, LLM-Vergleich, Logging/Kosten/Alert, Foto- und OBD2-Subworkflows |
| **3 · Demo + v3** | 15.10.2026 | `v2.0.1` … `v3.0.2`, `phase-3-v3` | Dokumentation, Bildbestätigung, OpenRouter, 6 APIs, Supabase-Logging, Alerts, Versionierung |

Die Hauptlinie `autoscan-werkstattanfrage.json` wird von Commit zu Commit weiterentwickelt. So zeigt `git log -p -- werkstatt-assistent/workflows/autoscan-werkstattanfrage.json` jede Änderung.

Details: [`CHANGELOG.md`](CHANGELOG.md)

## Hinweise

- Keine Zugangsdaten im Repository: Schlüssel liegen nur in n8n-Credentials.
- Nicht enthalten: Fotos mit persönlichen Daten, Bildschirmvideos, heruntergeladene Fremdbilder.
- Die Commits wurden nachträglich aus den lokalen Exporten erstellt; ihre Datumsangaben entsprechen dem Speicherzeitpunkt der jeweiligen Datei.
