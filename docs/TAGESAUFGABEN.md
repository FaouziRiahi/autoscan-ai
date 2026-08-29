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

## 2026-08-11 – Personas und User Stories erstellen

**Prompt**

> 2–3 Personas erstellen  
> 5–10 User Stories erstellen

**Tagesziel**

Die wichtigsten Nutzergruppen von AutoScan AI konkret beschreiben und ihre zentralen Bedürfnisse in priorisierbare, testbare User Stories für den MVP überführen.

**Aufgaben**

- [x] Drei relevante Personas für AutoScan AI definieren
- [x] Bedürfnisse, Ziele, Probleme und Nutzungssituationen dokumentieren
- [x] Acht User Stories für den MVP formulieren
- [x] Priorität und Akzeptanzkriterien ergänzen
- [ ] Personas durch spätere Nutzerinterviews validieren

### Persona 1 – Sarah, die sicherheitsbewusste Fahrzeughalterin

| Merkmal | Beschreibung |
|---|---|
| Alter | 34 Jahre |
| Beruf | Bürokauffrau |
| Fahrzeugwissen | Gering |
| Fahrzeug | Kompaktwagen, Baujahr 2018 |
| Digitale Erfahrung | Nutzt regelmäßig Smartphone-Apps |
| Hauptziel | Schnell verstehen, ob eine Warnleuchte dringend ist |
| Motivation | Sicher fahren und unnötige Werkstattkosten vermeiden |
| Frustrationen | Unverständliche Fehlercodes, widersprüchliche Internetforen und Angst vor hohen Reparaturkosten |
| Nutzungssituation | Eine Warnleuchte erscheint vor einer längeren Fahrt |
| Erwartung | Klare Erklärung, verständliche Risikostufe und konkrete nächste Schritte |

**Zitat**

> Ich möchte wissen, ob ich noch sicher weiterfahren kann oder sofort eine Werkstatt brauche.

### Persona 2 – Jonas, der technisch interessierte Hobbymechaniker

| Merkmal | Beschreibung |
|---|---|
| Alter | 27 Jahre |
| Beruf | Softwareentwickler |
| Fahrzeugwissen | Mittel |
| Fahrzeug | Älterer Gebrauchtwagen, Baujahr 2012 |
| Digitale Erfahrung | Hoch |
| Hauptziel | Fahrzeugprobleme selbst eingrenzen und Diagnosedaten nachvollziehen |
| Motivation | Kleinere Probleme selbst verstehen und Reparaturen besser vorbereiten |
| Frustrationen | Oberflächliche Diagnose-Apps, fehlender Kontext und nicht nachvollziehbare KI-Aussagen |
| Nutzungssituation | Unruhiger Motorlauf oder wiederkehrende Motorkontrollleuchte |
| Erwartung | Fehlercode, technische Details, mögliche Ursachen und transparente Quellen |

**Zitat**

> Ich brauche mehr als nur eine Codebeschreibung – ich will nachvollziehen, warum diese Ursachen wahrscheinlich sind.

### Persona 3 – Mehmet, der Gebrauchtwagenkäufer

| Merkmal | Beschreibung |
|---|---|
| Alter | 42 Jahre |
| Beruf | Selbstständiger |
| Fahrzeugwissen | Grundkenntnisse |
| Fahrzeug | Möchte einen gebrauchten Familienwagen kaufen |
| Digitale Erfahrung | Mittel |
| Hauptziel | Vor dem Kauf mögliche technische Probleme erkennen |
| Motivation | Versteckte Mängel und unerwartete Folgekosten vermeiden |
| Frustrationen | Unsicherheit bei Probefahrten und fehlende neutrale Informationen |
| Nutzungssituation | Fahrzeugprüfung während einer Besichtigung |
| Erwartung | Schneller Scan, verständliche Zusammenfassung und exportierbarer Bericht |

**Zitat**

> Vor dem Kauf möchte ich eine verständliche Übersicht möglicher Probleme mitnehmen können.

### User Stories

#### US-01 – OBD-II-Adapter verbinden

