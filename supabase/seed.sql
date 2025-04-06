INSERT INTO badges (
  name, type, external_url, event_start, event_end, location
) VALUES (
  'hololive English 2nd Concert -Breaking Dimensions-',
  'concert',
  'https://breakingdimensions.hololivepro.com/',
  '2024-08-24 21:00:00+00',
  '2024-08-26 00:00:00+00',
  st_point(-73.957268, 40.645969)
)
ON CONFLICT (name) DO UPDATE
SET
  type = EXCLUDED.type,
  external_url = EXCLUDED.external_url,
  event_start = EXCLUDED.event_start,
  event_end = EXCLUDED.event_end,
  location = EXCLUDED.location
;

------

INSERT INTO auth.users (
  id, instance_id, email, raw_user_meta_data
) VALUES (
  '33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5',
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  '{"provider": "discord"}'
)
ON CONFLICT (id) DO UPDATE
SET
  instance_id = EXCLUDED.instance_id,
  email = EXCLUDED.email,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data
;

INSERT INTO profiles (
  id, nickname, avatar_url, talent_ids, badge_ids
) VALUES (
  '33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5',
  'Daniru',
  'https://nvllajfoffuvocugzigw.supabase.co/storage/v1/object/public/avatars/0.png',
  ARRAY[1], ARRAY[1]
)
ON CONFLICT (id) DO UPDATE 
SET
  nickname = EXCLUDED.nickname,
  avatar_url = EXCLUDED.avatar_url,
  talent_ids = EXCLUDED.talent_ids,
  badge_ids = EXCLUDED.badge_ids
;