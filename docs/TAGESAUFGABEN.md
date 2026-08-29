# AutoScan AI – Tagesaufgaben und Projektdokumentation

Dieses Dokument ist das zentrale, chronologische Arbeitstagebuch für AutoScan AI.  
Neue Einträge werden nach Datum sortiert und enthalten den auslösenden Prompt, die Aufgaben, Ergebnisse, Entscheidungen, Risiken und nächsten Schritte.

## Verwendung

1. Für jeden Arbeitstag einen neuen Abschnitt unter **Tagesprotokolle** anlegen.
2. Das Datum im Format `YYYY-MM-DD` verwenden.
3. Den ursprünglichen Prompt möglichst unverändert dokumentieren.
4. Aufgaben als überprüfbare Checkliste formulieren.
5. Ergebnisse und Entscheidungen nachvollziehbar festhalten.
6. Offene Punkte in den nächsten Tages- oder Sprint-Eintrag übernehmen.
7. Relevante Issues, Pull Requests, Commits und Dokumente verlinken.

## Statuswerte

| Status | Bedeutung |
|---|---|
| Offen | Noch nicht begonnen |
| In Arbeit | Bearbeitung läuft |
| Blockiert | Abhängigkeit oder Entscheidung fehlt |
| Erledigt | Abgeschlossen und geprüft |
| Zurückgestellt | Bewusst auf später verschoben |

## Vorlage für neue Tagesaufgaben

### YYYY-MM-DD – Kurzer Titel

**Prompt**

> Ursprünglichen Prompt hier einfügen.

**Tagesziel**

Kurze Beschreibung des erwarteten Ergebnisses.

**Aufgaben**

- [ ] Aufgabe 1
- [ ] Aufgabe 2
- [ ] Aufgabe 3

**Ergebnisse**

- Ergebnis oder erstelltes Artefakt
- Link zu Issue, Pull Request, Commit oder Dokument

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Noch offen | – | – |

**Chancen und Risiken**

| Typ | Beschreibung | Maßnahme |
|---|---|---|
| Chance | – | – |
| Risiko | – | – |

**Governance und Compliance**

- Datenschutz:
- Informationssicherheit:
- Rechtliche Prüfung:
- Freigaben:
- Dokumentationspflichten:

**Offene Punkte**

- [ ] Offener Punkt

**Nächste Schritte**

- [ ] Nächster konkreter Schritt

---

# Tagesprotokolle

## 2026-08-29 – Projektidee und Projektgrundlage definieren

**Prompt**

> Das erste Aufgabe ist: Projekt Idee präzisieren, Projektbeschreibung, Projekt-Setup und Ziel definieren, Chancen und Risiken, Meilensteine, Governance und Compliance.

**Tagesziel**

Eine klare und belastbare Projektgrundlage für AutoScan AI schaffen, die als Basis für Produktplanung, technische Entwicklung und spätere Prüfungen dient.

**Projektidee**

AutoScan AI ist eine mobile Anwendung zur intelligenten Fahrzeugdiagnose. Die App verbindet sich über einen kompatiblen OBD-II-Adapter mit einem Fahrzeug, liest standardisierte Diagnosefehlercodes und relevante Fahrzeugdaten aus und übersetzt diese in verständliche, vorsichtige Handlungsempfehlungen.

Der Mehrwert besteht nicht nur im Auslesen technischer Daten, sondern vor allem in ihrer nachvollziehbaren Interpretation für Menschen ohne umfassende Kfz-Kenntnisse.

**Projektbeschreibung**

AutoScan AI soll:

- eine Verbindung zu unterstützten OBD-II-Adaptern herstellen,
- standardisierte Fehlercodes und ausgewählte Fahrzeugdaten auslesen,
- Fehlercodes in verständlicher Sprache erklären,
- mögliche Ursachen und die Dringlichkeit darstellen,
- sinnvolle nächste Schritte empfehlen,
- Diagnoseberichte speichern und exportieren,
- die Grenzen der automatisierten Diagnose transparent anzeigen.

AutoScan AI ersetzt keine professionelle Werkstattdiagnose und trifft keine autonomen sicherheitskritischen Entscheidungen.

**Zielgruppe**