**Als** Fahrzeughalter  
**möchte ich** einen unterstützten OBD-II-Adapter einfach mit der App verbinden,  
**damit** ich eine Fahrzeugdiagnose ohne technische Vorkenntnisse starten kann.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Die App zeigt gefundene unterstützte Adapter an.
- Der Nutzer kann einen Adapter auswählen und verbinden.
- Verbindungsstatus und Fehler werden verständlich angezeigt.
- Ohne erfolgreiche Verbindung kann keine Diagnose gestartet werden.

#### US-02 – Diagnose starten

**Als** Fahrzeughalter  
**möchte ich** einen geführten Fahrzeugscan starten,  
**damit** vorhandene standardisierte Fehlercodes ausgelesen werden.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Der Scan kann mit einer klar erkennbaren Aktion gestartet werden.
- Fortschritt und Abschluss werden sichtbar angezeigt.
- Der MVP verwendet ausschließlich lesende OBD-II-Befehle.
- Ein Abbruch beschädigt weder App noch Fahrzeugverbindung.

#### US-03 – Fehlercode verständlich erklären

**Als** Nutzer ohne Kfz-Fachwissen  
**möchte ich** jeden gefundenen Fehlercode in verständlicher Sprache erklärt bekommen,  
**damit** ich seine Bedeutung nachvollziehen kann.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Technischer Code und verständliche Bezeichnung werden angezeigt.
- Die Erklärung vermeidet unnötigen Fachjargon.
- Technische Begriffe werden bei Bedarf erläutert.
- Die App weist darauf hin, dass das Ergebnis keine Werkstattdiagnose ersetzt.

#### US-04 – Dringlichkeit erkennen

**Als** sicherheitsbewusste Fahrzeughalterin  
**möchte ich** die Dringlichkeit eines Problems erkennen,  
**damit** ich entscheiden kann, ob eine Weiterfahrt vertretbar ist oder fachliche Hilfe benötigt wird.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Jedes Ergebnis erhält eine verständliche Risikostufe.
- Sicherheitskritische Hinweise werden deutlich hervorgehoben.
- Bei unzureichender Datenlage gibt die App keine definitive Freigabe zur Weiterfahrt.
- Im Zweifel empfiehlt die App eine professionelle Prüfung.

#### US-05 – Mögliche Ursachen nachvollziehen

**Als** technisch interessierter Nutzer  
**möchte ich** mögliche Ursachen eines Fehlercodes sehen,  
**damit** ich das Problem besser eingrenzen und ein Werkstattgespräch vorbereiten kann.

**Priorität:** Should-have

**Akzeptanzkriterien**

- Mehrere mögliche Ursachen werden als Hypothesen dargestellt.
- Ursachen sind nach Plausibilität oder typischer Häufigkeit geordnet, sofern belastbare Daten vorliegen.
- Vermutungen werden nicht als gesicherte Diagnose dargestellt.
- Die Grundlage der technischen Information ist nachvollziehbar.

#### US-06 – Nächste Schritte erhalten

**Als** Fahrzeughalter  
**möchte ich** konkrete und sichere nächste Schritte vorgeschlagen bekommen,  
**damit** ich angemessen auf das Diagnoseergebnis reagieren kann.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Empfehlungen unterscheiden zwischen Beobachten, zeitnah prüfen und sofort anhalten beziehungsweise Hilfe rufen.
- Die App empfiehlt keine riskanten Reparaturen.
- Empfehlungen berücksichtigen die angezeigte Risikostufe.
- Grenzen und Unsicherheiten werden transparent genannt.

#### US-07 – Diagnosebericht speichern und exportieren

**Als** Gebrauchtwagenkäufer oder Fahrzeughalter  
**möchte ich** einen Diagnosebericht speichern und exportieren,  
**damit** ich ihn später vergleichen oder mit einer Werkstatt teilen kann.

**Priorität:** Should-have

**Akzeptanzkriterien**

