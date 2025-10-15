insert into public.badges
  (name, type, location, external_url, event_start, event_end, image)
values
  ('hololive English 3rd Concert -All for One-',
    'concert',
    extensions.st_point(-73.9793, 40.7590),
    'https://all-for-one.hololivepro.com/',
    '2025-08-24 00:00:00+00:00'::timestamp,
    '2025-08-25 00:00:00+00:00'::timestamp,
    'https://nvllajfoffuvocugzigw.supabase.co/storage/v1/object/public/badges/all-for-one.png')
ON CONFLICT (id) DO NOTHING;

