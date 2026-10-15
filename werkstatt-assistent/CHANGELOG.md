# Changelog – AutoScan AI Werkstatt-Assistent

Versionen nach MAJOR.MINOR.PATCH. `workflow_version` und `prompt_version` werden ab v3 in jedem Lauf in Supabase gespeichert.

## Phase 3 · Demo, Dokumentation und v3 (15.10.2026)

- **3.0.2** – Fotowerte zusätzlich unter `eingabe.aus_fotos`; 0 km gilt als „nicht angegeben“.
- **3.0.1** – Neuer Workflow „Werkstatt-Assistent“: Formular in jeder Sprache mit 2 Fotos, OpenRouter mit Fallback-Modell, NHTSA vPIC und Rückrufe, OBD2-Simulation und Werkstatt-Katalog, Google Calendar, Kostenschätzung mit Empfehlung (reparieren / abwägen / Verkauf erwägen), Gmail-Versand, Supabase-Logging (Lauf + Schritte), Alerts und Fehler-Workflow. Fotos werden unabhängig vom Feldnamen erkannt. (Stand 3.0.0 wurde nicht separat exportiert.)
- Supabase-Schema (`datenbank/supabase_v3.sql`) und Präsentationen v2 und v3.
- **2.2.0** – Bestätigungsschritt für Fotowerte; bestätigte FIN darf vPIC nutzen; Bericht im Browser.
- **2.1.0** – Alle Nodes dokumentiert, Layout in sechs Blöcken.
- **2.0.1** – Demo-Konfiguration: Slack-Alert aus, Formularläufe ohne Referenzfall-ID.

## Phase 2 · Robustheit und Integrationen (12.–14.10.2026)

- **2.0.0** – Fahrzeugschein-Foto und OBD2-Simulator als Subworkflows integriert, Quellentrennung.
- **1.3.0** – Formular-Start und Foto-Eingang über Subworkflow.
- **1.2.1** – Hinweise zu Kosten und Promptvergleich.
- **1.2.0** – Referenz-Set mit 10 Fällen, Original- und optimierter Prompt.
- **1.1.0** – Werkstattanfrage mit Logging, Tokens, Kosten, Supabase und Alert.
- Module: Eingabeformular, Bildauswertung, OBD2-Simulator.
- Übungen Woche 2: Webhook-Mapping (POST/PATCH), Google Sheets, API-Aufbereitung und LLM-Vergleich; Testtabelle mit 12 Fällen.
- **1.0.0** – Fehlerbehandlung mit Try/Catch und Fallback (Woche 1).

## Phase 1 · Prototyp (09.09.–01.10.2026)

- Erste Testfälle (Happy Path, Edge Case, Fehlerszenarien).
- **0.2.0** – Fahrzeug-API vPIC und Normalisierung.
- **0.1.0** – Fehlercode-Diagnose-Agent.
- React-Prototyp der Oberfläche.