- Der Bericht enthält Datum, Fahrzeugbezug, erkannte Codes und Erklärungen.
- Der Nutzer kann den Bericht vor dem Export prüfen.
- Personenbezogene oder identifizierende Daten werden nur nach transparenter Auswahl aufgenommen.
- Der Bericht kennzeichnet Zeitpunkt und Grenzen der Diagnose.

#### US-08 – Datenschutz kontrollieren

**Als** datenschutzbewusster Nutzer  
**möchte ich** erkennen und kontrollieren, welche Fahrzeug- und Nutzerdaten gespeichert werden,  
**damit** ich AutoScan AI vertrauensvoll verwenden kann.

**Priorität:** Must-have

**Akzeptanzkriterien**

- Die App informiert vor der Speicherung über Art und Zweck der Daten.
- Nicht erforderliche Daten werden standardmäßig nicht erhoben.
- Der Nutzer kann gespeicherte Daten einsehen und löschen.
- Übertragene Daten werden angemessen verschlüsselt.

**Ergebnisse**

- Drei primäre Nutzergruppen als prüfbare Personas beschrieben
- Acht MVP-nahe User Stories mit Priorität und Akzeptanzkriterien erstellt
- Anforderungen zu Sicherheit, Transparenz und Datenschutz direkt in die Stories integriert

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Drei Personas statt zwei | Deckt Alltag, technische Nutzung und Gebrauchtwagenprüfung ab | Product Owner |
| Private Fahrzeughalter bleiben MVP-Fokus | Entspricht der bisherigen Projektdefinition | Product Owner |
| MoSCoW-Priorisierung verwenden | Einfache Trennung zwischen Must-have und Should-have | Product Owner |
| Akzeptanzkriterien je User Story dokumentieren | Stories werden testbar und backlogfähig | Product Owner / QA |
| Sicherheits- und Datenschutzanforderungen früh integrieren | Verhindert spätes Nachrüsten kritischer Anforderungen | Product Owner / Security Owner |

**Chancen und Risiken**

| Typ | Beschreibung | Maßnahme |
|---|---|---|
| Chance | Personas verbessern Produkt- und UX-Entscheidungen | Personas bei Design und Backlog-Priorisierung referenzieren |
| Chance | Akzeptanzkriterien beschleunigen Entwicklung und Tests | Kriterien in Issues und Testfälle übernehmen |
| Risiko | Personas beruhen zunächst auf Annahmen | Interviews und Tests mit echten Nutzern durchführen |
| Risiko | Gebrauchtwagenprüfung könnte falsche Sicherheit vermitteln | Bericht klar als Momentaufnahme und nicht als Kaufgutachten kennzeichnen |
| Risiko | Dringlichkeitsbewertung kann haftungsrelevant sein | Fachliche und juristische Prüfung sowie konservative Sicherheitslogik |

**Governance und Compliance**

- Personas enthalten keine Daten realer identifizierbarer Personen.
- Nutzungsdaten dürfen nur zweckgebunden und datensparsam verarbeitet werden.
- Sicherheitsrelevante User Stories benötigen fachliche und QA-Freigabe.
- Aussagen zur Weiterfahrt müssen konservativ formuliert und juristisch geprüft werden.
- Die Herkunft technischer Diagnoseinformationen muss nachvollziehbar bleiben.

**Offene Punkte**

- [ ] Personas mit mindestens fünf potenziellen Nutzern validieren
- [ ] Unterstützte Fahrzeugtypen und OBD-II-Adapter konkretisieren
- [ ] Risikostufen und Eskalationsregeln fachlich definieren
- [ ] User Stories als GitHub Issues in einen priorisierten Backlog übertragen
- [ ] Nichtfunktionale Anforderungen für Sicherheit, Leistung und Verfügbarkeit ergänzen

**Nächste Schritte**

- [ ] User Journey für Sarahs Warnleuchten-Szenario erstellen
- [ ] MVP-Backlog aus den User Stories ableiten
- [ ] Wireframes für Verbindung, Scan und Diagnoseergebnis entwerfen
- [ ] Definition of Done für sicherheitsrelevante Stories festlegen

---

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
