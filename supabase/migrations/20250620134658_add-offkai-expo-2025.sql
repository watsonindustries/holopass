insert into public.badges
  (name, type, location, external_url, event_start, event_end)
values
  ('OffKai Expo 2025',
    'convention',
    extensions.st_point(-121.8863, 37.3297),
    'https://www.offkaiexpo.com/',
    '2025-06-20 17:00:00+00:00'::timestamp,
    '2025-06-23 01:00:00+00:00'::timestamp)
ON CONFLICT (id) DO NOTHING;
