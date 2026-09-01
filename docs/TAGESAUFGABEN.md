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

## 2026-08-12 – Nutzungsszenarien, Customer Journey Maps und erster Compliance Review

**Prompt**

> Erstellt für jede Persona ein Szenario, wie diese eure Anwendung nutzt, und befüllt dafür die Customer Journey Map.  
> Führt einen ersten Compliance Review durch.

**Tagesziel**

Für jede Persona einen realistischen End-to-End-Nutzungsfall beschreiben, Chancen und Reibungspunkte entlang der Customer Journey sichtbar machen und die wichtigsten regulatorischen sowie organisatorischen Anforderungen für das MVP frühzeitig identifizieren.

> **Hinweis:** Dieser erste Compliance Review ist eine Produkt- und Risikoanalyse auf Basis des derzeit bekannten MVP-Konzepts. Er ersetzt keine individuelle Rechtsberatung oder technische Konformitätsbewertung.

### Szenario 1 – Sarah: Warnleuchte vor einer längeren Fahrt

Sarah möchte am nächsten Morgen zu ihrer Familie fahren. Am Abend leuchtet die Motorkontrollleuchte auf. Sie hat nur geringe Fahrzeugkenntnisse und ist unsicher, ob sie weiterfahren darf. Sarah verbindet einen unterstützten OBD-II-Adapter, startet den geführten Scan und erhält eine verständliche Erklärung mit einer konservativen Risikostufe. Die App macht transparent, dass sie keine sichere Fahrtfreigabe erteilen kann, und empfiehlt abhängig vom Ergebnis eine zeitnahe Werkstattprüfung. Sarah speichert den Bericht und teilt ihn mit einer Werkstatt.

#### Customer Journey Map – Sarah

| Phase | Handlung | Ziel/Frage | Gefühl | Kontaktpunkt | Problem | Produktchance |
|---|---|---|---|---|---|---|
| Auslöser | Sie bemerkt die Warnleuchte | „Kann ich morgen sicher fahren?“ | Besorgt | Fahrzeug, Warnleuchte | Keine verständliche Information | Ruhige Einführung und klare Sicherheitsbotschaft |
| Einstieg | Sie öffnet AutoScan AI | Schnell Hilfe erhalten | Unsicher, hoffnungsvoll | Startseite | Fachbegriffe könnten überfordern | Geführter Diagnosemodus ohne Jargon |
| Verbindung | Sie verbindet den OBD-II-Adapter | Eine stabile Verbindung herstellen | Angespannt | Bluetooth-/WLAN-Dialog | Adapter wird eventuell nicht erkannt | Kompatibilitätsprüfung und konkrete Fehlerhilfe |
| Scan | Sie startet die Diagnose | Ursache der Warnung eingrenzen | Konzentriert | Scan-Ansicht | Unklarheit über Dauer und Fahrzeugzugriff | Fortschrittsanzeige und Hinweis „nur lesender Zugriff“ |
| Verständnis | Sie liest Code, Erklärung und Risikostufe | Dringlichkeit verstehen | Erleichtert oder alarmiert | Ergebnisansicht | Gefahr falscher Sicherheit | Konservative Einstufung, Unsicherheit und Grenzen anzeigen |
| Handlung | Sie folgt den nächsten Schritten | Angemessen reagieren | Handlungsfähig | Handlungsempfehlung | Empfehlung könnte missverstanden werden | Klare Stufen: beobachten, prüfen, anhalten/Hilfe |
| Abschluss | Sie speichert und teilt den Bericht | Werkstattgespräch vorbereiten | Beruhigt | Bericht/Export | Datenschutz beim Teilen | Vorschau, Datenauswahl und sicherer Export |

**Erfolgsmoment:** Sarah versteht die Dringlichkeit und weiß, was sie als Nächstes sicher tun soll.

**Zentrale Messgrößen:** erfolgreiche Verbindung, Scan-Abschluss, Verständnis der Risikostufe, Berichtsexport.

### Szenario 2 – Jonas: Wiederkehrender unruhiger Motorlauf

Jonas bemerkt seit mehreren Tagen einen unruhigen Motorlauf. Er besitzt technisches Grundwissen und möchte nicht nur einen Fehlercode, sondern mögliche Ursachen und deren Herleitung verstehen. Nach dem Scan prüft er Fehlercode, relevante Sensordaten, plausible Ursachen und technische Quellen. Er vergleicht den neuen Bericht mit einem früheren Scan und nutzt die Informationen zur Vorbereitung einer Reparatur oder eines Werkstatttermins.

#### Customer Journey Map – Jonas

| Phase | Handlung | Ziel/Frage | Gefühl | Kontaktpunkt | Problem | Produktchance |
|---|---|---|---|---|---|---|
| Auslöser | Er bemerkt wiederkehrenden unruhigen Motorlauf | Problem systematisch eingrenzen | Neugierig, skeptisch | Fahrzeug | Symptom ist nicht eindeutig | Symptom und Diagnosezeitpunkt dokumentieren |
| Einstieg | Er öffnet den Expertenmodus | Technische Details sehen | Motiviert | Dashboard | Zu einfache App wirkt unglaubwürdig | Wechsel zwischen einfacher und detaillierter Ansicht |
| Verbindung | Er verbindet seinen Adapter | Schnell Diagnosedaten abrufen | Routiniert | Adapterverwaltung | Unterschiedliche Adapterqualität | Unterstützungsstatus und Adapterdetails anzeigen |
| Scan | Er liest Codes und ausgewählte Live-Daten | Technische Indizien sammeln | Analytisch | Scan-/Live-Datenansicht | Fehlende Datenqualität oder Einheiten | Datenqualität, Einheit und Zeitpunkt anzeigen |
| Analyse | Er prüft Ursachen und Quellen | KI-Aussagen nachvollziehen | Kritisch | Diagnose-Engine | KI könnte Vermutungen als Fakten darstellen | Hypothesen kennzeichnen und Quellen verknüpfen |
| Vergleich | Er vergleicht frühere Berichte | Veränderung erkennen | Konzentriert | Diagnosehistorie | Personen- und Fahrzeugbezug der Historie | Lokale Speicherung, Filter und transparente Einwilligung |
| Handlung | Er bereitet Reparatur oder Werkstattgespräch vor | Zeit und Kosten sparen | Informiert | Bericht/Export | Selbstreparatur kann riskant sein | Sichere Grenzen und keine riskanten Anleitungen |

**Erfolgsmoment:** Jonas kann technische Aussagen nachvollziehen und eine begründete nächste Maßnahme auswählen.

**Zentrale Messgrößen:** Nutzung technischer Details, Quellenaufrufe, Berichtsvergleich, Anteil nachvollziehbarer Empfehlungen.

### Szenario 3 – Mehmet: Gebrauchtwagenprüfung bei einer Besichtigung

Mehmet besichtigt einen gebrauchten Familienwagen. Mit Zustimmung des Fahrzeughalters verbindet er seinen Adapter und startet einen schnellen, ausschließlich lesenden Scan. Die App zeigt vorhandene Standardfehlercodes, den Zeitpunkt der Prüfung, Datenlücken und die Grenzen der Aussagekraft. Mehmet exportiert eine datensparsame Zusammenfassung und nutzt sie als Gesprächsgrundlage. Die App bezeichnet den Bericht ausdrücklich als Momentaufnahme und nicht als Kaufgutachten.

#### Customer Journey Map – Mehmet

| Phase | Handlung | Ziel/Frage | Gefühl | Kontaktpunkt | Problem | Produktchance |
|---|---|---|---|---|---|---|
| Vorbereitung | Er plant eine Fahrzeugbesichtigung | Überraschungen vermeiden | Vorsichtig | Checkliste/App | Unsicherheit über Adapter und Fahrzeugkompatibilität | Vorab-Kompatibilitätscheck |
| Zustimmung | Er bittet den Halter um Erlaubnis | Rechtmäßig und transparent prüfen | Respektvoll | Einwilligungs-/Hinweisdialog | Unklare Berechtigung zum Fahrzeugzugriff | Bestätigung der Berechtigung dokumentieren |
| Verbindung | Er schließt den Adapter an | Scan ohne Fahrzeugänderung | Angespannt | OBD-II-Anschluss | Sorge vor Manipulation | Deutlicher Hinweis „nur lesender Zugriff“ |
| Scan | Er führt einen Schnellscan aus | Hinweise auf Probleme finden | Konzentriert | Scan-Ansicht | Fehlercodes können gelöscht oder unvollständig sein | Zeitpunkt, Datenumfang und Lücken transparent machen |
| Bewertung | Er liest Zusammenfassung und Risikostufen | Kaufentscheidung vorbereiten | Kritisch | Ergebnisansicht | Momentaufnahme könnte überschätzt werden | Kein „bestanden“; Grenzen und Werkstattprüfung empfehlen |
| Gespräch | Er bespricht Ergebnisse mit Verkäufer | Offene Fragen klären | Informiert | Berichtsvorschau | Bericht kann fremde Daten enthalten | Datenminimierung und selektiver Export |
| Entscheidung | Er entscheidet über Prüfung oder Kauf | Finanzielle Risiken reduzieren | Sicherer | Export/Checkliste | App ersetzt kein Gutachten | Unabhängige fachliche Prüfung als nächsten Schritt anbieten |

