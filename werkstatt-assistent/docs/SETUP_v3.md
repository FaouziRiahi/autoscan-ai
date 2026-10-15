# AutoScan AI v3 – Werkstatt-Assistent · Setup und Test

## Dateien in diesem Ordner

| Datei | Zweck |
|---|---|
| `AutoScan-AI_v3_Werkstatt-Assistent.json` | Hauptworkflow (46 Nodes inkl. Dokumentation) |
| `AutoScan-AI_v3_Werkstatt-Assistent_Fehler-Alert.json` | Fehler-Workflow: schickt eine Gmail, wenn der Hauptworkflow abstürzt |
| `supabase_v3.sql` | Tabellen `autoscan_runs`, `autoscan_logs` und Auswertungs-Views |

## Ablauf

```
Formular (jede Sprache, 2 Fotos)  ─┐
Demo-Start (Testdaten)            ─┴→ 01 Konfiguration + Eingabe → 02 Supabase: Lauf starten
→ 05 Fotos? → 06–08 OpenRouter Vision (Fahrzeugschein + Armaturenbrett)
→ 10 FIN? → 11–12 NHTSA vPIC (Plausibilitätsprüfung) → 14–15 NHTSA Rückrufe
→ 16 OBD2 (Simulation) + Werkstatt-Katalog → 17–18 Google Calendar: 3 freie Termine
→ 19–21 OpenRouter Bericht (Fallback-Modell) + Kostenschätzung + Empfehlung
→ 22 HTML-Bericht → 23 Gmail an Werkstatt → 25–26 Supabase: Lauf + Logs
→ 27–29 Alert per Gmail bei kritischem Fehler → 30 Ergebnis
```

## Einrichtung (ca. 20 Minuten)

1. **Supabase:** Inhalt von `supabase_v3.sql` im SQL Editor ausführen.
2. **Import:** Beide JSON-Dateien in n8n importieren (*Import from File*).
3. **Credentials:**
   - **OpenRouter:** Neues Credential vom Typ *Header Auth* mit Name `Authorization` und Wert `Bearer sk-or-v1-…` (Schlüssel aus openrouter.ai → Keys). In **Node 07** und **Node 20** auswählen.
   - **Supabase:** in **Node 02, 25, 26** prüfen (Service-Role-Schlüssel).
   - **Gmail OAuth2:** in **Node 23, 29** und im Fehler-Workflow auswählen.
   - **Google Calendar OAuth2:** in **Node 17** auswählen.
4. **Node 01 „Konfiguration und Eingabe“:** `werkstatt_email`, `alert_email` und bei Bedarf `kalender_id` eintragen (Standard `primary`).
5. **Fehler-Workflow:** Im Code-Node die Empfänger-Adresse eintragen und den Workflow aktivieren. Im Hauptworkflow unter *Settings → Error workflow* den Fehler-Workflow auswählen.

> Keine Schlüssel in Code-Nodes eintragen, nur in Credentials.

## Test-Reihenfolge für die Generalprobe

| # | Test | Erwartung in Node 30 |
|---|---|---|
| 1 | **00m Demo-Start** ausführen | `status: ABGESCHLOSSEN`, Sprache Türkisch, Empfehlung, 3 Termine, E-Mail `GESENDET`, DB `GESPEICHERT` |
| 2 | Formular mit anonymisiertem Fahrzeugschein + Armaturenbrett-Foto | Marke/Modell mit Quelle „Foto (KI)“, Warnleuchten im Bericht |
| 3 | Formular mit FIN `ABC` | `EINGABEFEHLER`, keine KI-Kosten, keine E-Mail |
| 4 | OpenRouter-Credential kurz falsch setzen | `VORLAGE_STATT_KI`, **Alert-Mail** kommt an |
| 5 | In Node 01 `modell_text` auf ein anderes OpenRouter-Modell setzen, z. B. `google/gemini-2.5-flash` | Bericht kommt; in Supabase `llm` steht das neue Modell mit eigenen Kosten |

Danach in Supabase: `select * from autoscan_tagesstatistik;` und `select * from autoscan_schritt_performance;`

## Lokal geprüft (Simulation mit nachgebauten API-Antworten)

| Szenario | Ergebnis |
|---|---|
| A Demo, alle APIs OK | ABGESCHLOSSEN, Empfehlung REPARIEREN, 195–538 €, 3 Termine, E-Mail + DB OK |
| B Formular mit 2 Fotos, OpenRouter 401 | Fotowerte mit Quelle übernommen, Öldruck-Warnleuchte erkannt, Vorlage statt KI, Alert gesendet |
| C Ungültige Eingabe | EINGABEFEHLER, keine KI-Aufrufe, keine E-Mail, Lauf in DB |
| D Kalender 403, vPIC-Timeout, Gmail-Fehler, Supabase 500 | Teilergebnis, Termine aus Arbeitszeit-Fallback, Alert gesendet |

Ein echter Lauf in n8n mit allen Credentials steht noch aus. Zu prüfen ist dabei besonders, wie das Formular die Foto-Felder benennt: Node 01 sucht Binärdaten, deren Name mit `fahrzeugschein` bzw. `armaturenbrett` beginnt.

## Versionierung

- `workflow_version` und `prompt_version` stehen in Node 01 und werden bei jedem Lauf in Supabase gespeichert.
- Jede Änderung: Version erhöhen → Workflow exportieren → Datei in Git committen. Die Sticky Note „🏷️ Versionen“ dient als Changelog.
- Mit n8n-Workflow-History kann man zu älteren Ständen zurück.
