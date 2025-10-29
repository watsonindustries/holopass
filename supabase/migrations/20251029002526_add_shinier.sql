insert into public.badges
  (name, type, location, external_url, event_start, event_end, image)
values
  ('Tokoyami Towa 2nd Live "SHINier"',
    'concert',
    extensions.st_point(139.7918, 35.6348),
    'https://shinier.hololivepro.com/',
    '2025-10-29 00:00:00+00:00'::timestamp,
    '2025-10-29 23:59:00+00:00'::timestamp,
    'https://nvllajfoffuvocugzigw.supabase.co/storage/v1/object/public/badges/towa-shinier.png')
ON CONFLICT (id) DO NOTHING;