Die primäre Zielgruppe des MVP sind private Fahrzeughalter. Spätere Zielgruppen können Gebrauchtwagenkäufer, Hobbymechaniker, kleine Werkstätten und Fahrzeugserviceanbieter sein.

**MVP-Ziele**

- [ ] Unterstützten OBD-II-Adapter erkennen und verbinden
- [ ] Standardisierte Fehlercodes auslesen
- [ ] Fehlercodes verständlich erklären
- [ ] Mögliche Ursachen und Dringlichkeit darstellen
- [ ] Diagnosebericht speichern und exportieren
- [ ] Sicherheits- und Haftungshinweise deutlich anzeigen
- [ ] Ausschließlich lesenden Fahrzeugzugriff gewährleisten

**Nicht Bestandteil des ersten MVP**

- Löschen von Fehlercodes
- Steuerung oder Codierung von Fahrzeugfunktionen
- Schreibzugriff auf Steuergeräte
- autonome Reparaturentscheidungen
- Ersatz einer professionellen Werkstattdiagnose
- Garantie für KI-generierte Einschätzungen

**Projekt-Setup**

Vorgesehene Hauptkomponenten:

- Mobile App, zunächst mit Fokus auf Android
- Bluetooth- oder WLAN-Kommunikation mit OBD-II-Adaptern
- Diagnose-Engine mit regelbasierter Sicherheitslogik
- strukturierte Fehlercode-Datenbank
- KI-Komponente für verständliche Erklärungen
- Backend für Berichte und optionale Benutzerkonten
- automatisierte Tests und CI über GitHub Actions
- technische, fachliche und rechtliche Dokumentation unter `docs/`

Vorgesehene Repository-Struktur:

- `mobile/` – mobile Anwendung
- `backend/` – API und Geschäftslogik
- `shared/` – gemeinsame Datentypen
- `docs/` – Produkt-, Architektur- und Compliance-Dokumentation
- `tests/` – Integrations- und Systemtests
- `.github/` – Workflows und Vorlagen

**Erfolgskriterien**

| Kennzahl | Erstes Ziel |
|---|---:|
| Erfolgreiche Verbindungen mit unterstützten Adaptern | mindestens 90 % |
| Korrekte Zuordnung unterstützter Standardcodes | mindestens 95 % |
| Verständlichkeit in Nutzertests | mindestens 4 von 5 |
| Fehlerfreie Diagnosesitzungen | mindestens 95 % |
| Abgeschlossene Diagnoseabläufe | mindestens 80 % |

**Chancen und Risiken**

| Typ | Beschreibung | Maßnahme |
|---|---|---|
| Chance | Verständliche Orientierung vor einem Werkstattbesuch | Nutzerzentrierte Erklärungen und Berichte entwickeln |
| Chance | Unterstützung beim Gebrauchtwagenkauf | Späteren Prüfmodus als separates Feature evaluieren |
| Chance | Kooperationen mit Werkstätten und Serviceanbietern | Erst nach erfolgreichem MVP und Pilotphase prüfen |
| Risiko | Falsche oder erfundene KI-Einschätzungen | Strukturierte Datenbank als Primärquelle und regelbasierte Grenzen |
| Risiko | Unzuverlässige OBD-II-Adapter | Nur geprüfte Adapter offiziell unterstützen |
| Risiko | Unterschiede zwischen Fahrzeugmodellen | MVP auf standardisierte OBD-II-Funktionen begrenzen |
| Risiko | Sicherheitskritische Fehlinterpretation | Warnstufen, Eskalationsregeln und fachliche Prüfung einführen |
| Risiko | Datenschutz- oder Haftungsprobleme | Datenminimierung, Einwilligung und juristische Prüfung |
| Risiko | Abhängigkeit von externen KI-Anbietern | Anbieter abstrahieren und Fallback-Konzept vorbereiten |

**Meilensteine**

