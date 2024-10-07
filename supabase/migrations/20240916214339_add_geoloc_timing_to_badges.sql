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

-- add helper functions for Supabase querying (can't do proper queries directly)
create or replace function get_nearest_badges(lat float, long float, max_dist float)
returns table (
  id public.badges.id%TYPE,
  lat float,
  long float,
  dist_m float
)
language sql
as
$$
select
  id,
  st_y(location::geometry) as lat,
  st_x(location::geometry) as long,
  st_distance(location, st_point(long, lat)::geography) as dist_m
from public.badges
where st_distance(location, st_point(long, lat)::geography) <= max_dist
order by location <-> st_point(long, lat)::geography;
$$;

create or replace function get_nearest_badges_temporal(lat float, long float, max_dist float)
returns table (
  id public.badges.id%TYPE,
  lat float,
  long float,
  dist_m float
)
language sql
as
$$
select
  id,
  st_y(location::geometry) as lat,
  st_x(location::geometry) as long,
  st_distance(location, st_point(long, lat)::geography) as dist_m
from public.badges
where
    st_distance(location, st_point(long, lat)::geography) <= max_dist
    and now() between event_start and event_end
order by location <-> st_point(long, lat)::geography;
$$;

create or replace function get_badge_location(id public.badges.id%TYPE)
returns table (
    id public.badges.id%TYPE,
    lat float,
    long float
)
language sql
as
$$
select
    id,
    st_y(location::geometry) as lat,
    st_x(location::geometry) as long
from public.badges
where id = $1;
$$;

create or replace function get_badge_locations()
returns table (
    id public.badges.id%TYPE,
    lat float,
    long float
)
language sql
as
$$
select
    id,
    st_y(location::geometry) as lat,
    st_x(location::geometry) as long
from public.badges;
$$;