insert into public.badges
  (name, type, location, external_url, event_start, event_end)
values
  ('Flashpoint ReGLOSS 1st Live',
    'concert',
    extensions.st_point(139.7927, 35.6355),
    'https://flashpoint.hololivepro.com/',
    '2025-12-16 09:30:00+00:00'::timestamp,
    '2025-12-16 13:30:00+00:00'::timestamp)
ON CONFLICT (id) DO NOTHING;