| Nr. | Meilenstein | Ergebnis | Status |
|---:|---|---|---|
| 1 | Projektdefinition | Ziele, Zielgruppe, Anforderungen und Grenzen dokumentiert | In Arbeit |
| 2 | Technischer Prototyp | Verbindung zu OBD-Simulator oder Testfahrzeug | Offen |
| 3 | Diagnose-Grundfunktion | Standardfehlercodes werden gelesen und angezeigt | Offen |
| 4 | Erklärungsmodul | Ursachen, Dringlichkeit und Hinweise werden erzeugt | Offen |
| 5 | MVP | Vollständiger Diagnoseablauf mit Bericht | Offen |
| 6 | Sicherheitsprüfung | Datenschutz-, Security- und Compliance-Prüfung | Offen |
| 7 | Pilotphase | Tests mit ausgewählten Nutzern und Fahrzeugen | Offen |
| 8 | Veröffentlichung | Kontrollierter Beta- oder Store-Release | Offen |

**Governance**

Vorgesehene Rollen:

- Product Owner für Ziele, Prioritäten und Funktionsumfang
- Technical Lead für Architektur und technische Entscheidungen
- Automotive Advisor für fachliche Prüfung
- Security/Privacy Owner für Datenschutz und Sicherheit
- QA-Verantwortlicher für Tests und Freigaben

Regeln:

- Architekturentscheidungen werden als Architecture Decision Records dokumentiert.
- Änderungen an Sicherheitslogik benötigen eine zusätzliche Prüfung.
- KI-Ausgaben dürfen keine unkontrollierten Fahrzeugaktionen auslösen.
- Neue Adapter- oder Fahrzeugunterstützung wird erst nach Tests freigegeben.
- Risiken und Fehler werden über GitHub Issues nachvollziehbar verwaltet.
- Änderungen gelangen nur über geprüfte Pull Requests in `main`.

**Compliance und Datenschutz**

Zu prüfen und zu dokumentieren:

- DSGVO, insbesondere Zweckbindung und Datenminimierung
- Einwilligung, Auskunft, Export und Löschung personenbezogener Daten
- Schutz von Fahrzeugidentifikationsnummern, Diagnosehistorien und Standortdaten
- Verschlüsselung bei Übertragung und Speicherung
- Aufbewahrungs- und Löschkonzept
- Datenschutzerklärung und Nutzungsbedingungen
- Dokumentation eingesetzter KI-Systeme und Anbieter
- Anwendbarkeit des EU AI Acts
- Produkthaftungs- und Verbraucherschutzrecht
- Lizenzen der eingesetzten Bibliotheken und Fehlercode-Datenbanken

**Sicherheitsgrundsätze**

- Nur lesender Fahrzeugzugriff im MVP
- Kein Löschen von Fehlercodes
- Keine Steuergeräte-Codierung
- Keine Befehle an sicherheitskritische Fahrzeugsysteme
- Klare Warnungen bei möglichen Gefahren
- Nachvollziehbare Herkunft technischer Informationen
- KI-Ergebnisse als Unterstützung, nicht als sichere Diagnose
- Erfassung nur der unbedingt erforderlichen Daten

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| MVP fokussiert private Fahrzeughalter | Klarer, begrenzter Startmarkt | Product Owner |
| MVP arbeitet ausschließlich lesend | Reduziert Sicherheits- und Haftungsrisiken | Technical Lead |
| Standardisierte OBD-II-Codes zuerst | Bessere Kompatibilität und geringere Komplexität | Technical Lead |
| KI ergänzt strukturierte Diagnosedaten | Reduziert Halluzinationsrisiken | Product Owner / Technical Lead |

**Offene Punkte**

- [ ] Zielplattform und Technologie-Stack verbindlich auswählen
- [ ] Unterstützte OBD-II-Adapter festlegen
- [ ] Testfahrzeuge oder OBD-Simulator bestimmen
- [ ] Datenmodell und Datenquellen für Fehlercodes prüfen
- [ ] Rollen und verantwortliche Personen benennen
- [ ] Juristische Erstprüfung einplanen
- [ ] Messmethoden für die Erfolgskriterien definieren

**Nächste Schritte**

- [ ] Anforderungen als priorisierten MVP-Backlog formulieren
- [ ] Technischen Stack und Systemarchitektur auswählen
- [ ] Entwicklungsumgebung und CI einrichten
- [ ] OBD-II-Verbindung mit Simulator oder Testadapter prototypisch validieren
- [ ] Datenschutz- und Risikoregister als eigene Dokumente anlegen