**Erfolgsmoment:** Mehmet erhält eine verständliche, neutrale Momentaufnahme, ohne dass die App eine Kaufgarantie suggeriert.

**Zentrale Messgrößen:** Kompatibilitätsprüfung, abgeschlossene Schnellscans, Verständnis des Haftungshinweises, selektive Exporte.

### Übergreifende Erkenntnisse aus den Customer Journeys

| Erkenntnis | Produktanforderung | Priorität |
|---|---|---|
| Nutzer müssen dem Fahrzeugzugriff vertrauen | Rein lesenden Zugriff sichtbar und technisch erzwingen | Sehr hoch |
| Verbindung ist der erste kritische Abbruchpunkt | Adapterprüfung, Statusanzeige und konkrete Fehlerhilfe | Sehr hoch |
| Risikostufen können falsche Sicherheit erzeugen | Konservative Regeln, Begründung und Unsicherheit anzeigen | Sehr hoch |
| Zielgruppen benötigen unterschiedliche Informationstiefe | Einfache Standardansicht und optionale technische Details | Hoch |
| Berichte enthalten potenziell sensible Daten | Vorschau, Datenauswahl, Löschung und sicherer Export | Sehr hoch |
| Gebrauchtwagenscan ist nur eine Momentaufnahme | Kein „bestanden“-Urteil und kein Kaufgutachten versprechen | Sehr hoch |
| KI-Aussagen müssen nachvollziehbar sein | Strukturierte Quellen, Hypothesenkennzeichnung und Logging | Sehr hoch |

## Erster Compliance Review

### Annahmen und Abgrenzung

Dieser Review geht von folgendem MVP aus:

- mobile App für EU-Nutzer,
- Verbindung zu einem fremdbezogenen OBD-II-Adapter,
- ausschließlich lesender Zugriff,
- Verarbeitung standardisierter Fahrzeugdiagnosedaten,
- KI-gestützte verständliche Erklärung und Handlungsempfehlung,
- optionale Nutzerkonten, Cloud-Verarbeitung und Berichtsexport,
- keine Fahrzeugsteuerung, Codierung oder automatische Reparaturentscheidung,
- kein medizinischer, behördlicher oder versicherungsrechtlicher Einsatzzweck.

Ändert sich dieser Umfang, muss die Einstufung erneut geprüft werden.

### Compliance-Matrix

| Bereich | Erste Einschätzung | Wesentliches Risiko | Erforderliche Maßnahme | Priorität |
|---|---|---|---|---|
| DSGVO | Sehr wahrscheinlich anwendbar, sobald Fahrzeugdaten einer Person zugeordnet werden können | Unzulässige oder übermäßige Verarbeitung | Dateninventar, Zwecke, Rechtsgrundlagen, Löschfristen und Betroffenenrechte dokumentieren | Kritisch |
| Privacy by Design | Von Beginn an erforderlich | Spätes Nachrüsten von Datenschutz | Lokale Verarbeitung bevorzugen, Datenminimierung und datenschutzfreundliche Voreinstellungen | Kritisch |
| Informationssicherheit | Angemessene technische und organisatorische Maßnahmen erforderlich | Datenabfluss, Kontoübernahme, manipulierte Diagnosen | Verschlüsselung, Zugriffskontrolle, Protokollierung, sichere Updates und Incident-Prozess | Kritisch |
| Auftragsverarbeitung | Relevant bei Cloud-, Analyse- oder KI-Anbietern | Unklare Verantwortlichkeiten und Drittlandtransfer | AV-Verträge, Unterauftragnehmer, Speicherorte und Transfermechanismen prüfen | Hoch |
| Datenschutz-Folgenabschätzung | Nicht automatisch zwingend; anhand realer Verarbeitung prüfen | Systematische Fahrzeug-/Verhaltensprofile oder hohes Risiko | DPIA-Screening vor Pilotphase, Entscheidung dokumentieren | Hoch |
| EU AI Act | KI-System ist anwendbar; MVP voraussichtlich nicht automatisch hochriskant | Falsche Einstufung, fehlende Transparenz und Kompetenz | AI-Inventar, Zweck, Rolle, Anbieterunterlagen, menschliche Aufsicht und AI-Literacy dokumentieren | Kritisch |
| AI-Transparenz | Je nach Interaktionsform und Ausgabe relevant | Nutzer halten KI-Erklärung für eine gesicherte Diagnose | KI-Einsatz, Grenzen, Quellen und Unsicherheit klar anzeigen | Kritisch |
| Hochrisiko-Prüfung | Bei rein beratendem, lesendem MVP derzeit eher nicht; erneute Prüfung nötig | Spätere Sicherheitsfunktion oder regulierte Produktintegration | Classification Memo vor jeder Erweiterung um Steuerung oder sicherheitsbezogene Automatisierung | Hoch |
| EU Data Act | Potenziell relevant für Zugang und Nutzung von Daten vernetzter Produkte | Unklare Nutzungs- und Weitergaberechte | Rollen, Fahrzeugberechtigung, Datenzugang, Verträge und Exportrechte prüfen | Hoch |
| Cyber Resilience Act | Für vermarktete Software bzw. Produkte mit digitalen Elementen potenziell relevant | Unsicheres Produkt und fehlendes Schwachstellenmanagement | Secure Development Lifecycle, SBOM, Vulnerability Handling und Update-Support planen | Kritisch |
| Produkthaftung | Software und KI können Haftungsrisiken auslösen | Personen- oder Sachschäden durch fehlerhafte Empfehlungen | Sicherheitsanforderungen, Testnachweise, Warnhinweise, Logs und Freigaben dokumentieren | Kritisch |
| Allgemeine Produktsicherheit | Bei Verbraucherprodukt/-software zu prüfen | Unsichere Nutzung oder irreführende Sicherheitswirkung | Risikoanalyse, verständliche Anweisungen, Warnungen und Rückruf-/Incident-Prozess | Hoch |
| Fahrzeug-/OBD-Regeln | Technischer und vertraglicher Rahmen ist zu prüfen | Nicht autorisierter Zugriff, Kompatibilitäts- oder Herstellerbeschränkungen | Nur Standardschnittstellen, Nutzerberechtigung und Adapter-/Fahrzeugmatrix dokumentieren | Hoch |
| Verbraucherrecht | Für kostenpflichtige App, Abo und digitale Inhalte relevant | Irreführende Leistungsversprechen oder unwirksame Bedingungen | Preis-, Funktions-, Kündigungs- und Gewährleistungsinformationen transparent gestalten | Hoch |
| Barrierefreiheit | Je nach Angebot und Anwendungsbereich rechtlich bzw. qualitativ relevant | Ausschluss von Nutzern in Stresssituationen | WCAG-orientiertes Design, Text statt Farbe allein, Screenreader- und Kontrasttests | Mittel |
| Open-Source- und Datenlizenzen | Für Bibliotheken, OBD-Codequellen und Modelle relevant | Lizenzverletzung oder unzulässige Datennutzung | Lizenzregister, Notices und Herkunftsnachweise führen | Hoch |

### DSGVO-Mindestmaßnahmen für das MVP

- [ ] Datenflussdiagramm und Verzeichnis der Verarbeitungstätigkeiten erstellen
- [ ] Personenbezug für VIN, Diagnosehistorie, Konto, Gerätekennung und Standort bewerten
- [ ] Zweck und Rechtsgrundlage je Datenkategorie festlegen
- [ ] Einwilligung nur dort einsetzen, wo sie freiwillig, informiert und widerrufbar ist
- [ ] Nicht notwendige Telemetrie und Standortdaten standardmäßig deaktivieren
- [ ] Lösch- und Aufbewahrungsfristen technisch umsetzen
- [ ] Auskunft, Export, Berichtigung und Löschung ermöglichen
- [ ] Auftragsverarbeiter und internationale Datentransfers prüfen
- [ ] Datenschutzverletzungs- und Incident-Prozess definieren
- [ ] DPIA-Screening dokumentieren

### AI-Governance-Mindestmaßnahmen

- [ ] Zweck, Systemgrenzen und verbotene Anwendungsfälle dokumentieren
- [ ] Verantwortliche Rolle als Anbieter oder Betreiber bestimmen
- [ ] Eingesetzte Modelle, Versionen, Anbieter und Änderungen inventarisieren
- [ ] Strukturierte technische Daten als Primärquelle verwenden
- [ ] KI-Hypothesen von bestätigten Fakten unterscheiden
- [ ] Risikostufe durch konservative Regeln absichern
- [ ] Menschliche Prüfung für sicherheitsrelevante Änderungen vorsehen
- [ ] Testfälle für Halluzinationen, gefährliche Empfehlungen und Datenlücken pflegen
- [ ] Nutzer transparent über KI-Einsatz und Grenzen informieren
- [ ] AI-Literacy für verantwortliche Teammitglieder sicherstellen

