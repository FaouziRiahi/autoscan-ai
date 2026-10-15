-- AutoScan AI v3 – Datenbank für Läufe, Logs und Auswertung
-- Einmal im Supabase SQL Editor ausführen.

-- 1) Ein Datensatz pro Workflow-Lauf
create table if not exists public.autoscan_runs (
  run_id            text primary key,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  workflow_version  text not null,
  prompt_version    text,
  quelle            text,                 -- Formular | Demo
  status            text not null,        -- GESTARTET | ABGESCHLOSSEN | TEILERGEBNIS | EINGABEFEHLER
  sprache_kunde     text,
  fahrzeug          jsonb,                -- Marke, Modell, Jahr, FIN-Herkunft
  eingabe           jsonb,                -- Problembeschreibung, km, Codes (ohne Fotos)
  bildauswertung    jsonb,
  obd2              jsonb,
  api_daten         jsonb,                -- vPIC, Rückrufe
  wissensbasis      jsonb,                -- Katalogtreffer
  kalender          jsonb,                -- freie Termine
  ki_ergebnis       jsonb,
  llm               jsonb,                -- Modelle, Tokens, Kosten je Aufruf
  kosten_usd        numeric(12,6),
  tokens_gesamt     integer,
  bericht_text      text,
  email_status      text,
  alert_status      text,
  fehler            jsonb not null default '[]'::jsonb,
  hinweise          jsonb not null default '[]'::jsonb,
  dauer_ms          integer
);

-- 2) Ein Datensatz pro Arbeitsschritt (Logging)
create table if not exists public.autoscan_logs (
  id          bigserial primary key,
  run_id      text not null references public.autoscan_runs(run_id) on delete cascade,
  ts          timestamptz not null default now(),
  schritt     text not null,              -- z. B. LLM_BERICHT, FAHRZEUG_API, KALENDER
  status      text not null,              -- OK | FEHLER | FALLBACK | UEBERSPRUNGEN
  dauer_ms    integer,
  details     jsonb
);
create index if not exists autoscan_logs_run_idx on public.autoscan_logs(run_id);

-- 3) Auswertung für Dashboard und Präsentation
create or replace view public.autoscan_tagesstatistik as
select
  date_trunc('day', created_at)::date                         as tag,
  workflow_version,
  count(*)                                                    as laeufe,
  count(*) filter (where status = 'ABGESCHLOSSEN')            as erfolgreich,
  count(*) filter (where status <> 'ABGESCHLOSSEN')           as mit_fehlern,
  round(avg(dauer_ms))                                        as avg_dauer_ms,
  sum(tokens_gesamt)                                          as tokens,
  round(sum(kosten_usd)::numeric, 6)                          as kosten_usd
from public.autoscan_runs
group by 1, 2
order by 1 desc, 2;

create or replace view public.autoscan_schritt_performance as
select schritt,
       count(*)                                     as aufrufe,
       count(*) filter (where status <> 'OK')       as probleme,
       round(avg(dauer_ms))                         as avg_ms,
       max(dauer_ms)                                as max_ms
from public.autoscan_logs
group by schritt
order by avg_ms desc nulls last;

-- Zugriff: n8n nutzt den service_role-Schlüssel (Supabase-Credential). Row Level Security aktivieren,
-- damit öffentliche Schlüssel keine Daten lesen können.
alter table public.autoscan_runs enable row level security;
alter table public.autoscan_logs enable row level security;
