-- enable postgis extension
create schema if not exists "extensions";
create extension if not exists postgis with schema "extensions";

-- modify badges table
alter table badges
add column
    location geography(POINT),
add column
    event_start timestamp with time zone,
add column
    event_end timestamp with time zone
;