### Security- und Produktsicherheitsmaßnahmen

- [ ] Schreibende OBD-II-Befehle technisch blockieren und automatisiert testen
- [ ] Unterstützte Adapter und Fahrzeuge in einer geprüften Matrix führen
- [ ] Threat Model für App, Bluetooth/WLAN, Backend, Berichte und Updates erstellen
- [ ] Sichere Software-Lieferkette, Abhängigkeitsprüfung und SBOM vorbereiten
- [ ] Schwachstellenmeldeprozess und Security-Kontakt veröffentlichen
- [ ] Signierte Updates und definierte Supportdauer planen
- [ ] Manipulationssichere Audit-Logs für Diagnose- und Regelversionen vorsehen
- [ ] Sicherheitsvorfälle, Korrekturmaßnahmen und Nutzerinformation prozessual planen

### Vorläufige Freigabeentscheidung

**Status: Bedingt freigabefähig für einen internen, rein lesenden Prototyp.**

Bedingungen:

1. Keine Schreibbefehle oder Steuerung des Fahrzeugs.
2. Keine Aussage „sicher weiterfahren“ oder „Fahrzeug ist in Ordnung“.
3. Keine echte VIN, Diagnosehistorie oder personenbezogene Cloud-Daten ohne dokumentierte Datenschutzgrundlage.
4. KI-Erklärungen werden als unterstützende Einschätzung gekennzeichnet.
5. Kritische Empfehlungen beruhen auf geprüften Regeln und werden getestet.
6. Vor externem Pilotbetrieb erfolgen DPIA-Screening, Security Review und juristische Prüfung.
7. Vor Vermarktung werden AI-Act-, CRA-, Data-Act-, Verbraucher- und Produkthaftungsrollen verbindlich bestimmt.

### Compliance-Risikoregister

| ID | Risiko | Eintritt | Auswirkung | Bewertung | Owner | Maßnahme |
|---|---|---|---|---|---|---|
| C-01 | KI gibt gefährliche oder zu sichere Empfehlung | Mittel | Sehr hoch | Kritisch | Product/Automotive | Regelbasierte Sicherheitsgrenzen und fachliche Tests |
| C-02 | Personenbezogene Fahrzeugdaten werden ohne klare Grundlage gespeichert | Mittel | Hoch | Hoch | Privacy | Dateninventar, Rechtsgrundlagen und lokale Verarbeitung |
| C-03 | Unsicherer Adapter oder Kommunikationskanal manipuliert Daten | Mittel | Hoch | Hoch | Security | Adapterprüfung, Authentizitäts- und Plausibilitätskontrollen |
| C-04 | Gebrauchtwagenbericht wird als Gutachten verstanden | Hoch | Hoch | Kritisch | Product/Legal | Momentaufnahme, klare Grenzen und kein Bestehensurteil |
| C-05 | Externer KI-Anbieter verarbeitet Daten in unzulässiger Weise | Mittel | Hoch | Hoch | Privacy/Technical | AV-Vertrag, Datenminimierung und Transferprüfung |
| C-06 | CRA-Anforderungen werden zu spät berücksichtigt | Mittel | Hoch | Hoch | Technical/Security | Secure Development Lifecycle und Produktrollen früh definieren |
| C-07 | Technische Datenbank oder Bibliothek verletzt Lizenzen | Mittel | Mittel | Mittel | Technical/Legal | Lizenzregister und Herkunftsnachweise |
| C-08 | Sicherheitsrelevante Entscheidung ist nicht nachvollziehbar | Mittel | Sehr hoch | Kritisch | QA/Automotive | Versionierung, Quellen, Logs und Freigaben |

### Offizielle Quellen für die weitere Prüfung

