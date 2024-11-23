INSERT INTO badges (id, name, image)
VALUES (1, 'Capture the Moment', 'https://nvllajfoffuvocugzigw.supabase.co/storage/v1/object/public/avatars/0.png');

INSERT INTO talents (id, name_en, name_jp, gen, fanmark)
VALUES (1, 'Shiorin', 'シオリン', 'Advent', '👁️‍🗨️');

INSERT INTO auth.users (id, instance_id, email, raw_user_meta_data)
VALUES ('33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5', '00000000-0000-0000-0000-000000000000', 'test@example.com', '{"provider": "discord"}');

INSERT INTO profiles (id, nickname, avatar_url, talent_ids, badge_ids) 
VALUES ('33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5', 'Daniru', 'https://nvllajfoffuvocugzigw.supabase.co/storage/v1/object/public/avatars/0.png', ARRAY[1], ARRAY[1])
ON CONFLICT (id) DO UPDATE 
SET nickname = EXCLUDED.nickname,
    avatar_url = EXCLUDED.avatar_url,
    talent_ids = EXCLUDED.talent_ids,
    badge_ids = EXCLUDED.badge_ids;