- [Datenschutz-Grundverordnung – Verordnung (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- [EU AI Act – Verordnung (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [EU-Kommission: Durchsetzung und Transparenzpflichten des AI Acts ab 2. August 2026](https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august)
- [EU Data Act – Verordnung (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng)
- [EU-Kommission: Data Act gilt seit 12. September 2025](https://commission.europa.eu/news-and-media/news/data-act-enters-force-what-it-means-you-2024-01-11_en)
- [Cyber Resilience Act – Verordnung (EU) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng)
- [EU-Kommission: Überblick zum Cyber Resilience Act](https://commission.europa.eu/news-and-media/news/safer-digital-future-new-cyber-rules-become-law-2024-12-10_en)
- [Neue Produkthaftungsrichtlinie – Richtlinie (EU) 2024/2853](https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng)
- [Allgemeine Produktsicherheitsverordnung – Verordnung (EU) 2023/988](https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng)
- [Typgenehmigung und Fahrzeugmarktüberwachung – Verordnung (EU) 2018/858](https://eur-lex.europa.eu/eli/reg/2018/858/oj/eng)

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Customer Journeys bilden sieben Phasen ab | Macht Brüche und Sicherheitsmomente sichtbar | Product/UX |
| Standard- und Expertenansicht vorsehen | Sarah und Jonas benötigen unterschiedliche Informationstiefe | Product/UX |
| Gebrauchtwagenbericht als Momentaufnahme kennzeichnen | Verhindert falsche Sicherheit und Gutachtenwirkung | Product/Legal |
| Compliance-Gates vor Pilot und Vermarktung einführen | Kritische Pflichten hängen vom finalen Produktumfang ab | Governance |
| Rein lesender Zugriff bleibt harte MVP-Grenze | Reduziert Sicherheits-, Haftungs- und Einstufungsrisiken | Technical/Product |

**Offene Punkte**

- [ ] Customer Journeys mit realen Nutzern validieren
- [ ] EU-Zielmärkte und Geschäftsmodell festlegen
- [ ] Datenfluss, Hostingstandort und KI-Anbieter bestimmen
- [ ] Verantwortliche Personen für Privacy, Security, Automotive und Legal benennen
- [ ] AI-Act-Classification Memo erstellen
- [ ] DPIA-Screening durchführen
- [ ] CRA-Produktrolle und Konformitätsweg prüfen
- [ ] Haftungs- und Verbrauchertexte juristisch prüfen
- [ ] Risikostufen mit Kfz-Fachperson definieren und testen

**Nächste Schritte**

- [ ] Customer-Journey-Erkenntnisse in UX-Anforderungen überführen
- [ ] Wireframes für Verbindung, Scan, Ergebnis und Bericht erstellen
- [ ] Compliance-Anforderungen als GitHub Issues anlegen
- [ ] Datenschutz- und Security-by-Design-Checklisten in die Definition of Done aufnehmen
- [ ] Internen OBD-II-Prototyp nur mit Testdaten oder Simulator starten

---

## 2026-08-13 – Interviewleitfaden und simuliertes KI-Interview

**Prompt**

> Erstelle einen Interviewleitfaden.  
> Führe ein Interview mit Hilfe von KI oder einem echten Menschen durch.

**Tagesziel**

Einen wiederverwendbaren, neutral formulierten Interviewleitfaden für potenzielle AutoScan-AI-Nutzer erstellen und ihn in einem simulierten KI-Interview erproben. Das Interview soll Annahmen zu Problemen, Verhalten, Vertrauen, Sicherheitsbedürfnis und Produktanforderungen sichtbar machen.

> **Research-Hinweis:** Das folgende Interview ist eine KI-gestützte Simulation auf Basis der Persona Sarah. Es ist kein Interview mit einer realen Person und liefert keine validierten Nutzererkenntnisse. Es dient ausschließlich dazu, den Leitfaden zu testen, Hypothesen zu schärfen und echte Interviews vorzubereiten.

### Forschungsziele

1. Verstehen, wie Fahrzeughalter heute auf Warnleuchten und unbekannte Fahrzeugprobleme reagieren.
2. Ermitteln, welche Informationen in einer stressigen Situation wirklich benötigt werden.
3. Vertrauen und Vorbehalte gegenüber OBD-II-Adaptern und KI-Erklärungen untersuchen.
4. Herausfinden, wie Dringlichkeit und Unsicherheit verständlich dargestellt werden sollten.
5. Anforderungen an Diagnosebericht, Datenschutz und Weitergabe an Werkstätten erfassen.
6. Prüfen, ob AutoScan AI ein reales Problem löst, bevor einzelne Funktionen bewertet werden.

### Forschungsfragen

- Was tun Nutzer heute, wenn eine Warnleuchte erscheint?
- Welche Unsicherheiten, Kosten und Zeitverluste entstehen dabei?
- Wann vertrauen Nutzer einer digitalen Diagnose?
- Welche Aussagen könnten gefährliche oder falsche Sicherheit erzeugen?
- Welche Daten möchten Nutzer speichern oder teilen?
- Welche Funktionen sind für den ersten MVP unverzichtbar?
- Welche Gründe könnten zur Ablehnung oder zum Abbruch führen?

### Zielgruppe und Rekrutierung

**Primäre Zielgruppe**

- private Fahrzeughalter,
- geringe bis mittlere Kfz-Kenntnisse,
- regelmäßige Smartphone-Nutzung,
- mindestens eine Erfahrung mit Warnleuchte, Panne oder unklarem Fahrzeugproblem.

**Empfohlene Stichprobe für die erste Runde**

- 5–7 Interviews mit privaten Fahrzeughaltern,
- mindestens zwei Personen mit sehr geringen Kfz-Kenntnissen,
- unterschiedliche Altersgruppen und Fahrzeugtypen,
- möglichst unterschiedliche Erfahrungen mit Werkstätten und Diagnose-Apps.

**Ausschluss für diese erste Runde**

- professionelle Kfz-Mechaniker als einzige Stichprobe,
- Personen ohne eigene oder regelmäßige Fahrzeugnutzung,
- Teammitglieder, die das Konzept bereits vollständig kennen.

### Rahmenbedingungen

| Punkt | Vorgabe |
|---|---|
| Dauer | 30–45 Minuten |
| Format | persönlich oder Videoanruf |
| Rollen | eine moderierende, optional eine protokollierende Person |
| Aufzeichnung | nur nach ausdrücklicher Einwilligung |
| Daten | so wenig personenbezogene Daten wie möglich |
| Material | Leitfaden, Notizen, optional neutrale Wireframes |
| Vergütung | vorab transparent kommunizieren |
| Auswertung | Aussagen pseudonymisieren und thematisch codieren |

## Interviewleitfaden

### 1. Begrüßung und Einwilligung – ca. 3 Minuten

**Moderationstext**

> Vielen Dank, dass Sie sich Zeit nehmen. Wir möchten verstehen, wie Menschen mit Fahrzeugproblemen und Warnleuchten umgehen. Wir testen heute nicht Sie, sondern unsere Annahmen. Es gibt keine richtigen oder falschen Antworten. Bitte erzählen Sie möglichst konkrete Erfahrungen.  
>  
> Das Gespräch dauert ungefähr 30 bis 45 Minuten. Ihre Angaben werden nur für die Produktentwicklung verwendet und in der Auswertung nicht mit Ihrem Namen verbunden. Dürfen wir Notizen machen? Dürfen wir das Gespräch für die spätere Auswertung aufzeichnen?

**Prüfpunkte**

- [ ] Zweck erklärt
- [ ] Freiwilligkeit erklärt
- [ ] Zustimmung zu Notizen eingeholt
- [ ] Separate Zustimmung zur Aufzeichnung eingeholt
- [ ] Möglichkeit zum Abbruch erklärt
- [ ] Keine unnötigen personenbezogenen Daten erhoben

### 2. Aufwärmen und Kontext – ca. 5 Minuten

1. Erzählen Sie bitte kurz, wie Sie Ihr Fahrzeug im Alltag nutzen.
2. Wie würden Sie Ihre eigenen Fahrzeugkenntnisse beschreiben?
3. Welche Aufgaben am Fahrzeug erledigen Sie selbst?
4. Wann war Ihr letzter Werkstattbesuch und was war der Anlass?
5. Welche Apps oder digitalen Dienste verwenden Sie rund um Ihr Fahrzeug?

**Mögliche Nachfragen**

- Können Sie mir ein konkretes Beispiel geben?
- Wie häufig kommt das vor?
- Was war daran besonders einfach oder schwierig?

### 3. Letzte reale Problemsituation – ca. 10 Minuten

1. Denken Sie bitte an das letzte Mal, als eine Warnleuchte erschien oder sich das Fahrzeug ungewöhnlich verhielt. Was ist passiert?
2. Was haben Sie als Erstes getan?
3. Welche Informationen hatten Sie in diesem Moment?
4. Wo haben Sie nach Hilfe gesucht?
5. Wie haben Sie entschieden, ob Sie weiterfahren?
6. Was hat Ihnen dabei am meisten Sorgen gemacht?
7. Wie viel Zeit und gegebenenfalls Geld hat die Klärung gekostet?
8. Was hätte Ihnen in dieser Situation am meisten geholfen?

**Nicht fragen**

- „Wäre eine KI-Diagnose nicht hilfreich gewesen?“
- „Finden Sie unsere Idee gut?“
- „Würden Sie diese Funktion benutzen?“

Diese Fragen wären suggestiv und würden eher Zustimmung als tatsächliches Verhalten messen.

### 4. Bestehende Lösungen und Alternativen – ca. 5 Minuten

1. Welche Webseiten, Apps, Personen oder Werkstätten haben Sie genutzt?
2. Was hat dabei gut funktioniert?
3. Was hat nicht funktioniert?
4. Haben Sie bereits einen OBD-II-Adapter oder eine Diagnose-App verwendet?
5. Falls ja: Was war verständlich und was war unklar?
6. Falls nein: Was hat Sie bisher davon abgehalten?

### 5. Vertrauen, Sicherheit und KI – ca. 7 Minuten

1. Woran erkennen Sie, ob eine digitale Diagnose vertrauenswürdig ist?
2. Welche Informationen müssten sichtbar sein, damit Sie eine Erklärung nachvollziehen können?
3. Was dürfte eine App auf keinen Fall behaupten?
4. Wie sollte die App Unsicherheit darstellen?
5. Wann würden Sie trotz einer App eine Werkstatt oder Pannenhilfe kontaktieren?
6. Wie stehen Sie dazu, wenn eine KI technische Fehlercodes in Alltagssprache erklärt?
7. Welche Rolle sollten geprüfte Datenquellen und menschliche Fachleute spielen?

### 6. Konzepttest AutoScan AI – ca. 7 Minuten

Erst jetzt wird das Konzept neutral vorgestellt:

> AutoScan AI ist eine geplante mobile Anwendung. Sie verbindet sich mit einem unterstützten OBD-II-Adapter, liest standardisierte Fehlercodes ausschließlich lesend aus und erklärt deren Bedeutung, mögliche Ursachen, Unsicherheiten und nächste Schritte. Die Anwendung ersetzt keine Werkstattdiagnose und verändert keine Fahrzeugdaten.

Fragen:

1. Was verstehen Sie unter diesem Konzept?
2. Welcher Teil wäre für Sie am nützlichsten?
3. Was wäre unklar oder besorgniserregend?
4. In welcher Situation würden Sie die Anwendung verwenden?
5. Welche Information müsste zuerst auf dem Ergebnisbildschirm stehen?
6. Welche Funktion wäre für eine erste Version unverzichtbar?
7. Was könnte Sie davon abhalten, die Anwendung zu nutzen?
8. Welcher Preis oder welches Geschäftsmodell wäre nachvollziehbar? Warum?

### 7. Bericht und Datenschutz – ca. 4 Minuten

1. Würden Sie Diagnoseberichte speichern? Wofür?
2. Mit wem würden Sie einen Bericht teilen?
3. Welche Daten sollten nicht automatisch im Bericht stehen?
4. Möchten Sie Berichte eher lokal auf dem Gerät oder in einem Konto speichern?
5. Welche Kontrolle über Löschen und Export erwarten Sie?

### 8. Abschluss – ca. 2 Minuten

1. Wenn Sie eine Sache an der Idee ändern könnten, welche wäre das?
2. Was haben wir nicht gefragt, das für Sie wichtig ist?
3. Dürfen wir Sie für einen späteren Prototypentest erneut kontaktieren?

**Moderationstext**

> Vielen Dank. Ihre Antworten helfen uns, das Problem besser zu verstehen. Wir werten die Aussagen gemeinsam mit weiteren Interviews aus und verwenden einzelne Aussagen nur anonymisiert beziehungsweise pseudonymisiert.

## Simuliertes KI-Interview

### Interviewprofil

| Merkmal | Wert |
|---|---|
| Interviewtyp | KI-gestützte Simulation |
| Persona | Sarah, sicherheitsbewusste Fahrzeughalterin |
| Alter | 34 Jahre |
| Fahrzeugwissen | gering |
| Dauer der Simulation | ungefähr 20 Minuten |
| Zweck | Leitfaden testen und Hypothesen vorbereiten |
| Evidenzstatus | synthetisch, nicht validierend |

### Auszug aus dem Interview

**Interviewer:** Erzählen Sie bitte kurz, wie Sie Ihr Fahrzeug im Alltag nutzen.

**Sarah (KI-Simulation):** Ich fahre damit zur Arbeit, erledige Einkäufe und besuche am Wochenende meine Familie. Im Durchschnitt nutze ich das Auto fast täglich. Technisch kenne ich mich kaum aus. Ich weiß, wie man Öl oder Scheibenwaschwasser kontrolliert, aber bei Warnleuchten werde ich schnell unsicher.

**Interviewer:** Denken Sie bitte an das letzte Mal, als eine Warnleuchte erschien. Was ist passiert?

**Sarah:** Vor einer längeren Fahrt ging am Abend die Motorkontrollleuchte an. Das Auto fuhr zunächst normal. Ich wusste nicht, ob ich am nächsten Morgen noch fahren durfte oder ob ich etwas kaputt machen würde.

**Interviewer:** Was haben Sie als Erstes getan?

**Sarah:** Ich habe das Fahrzeughandbuch gesucht und danach im Internet recherchiert. Dort stand alles Mögliche – von „nicht schlimm“ bis „sofort stehen lassen“. Danach war ich eher unsicherer.

**Interviewer:** Wie haben Sie schließlich entschieden?

**Sarah:** Ich habe die Fahrt verschoben und am nächsten Morgen bei einer Werkstatt angerufen. Einen kurzfristigen Termin gab es nicht. Später stellte sich heraus, dass es nicht sofort gefährlich war, aber das konnte ich vorher nicht wissen.

**Interviewer:** Was hat Ihnen in dieser Situation am meisten gefehlt?

**Sarah:** Eine verständliche erste Einschätzung. Nicht unbedingt eine endgültige Diagnose, sondern eine klare Antwort darauf, wie dringend es ist und was ich jetzt tun soll.

**Interviewer:** Haben Sie schon einmal einen OBD-II-Adapter benutzt?

**Sarah:** Nein. Ich kenne solche Geräte nur aus Videos. Ich hätte Sorge, etwas falsch anzuschließen oder Daten im Auto zu verändern.

**Interviewer:** Was müsste die App zeigen, um diese Sorge zu reduzieren?

**Sarah:** Eine einfache Anleitung mit Bildern und sehr deutlich, dass nur Daten gelesen und nichts verändert wird. Außerdem müsste ich erkennen können, ob der Adapter mit meinem Auto funktioniert.

**Interviewer:** Woran würden Sie eine vertrauenswürdige Diagnose erkennen?

**Sarah:** Wenn die App erklärt, woher die Information kommt, nicht so tut, als wäre alles hundertprozentig sicher, und im Zweifel eine Werkstatt empfiehlt. Eine Ampel allein wäre mir zu wenig. Ich möchte eine kurze Begründung.

**Interviewer:** Was dürfte eine App auf keinen Fall behaupten?

**Sarah:** Sie sollte niemals einfach sagen: „Sie können sicher weiterfahren“, wenn sie das nicht wirklich wissen kann. Auch konkrete Reparaturkosten ohne Grundlage fände ich unseriös.

**Interviewer:** Wie stehen Sie dazu, dass KI den Fehlercode erklärt?

**Sarah:** Grundsätzlich positiv, wenn klar ist, dass die KI nur erklärt und keine sichere Diagnose stellt. Ich möchte technische Informationen verständlich haben, aber keine erfundene Sicherheit.

**Interviewer:** AutoScan AI liest Fehlercodes ausschließlich lesend aus, erklärt mögliche Ursachen, Unsicherheit und nächste Schritte. Was wäre daran für Sie am nützlichsten?

**Sarah:** Die Kombination aus verständlicher Erklärung und Dringlichkeit. Danach wäre ein Bericht hilfreich, den ich direkt an die Werkstatt schicken kann.

**Interviewer:** Welche Information müsste auf dem Ergebnisbildschirm zuerst stehen?

**Sarah:** Zuerst die Dringlichkeit und was ich unmittelbar tun soll. Danach die einfache Erklärung. Technische Details könnten weiter unten stehen.

**Interviewer:** Was könnte Sie von der Nutzung abhalten?

**Sarah:** Ein komplizierter Verbindungsprozess, ein unbekannter Adapter, zu viele Fachbegriffe, ein teures Abo oder wenn ich nicht weiß, was mit meinen Fahrzeugdaten passiert.

**Interviewer:** Würden Sie einen Diagnosebericht speichern?

**Sarah:** Ja, aber am liebsten zunächst nur auf meinem Smartphone. Ich würde selbst auswählen wollen, ob Fahrzeugnummer oder andere persönliche Daten enthalten sind.

**Interviewer:** Wenn Sie eine Sache an der Idee ändern könnten, welche wäre das?

**Sarah:** Ich würde einen sehr einfachen Notfall- oder Schnellmodus anbieten: verbinden, scannen und sofort sehen, was ich als Nächstes tun soll.

### Erste Beobachtungen aus der Simulation

| Beobachtung | Mögliche Interpretation | Evidenzstatus |
|---|---|---|
| Internetrecherche erhöht die Unsicherheit | Widersprüchliche Informationen sind ein relevantes Problem | Hypothese |
| Dringlichkeit ist wichtiger als technische Tiefe | Ergebnisansicht sollte Handlung und Risiko priorisieren | Hypothese |
| Nutzer fürchten Veränderungen am Fahrzeug | „Nur lesen“ muss technisch garantiert und sichtbar erklärt werden | Hypothese |
| Ampelfarbe allein reicht nicht | Risikostufe benötigt Text und kurze Begründung | Hypothese |
| Bericht wird für Werkstattkommunikation gewünscht | Export kann einen praktischen Folgeschritt unterstützen | Hypothese |
| Lokale Speicherung wird bevorzugt | Privacy-by-Default kann Vertrauen erhöhen | Hypothese |
| Komplizierte Verbindung ist ein Abbruchrisiko | Onboarding und Kompatibilitätsprüfung sind kritisch | Hypothese |
| Schnellmodus wirkt attraktiv | Geführter Kernablauf sollte kurz und stressfest sein | Hypothese |

### Abgeleitete Produkt-Hypothesen

| ID | Hypothese | Validierung im echten Interview |
|---|---|---|
| H-01 | Nutzer priorisieren Dringlichkeit vor technischer Erklärung | Rangfolge der gewünschten Ergebnisinformationen erfragen |
| H-02 | Sichtbarer Nur-Lese-Zugriff erhöht Vertrauen | Reaktion auf zwei Onboarding-Varianten testen |
| H-03 | Eine Begründung ist wichtiger als eine reine Ampelfarbe | Ergebnisvarianten vergleichen lassen |
| H-04 | Lokale Speicherung wird gegenüber Cloud bevorzugt | Tatsächliche Präferenz und Gründe explorieren |
| H-05 | Berichtsexport ist für Werkstattgespräche wertvoll | Nach bisherigen Kommunikationswegen fragen |
| H-06 | Adapterkompatibilität ist ein entscheidender Einstiegspunkt | Erfahrungen und Abbruchgründe untersuchen |
| H-07 | Ein Schnellmodus hilft in Stresssituationen | Prototypische Journey testen |

### Anpassungen am Interviewleitfaden nach dem Probelauf

- Nach einer konkreten letzten Problemsituation fragen, bevor AutoScan AI vorgestellt wird.
- „Weiterfahren“ nicht binär oder suggestiv formulieren.
- Vertrauen getrennt für Adapter, technische Daten und KI-Erklärung untersuchen.
- Ergebnisinformationen von Interviewten priorisieren lassen.
- Lokale Speicherung und Cloud-Speicherung getrennt besprechen.
- Preisfrage erst nach Problem-, Lösungs- und Vertrauensfragen stellen.
- In echten Interviews Pausen zulassen und nicht jede Antwort sofort interpretieren.

### Research-Risiken und Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|---|---|
| KI bestätigt bestehende Projektannahmen | Simulation nur zur Vorbereitung verwenden |
| Suggestive Fragen erzeugen Zustimmung | Verhalten und konkrete Vergangenheit erfragen |
| Eine Persona wird als gesamte Zielgruppe behandelt | Unterschiedliche reale Teilnehmer rekrutieren |
| Aussagen werden ohne Kontext zusammengefasst | Audio/Notizen mit Einwilligung, Zitate und Kontext dokumentieren |
| Datenschutz bei Aufzeichnungen | Separate Einwilligung, Zugriffsbeschränkung und Löschfrist |
| Team bewertet Einzelmeinungen als Beweis | Muster erst über mehrere Interviews ableiten |

**Ergebnisse**

- Wiederverwendbarer Interviewleitfaden für 30–45 Minuten erstellt
- Forschungsziele, Zielgruppe und Rekrutierungskriterien definiert
- Einwilligungs- und Datenschutzschritte integriert
- Leitfaden durch ein simuliertes Interview mit Persona Sarah erprobt
- Sieben überprüfbare Produkthypothesen abgeleitet
- Grenzen synthetischer Nutzerforschung ausdrücklich dokumentiert

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Problem-Interview vor Konzepttest | Verhindert, dass die Produktidee Antworten zu früh beeinflusst | Product/UX |
| Simulation wird nicht als Validierung gewertet | KI kann reale Erfahrung nicht ersetzen | Research Lead |
| Letztes reales Verhalten steht im Mittelpunkt | Konkretes Verhalten ist belastbarer als hypothetische Zustimmung | Product/UX |
| Aufzeichnung benötigt separate Einwilligung | Datenschutz und freiwillige Teilnahme | Privacy/Research |
| Sarah wird für den ersten Probelauf gewählt | Sie entspricht dem primären MVP-Fokus | Product Owner |

**Offene Punkte**

- [ ] 5–7 reale Interviewteilnehmer rekrutieren
- [ ] Informationsblatt und Einwilligungstext finalisieren
- [ ] Löschfrist und Speicherort für Aufzeichnungen bestimmen
- [ ] Notiz- und Auswertungsvorlage erstellen
- [ ] Interviewleitfaden mit einer realen Person pilotieren
- [ ] Ergebnisse nach mehreren Interviews thematisch clustern
- [ ] Hypothesen H-01 bis H-07 validieren oder verwerfen

**Nächste Schritte**

- [ ] Erstes echtes Interview terminieren
- [ ] Erkenntnisse in einer Research Repository Tabelle erfassen
- [ ] Wireframe für Ergebnispriorisierung erstellen
- [ ] Schnellmodus als einfachen Ablauf skizzieren
- [ ] Nach fünf Interviews eine gemeinsame Synthese durchführen

---

## 2026-08-14 – Interviewauswertung und Einarbeitung des Feedbacks

**Prompt**

> Werte die Interviews von gestern aus.  
> Arbeite das Feedback ein.

**Tagesziel**

Die Ergebnisse des simulierten Interviews vom 13.08.2026 strukturiert auswerten, zentrale Muster und Hypothesen ableiten und das Feedback nachvollziehbar in Produktanforderungen, User Stories, UX-Prioritäten und nächste Research-Schritte überführen.

> **Evidenzhinweis:** Am 13.08.2026 wurde ein KI-simuliertes Interview mit der Persona Sarah durchgeführt. Die folgenden Ergebnisse sind daher vorläufige Hypothesen und keine validierten Aussagen realer Nutzer. Änderungen werden als überprüfbare Produktannahmen behandelt.

### Auswertungsmethode

Die Interviewaussagen wurden in fünf Schritten ausgewertet:

1. Relevante Aussagen und Beobachtungen extrahieren.
2. Aussagen thematisch clustern.
3. Bedürfnisse, Probleme und Risiken ableiten.
4. Produktanforderungen und Änderungen formulieren.
5. Jede Änderung mit einer Validierungsfrage verbinden.

### Evidenzstufen

| Stufe | Bedeutung | Verwendung |
|---|---|---|
| E0 – Annahme | Idee des Projektteams ohne Interviewbezug | Noch nicht prioritätsentscheidend |
| E1 – Synthetischer Hinweis | Beobachtung aus KI-Simulation | Für Prototypen und Interviewvorbereitung |
| E2 – Einzelne reale Aussage | Aussage aus einem echten Interview | Als Hinweis, nicht als Muster |
| E3 – Wiederkehrendes Muster | Ähnliche Aussage aus mehreren Interviews | Für begründete Priorisierung |
| E4 – Verhaltensnachweis | Beobachtung aus Nutzungs- oder Usability-Test | Für validierte Produktentscheidung |

Alle Ergebnisse dieser Tagesaufgabe besitzen derzeit höchstens die Stufe **E1**.

## Thematische Auswertung

### Cluster 1 – Dringlichkeit und Orientierung

**Beobachtungen**

- Sarah möchte zuerst wissen, wie dringend die Situation ist.
- Die technische Codebeschreibung allein löst ihr Problem nicht.
- Eine Aussage zur Weiterfahrt kann gefährliche Sicherheit erzeugen.
- Eine reine Ampelfarbe wird als nicht ausreichend eingeschätzt.

**Abgeleitetes Bedürfnis**

Der Nutzer benötigt eine vorsichtige, verständliche Orientierung mit Begründung und konkreten nächsten Schritten.

**Produktimplikation**

- Risikostufe prominent darstellen.
- Risikostufe immer textlich begründen.
- Keine definitive Fahrtfreigabe geben.
- Unsicherheit und fehlende Daten sichtbar machen.
- Handlungsempfehlung direkt mit der Risikostufe verbinden.

### Cluster 2 – Vertrauen in Adapter und Fahrzeugzugriff

**Beobachtungen**

- Ein unbekannter OBD-II-Adapter erzeugt Unsicherheit.
- Nutzer fürchten, versehentlich Fahrzeugdaten zu verändern.
- Kompatibilität von Adapter und Fahrzeug ist vorab unklar.

**Abgeleitetes Bedürfnis**

Der Nutzer muss vor dem Scan verstehen, was angeschlossen wird, was die App tut und was sie technisch nicht tun kann.

**Produktimplikation**

- Sichtbarer Hinweis „Nur lesender Zugriff“.
- Schreibende OBD-II-Befehle technisch blockieren.
- Unterstützte Adapter und Fahrzeuge prüfen.
- Schrittweise Anschlussanleitung mit Bildern.
- Verbindungsfehler mit konkreten Lösungen erklären.

### Cluster 3 – Verständliche und nachvollziehbare KI

**Beobachtungen**

- KI-Erklärungen werden akzeptiert, wenn ihre Grenzen sichtbar sind.
- Vermutungen dürfen nicht wie bestätigte Diagnosen wirken.
- Quellen und eine kurze Begründung erhöhen voraussichtlich das Vertrauen.

**Abgeleitetes Bedürfnis**

Nutzer wollen einfache Erklärungen, aber gleichzeitig erkennen können, woher Aussagen stammen und wie sicher sie sind.

**Produktimplikation**

- Fakten, Hypothesen und Empfehlungen visuell trennen.
- Technische Datenbank als Primärquelle verwenden.
- KI-Einsatz transparent kennzeichnen.
- Quellen beziehungsweise Datengrundlage anzeigen.
- Technische Detailansicht optional anbieten.

### Cluster 4 – Stressfester Diagnoseablauf

**Beobachtungen**

- Die Nutzung findet möglicherweise in einer belastenden Situation statt.
- Zu viele Schritte und Fachbegriffe erhöhen die Abbruchgefahr.
- Ein Schnellmodus wurde als attraktive Lösung genannt.

**Abgeleitetes Bedürfnis**

Der Kernablauf muss kurz, geführt und auch unter Stress verständlich sein.

**Produktimplikation**

- Schnellmodus mit den Schritten Verbinden, Scannen und Handeln.
- Pro Bildschirm nur eine primäre Aktion.
- Fortschritt und verbleibende Schritte anzeigen.
- Einfache Sprache als Standard.
- Experteninformationen nachgelagert bereitstellen.

### Cluster 5 – Datenschutz und Bericht

**Beobachtungen**

- Lokale Speicherung wird gegenüber unklarer Cloud-Speicherung bevorzugt.
- Nutzer möchten selbst auswählen, welche Fahrzeugdaten geteilt werden.
- Der Diagnosebericht kann das Werkstattgespräch unterstützen.

**Abgeleitetes Bedürfnis**

Nutzer benötigen Kontrolle über Speicherung, Inhalt und Weitergabe ihrer Daten.

**Produktimplikation**

- Lokale Speicherung als bevorzugte MVP-Option prüfen.
- Cloud-Synchronisation nur optional und transparent.
- Berichtsvorschau vor dem Export.
- VIN und andere identifizierende Daten standardmäßig nicht aufnehmen.
- Löschen und Exportieren einfach zugänglich machen.

## Affinity Map – Zusammenfassung

| Themencluster | Nutzerproblem | Bedürfnis | Produktantwort | Evidenz |
|---|---|---|---|---|
| Dringlichkeit | Unklarheit über sichere Reaktion | Orientierung | Begründete Risikostufe und nächste Schritte | E1 |
| Vertrauen | Angst vor Fahrzeugveränderung | Kontrolle | Sichtbarer und technisch erzwungener Nur-Lese-Modus | E1 |
| KI-Erklärung | Sorge vor erfundenen Aussagen | Nachvollziehbarkeit | Quellen, Unsicherheit und Hypothesenkennzeichnung | E1 |
| Bedienung | Stress und technische Komplexität | Einfachheit | Geführter Schnellmodus | E1 |
| Datenschutz | Unklare Speicherung und Weitergabe | Datenkontrolle | Lokal zuerst, Vorschau und selektiver Export | E1 |
| Werkstatt | Schwierige Kommunikation | Teilbare Zusammenfassung | Verständlicher Diagnosebericht | E1 |

## Priorisierte Erkenntnisse

| Rang | Erkenntnis | Nutzerwert | Risiko bei Nichtbeachtung | Evidenz | Entscheidung |
|---:|---|---|---|---|---|
| 1 | Dringlichkeit und nächste Schritte zuerst zeigen | Sehr hoch | Gefährliche Fehlinterpretation | E1 | In MVP-Anforderung aufnehmen |
| 2 | Nur-Lese-Zugriff sichtbar und technisch garantieren | Sehr hoch | Sicherheits- und Vertrauensverlust | E1 | Harte MVP-Grenze |
| 3 | Risikostufe begründen und Unsicherheit zeigen | Sehr hoch | Falsche Sicherheit | E1 | In Ergebnisdesign aufnehmen |
| 4 | Einfachen Schnellmodus entwickeln | Hoch | Abbruch in Stresssituation | E1 | Prototyp erstellen |
| 5 | KI-Aussagen nachvollziehbar machen | Hoch | Vertrauens- und Haftungsrisiko | E1 | Quellen- und Statusmodell definieren |
| 6 | Datenschutzfreundliche Speicherung | Hoch | Ablehnung und Compliance-Risiko | E1 | Lokal-first prüfen |
| 7 | Bericht selektiv exportieren | Mittel bis hoch | Unnötige Datenweitergabe | E1 | Should-have bestätigen |

## Eingearbeitetes Feedback

### Änderung 1 – Ergebnisansicht neu priorisieren

**Vorher**

Technischer Fehlercode und Erklärung standen gedanklich im Mittelpunkt.

**Nachher**

Die Ergebnisansicht erhält folgende Reihenfolge:

1. unmittelbare Handlung,
2. Risikostufe,
3. kurze Begründung,
4. Unsicherheit und Datenlücken,
5. verständliche Erklärung,
6. mögliche Ursachen,
7. technische Details und Quellen.

**Begründung:** In einer Stresssituation benötigt der Nutzer zuerst Orientierung und erst danach technische Tiefe.

### Änderung 2 – Schnellmodus als MVP-Ablauf

Der MVP-Kernablauf wird vorläufig auf drei Hauptschritte reduziert:

1. **Verbinden** – Adapter finden, Kompatibilität prüfen, Nur-Lese-Modus erklären.
2. **Scannen** – Fortschritt anzeigen und ausschließlich lesende Befehle ausführen.
3. **Handeln** – Dringlichkeit, Begründung und sichere nächste Schritte zeigen.

Eine optionale Expertenansicht enthält zusätzliche technische Informationen.

### Änderung 3 – Vertrauensschicht ergänzen

Jede Diagnoseausgabe soll künftig sichtbar unterscheiden:

| Informationstyp | Darstellung |
|---|---|
| Gemessener Wert | „Vom Fahrzeug ausgelesen“ |
| Standardisierte Codebedeutung | „Technische Referenz“ |
| Mögliche Ursache | „Mögliche Ursache, nicht bestätigt“ |
| KI-Erklärung | „KI-gestützte Erläuterung“ |
| Sicherheitsregel | „Geprüfte Sicherheitsempfehlung“ |
| Fehlende Information | „Nicht genügend Daten“ |

### Änderung 4 – Datenschutzfreundlicher Bericht

- Diagnose zunächst lokal speichern.
- Vor Export eine Vorschau anzeigen.
- VIN, Standort und Kontodaten nicht automatisch einfügen.
- Nutzer wählt die zu teilenden Daten aus.
- Bericht enthält Diagnosezeitpunkt und Hinweis „Momentaufnahme“.
- Löschen muss direkt aus der Berichtshistorie möglich sein.

### Änderung 5 – Adapter-Onboarding erweitern

- Fahrzeug und Adapter vor dem Scan auf bekannte Kompatibilität prüfen.
- Anschluss in wenigen bebilderten Schritten erklären.
- Nur-Lese-Modus vor Scanbeginn bestätigen.
- Verbindungsstatus verständlich anzeigen.
- Fehlerhilfe nach Ursache strukturieren: Berechtigung, Bluetooth/WLAN, Adapter, Zündung und Fahrzeug.

## Aktualisierte User Stories

### US-04A – Dringlichkeit mit Begründung erkennen

| Feld | Inhalt |
|---|---|
| Priorität | Must-have |
| User Story | Als Fahrzeughalter möchte ich Dringlichkeit, Begründung und Unsicherheit eines Diagnoseergebnisses sehen, damit ich vorsichtig und nachvollziehbar reagieren kann. |
| Akzeptanzkriterium 1 | Die unmittelbare Handlung wird vor technischen Details angezeigt. |
| Akzeptanzkriterium 2 | Die Risikostufe wird mit Text und nicht nur mit Farbe dargestellt. |
| Akzeptanzkriterium 3 | Eine kurze Begründung erklärt die Einstufung. |
| Akzeptanzkriterium 4 | Fehlende Daten und Unsicherheit werden sichtbar angezeigt. |
| Akzeptanzkriterium 5 | Die App erteilt keine definitive Fahrtfreigabe. |
| Akzeptanzkriterium 6 | Sicherheitskritische Fälle empfehlen professionelle Hilfe. |

### US-09 – Geführten Schnellmodus verwenden

| Feld | Inhalt |
|---|---|
| Priorität | Must-have |
| User Story | Als besorgter Fahrzeughalter möchte ich einen kurzen geführten Diagnoseablauf nutzen, damit ich auch unter Stress schnell die nächsten sicheren Schritte erkenne. |
| Akzeptanzkriterium 1 | Der Ablauf besteht aus Verbinden, Scannen und Handeln. |
| Akzeptanzkriterium 2 | Jeder Bildschirm besitzt eine eindeutige primäre Aktion. |
| Akzeptanzkriterium 3 | Fortschritt und aktueller Schritt werden angezeigt. |
| Akzeptanzkriterium 4 | Die Standardsprache ist verständlich und vermeidet Fachjargon. |
| Akzeptanzkriterium 5 | Technische Details sind optional erreichbar. |
| Akzeptanzkriterium 6 | Der Nutzer kann den Ablauf sicher abbrechen. |

### US-10 – Herkunft einer Diagnoseaussage verstehen

| Feld | Inhalt |
|---|---|
| Priorität | Must-have |
| User Story | Als Nutzer möchte ich erkennen, ob eine Information gemessen, aus einer Referenz übernommen oder durch KI erklärt wurde, damit ich ihre Verlässlichkeit besser einschätzen kann. |
| Akzeptanzkriterium 1 | Gemessene Werte, Referenzdaten und KI-Erklärungen werden unterschieden. |
| Akzeptanzkriterium 2 | Mögliche Ursachen werden nicht als bestätigte Fakten dargestellt. |
| Akzeptanzkriterium 3 | Verfügbare Quellen oder Datengrundlagen sind einsehbar. |
| Akzeptanzkriterium 4 | Fehlende Daten werden ausdrücklich genannt. |
| Akzeptanzkriterium 5 | Die verwendete Diagnose- beziehungsweise Regelversion wird protokolliert. |

### US-11 – Nur-Lese-Modus nachvollziehen

| Feld | Inhalt |
|---|---|
| Priorität | Must-have |
| User Story | Als vorsichtiger Nutzer möchte ich vor dem Scan erkennen, dass AutoScan AI keine Fahrzeugdaten verändert, damit ich den Adapter vertrauensvoll verwenden kann. |
| Akzeptanzkriterium 1 | Vor Scanbeginn wird „Nur lesender Zugriff“ angezeigt. |
| Akzeptanzkriterium 2 | Schreibende OBD-II-Befehle sind technisch blockiert. |
| Akzeptanzkriterium 3 | Automatisierte Tests prüfen diese Beschränkung. |
| Akzeptanzkriterium 4 | Die App erklärt verständlich, welche Daten gelesen werden. |
| Akzeptanzkriterium 5 | Ein Scan kann ohne Fahrzeugänderung abgebrochen werden. |

## Auswirkung auf den MVP-Backlog

| Backlog-Element | Vorher | Neu | Änderung |
|---|---|---|---|
| OBD-II-Verbindung | Must-have | Must-have | Kompatibilitätsprüfung und Fehlerhilfe ergänzt |
| Diagnose starten | Must-have | Must-have | Schnellmodus und Fortschrittsanzeige präzisiert |
| Fehlercode erklären | Must-have | Must-have | Herkunft und KI-Kennzeichnung ergänzt |
| Dringlichkeit | Must-have | Must-have, höchste Priorität | Begründung, Unsicherheit und keine Fahrtfreigabe ergänzt |
| Mögliche Ursachen | Should-have | Should-have | Klare Hypothesenkennzeichnung ergänzt |
| Nächste Schritte | Must-have | Must-have, höchste Priorität | Vor technischen Details anzeigen |
| Berichtsexport | Should-have | Should-have | Vorschau und selektive Datenauswahl ergänzt |
| Datenschutz | Must-have | Must-have | Lokal-first und direktes Löschen ergänzt |
| Schnellmodus | Nicht separat definiert | Must-have | Neue US-09 |
| Informationsherkunft | Nicht separat definiert | Must-have | Neue US-10 |
| Nur-Lese-Vertrauen | Technische Grenze | Must-have Story | Neue US-11 |

## Wireframe-Anforderungen für die nächste Designphase

### Bildschirm 1 – Verbindung

- Titel: „Fahrzeug verbinden“
- sichtbarer Status: „Nur lesender Zugriff“
- Fahrzeug-/Adapter-Kompatibilitätsstatus
- kurze bebilderte Anschlussanleitung
- eindeutige Aktion: „Adapter suchen“
- Fehlerhilfe bei fehlgeschlagener Verbindung

### Bildschirm 2 – Scan

- Titel: „Fahrzeug wird geprüft“
- Schritt- und Fortschrittsanzeige
- Erklärung, welche Daten gelesen werden
- sichere Abbruchmöglichkeit
- keine technischen Rohdaten als Standard

### Bildschirm 3 – Ergebnis

- unmittelbare Handlung ganz oben
- Risikostufe mit Text, Farbe und Symbol
- kurze Begründung
- sichtbare Unsicherheit beziehungsweise Datenlücken
- einfache Erklärung
- optionale Ursachen und technische Details
- Aktionen: Bericht speichern, teilen oder löschen

## Validierungsplan

| Hypothese | Methode | Teilnehmer | Erfolgssignal |
|---|---|---:|---|
| Handlung muss zuerst stehen | Card Sorting mit Ergebnisinformationen | 5–7 | Mehrheit priorisiert Handlung/Dringlichkeit |
| Nur-Lese-Hinweis erhöht Vertrauen | Vergleich zweier Onboarding-Varianten | 5–7 | Höheres erklärtes Verständnis und Vertrauen |
| Risikostufe braucht Begründung | Usability-Test mit zwei Ergebnisvarianten | 5 | Nutzer interpretiert Ergebnis korrekt |
| Schnellmodus reduziert Überforderung | Klickbarer Prototyp und Task-Test | 5 | Hohe Abschlussrate ohne Moderationshilfe |
| Lokal-first wird bevorzugt | Interview und Auswahlaufgabe | 5–7 | Klare Präferenz mit nachvollziehbarem Grund |
| Selektiver Export wird verstanden | Bericht-Prototyp | 5 | Nutzer erkennt und kontrolliert geteilte Daten |

## Definition of Done – Research-basierte Anforderungen

Eine aus Interviewfeedback abgeleitete Funktion gilt erst als ausreichend bearbeitet, wenn:

- [ ] die zugrunde liegende Hypothese dokumentiert ist,
- [ ] die Evidenzstufe angegeben ist,
- [ ] Sicherheits- und Datenschutzfolgen bewertet sind,
- [ ] Akzeptanzkriterien definiert sind,
- [ ] mindestens ein Prototyp- oder Usability-Test durchgeführt wurde,
- [ ] Ergebnis und Entscheidung nachvollziehbar dokumentiert sind,
- [ ] bei sicherheitskritischen Funktionen eine fachliche Freigabe erfolgt ist.

**Ergebnisse**

- Simuliertes Interview systematisch ausgewertet
- Fünf Themencluster und sechs zentrale Bedürfnisse dokumentiert
- Feedback in fünf konkrete Produktänderungen überführt
- Vier User Stories neu erstellt beziehungsweise präzisiert
- MVP-Backlog und Wireframe-Anforderungen aktualisiert
- Validierungsplan für echte Interviews und Prototypentests erstellt
- Evidenzgrenze der KI-Simulation transparent berücksichtigt

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Feedback wird vorläufig eingearbeitet | Hilft bei Prototyp und realen Interviews | Product/UX |
| Keine Annahme erhält mehr als E1 | Es liegt noch keine reale Nutzerevidenz vor | Research Lead |
| Dringlichkeit und Handlung stehen vor technischen Details | Entspricht dem wichtigsten simulierten Bedürfnis | Product/UX |
| Schnellmodus wird Must-have-Hypothese | Stressfester Kernablauf ist zentral | Product Owner |
| Lokal-first wird geprüft, nicht endgültig beschlossen | Technische und reale Nutzerpräferenz noch offen | Privacy/Technical |
| Änderungen müssen durch reale Tests bestätigt werden | Verhindert Überbewertung synthetischer Forschung | Governance |

**Offene Punkte**

- [ ] Mindestens fünf reale Interviews durchführen
- [ ] Card Sorting zur Informationspriorität durchführen
- [ ] Zwei Varianten der Risikodarstellung entwerfen
- [ ] Schnellmodus als klickbaren Prototyp bauen
- [ ] Lokal- und Cloud-Speicherung technisch vergleichen
- [ ] Sicherheitslogik mit Kfz-Fachperson prüfen
- [ ] Nach echten Interviews Evidenzstufen aktualisieren

**Nächste Schritte**

- [ ] Figma-Wireframes für Verbindung, Scan und Ergebnis erstellen
- [ ] Interviewteilnehmer rekrutieren
- [ ] Ergebnisse aus echten Interviews in dieselben Cluster einordnen
- [ ] User Stories US-04A, US-09, US-10 und US-11 als GitHub Issues anlegen
- [ ] MVP-Backlog nach realer Validierung erneut priorisieren

---

## 2026-08-17 – Low-Fidelity- und High-Fidelity-Screens dokumentiert

**Prompt**

> Tagesaufgabe ist Erstelle Wireframes für dein Projekt oder beginne direkt mit dem Bau Deines Prototypen. (Anschließend: „jetzt mit high Fidelity" und „diese Zusammenfassung und Wireframes in github in die Branch Dokumentation hinzufügen".)

**Tagesziel**

Den bereits bestehenden AutoScan-AI-Prototyp nachträglich als Low-Fidelity-Wireframes und High-Fidelity-Screens dokumentieren, damit die heutige Tagesaufgabe im Projektverlauf nachvollziehbar bleibt.

**Aufgaben**

- [x] Low-Fidelity-Wireframes des Kernflows erstellen
- [x] High-Fidelity-Screens aus dem laufenden Prototyp exportieren
- [x] Ergebnisse in der Projektdokumentation ablegen

**Ergebnisse**

- Low-Fidelity-Wireframes (Graustufen, 6 Screens: Start, Fahrzeug wählen, Scan läuft, Ergebnis, Garage, Fahrzeug hinzufügen): [`docs/assets/wireframes/autoscan-wireframes.png`](assets/wireframes/autoscan-wireframes.png)
- High-Fidelity-Screens (reale Screenshots aus dem laufenden Prototyp, gleiche 6 Screens im gleichen Layout): [`docs/assets/wireframes/autoscan-hifi-board.png`](assets/wireframes/autoscan-hifi-board.png)

**Entscheidungen**

| Entscheidung | Begründung | Verantwortlich |
|---|---|---|
| Wireframes wurden nach dem Prototyp erstellt, nicht davor | Der Prototyp existierte bereits; Wireframes dienen hier als Dokumentation für den Tagesaufgaben-Prozess, nicht als Planungswerkzeug | Product Owner |
| High-Fidelity-Screens als echte Screenshots statt handgebauter Mockups | Höhere Genauigkeit, schneller, da der Prototyp bereits läuft | Technical Lead |
| Beide Sätze im identischen 6-Screen-Layout | Direkter 1:1-Vergleich Low-Fi vs. High-Fi im selben Board möglich | Technical Lead |

**Chancen und Risiken**

| Typ | Beschreibung | Maßnahme |
|---|---|---|
| Chance | Vergleich Low-Fi/High-Fi erleichtert Reviewer:innen die Nachvollziehbarkeit des Vorgehens | Beide Bilder im selben Abschnitt verlinken |
| Risiko | Reihenfolge (Prototyp vor Wireframes) könnte als abweichend vom klassischen UX-Prozess missverstanden werden | Entscheidung oben explizit begründet |

**Governance und Compliance**

- Datenschutz: Screens zeigen ausschließlich Demo-/Beispieldaten (Testfahrzeuge, keine echten Personendaten)
- Informationssicherheit: keine Zugangsdaten oder Secrets in den Screens sichtbar
- Rechtliche Prüfung: nicht erforderlich für diesen Dokumentationsschritt
- Freigaben: keine
- Dokumentationspflichten: Bilder liegen versioniert unter `docs/assets/wireframes/`

**Offene Punkte**

- [ ] Wireframes/High-Fidelity-Screens für verbleibende Nebenbereiche (Berichte, Mehr/News) ergänzen
- [ ] Usability-Test der High-Fidelity-Screens mit Personen aus dem Interviewleitfaden (2026-08-13) durchführen

**Nächste Schritte**

- [ ] Feedback aus einem Usability-Test in die Screens einarbeiten
- [ ] Entscheidung dokumentieren, ob Low-Fidelity-Wireframes künftig vor neuen Features erstellt werden

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
