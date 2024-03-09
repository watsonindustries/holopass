DO $$
DECLARE
    profile_record RECORD;
    current_followee_id UUID;
BEGIN
    FOR profile_record IN
        SELECT id, following_ids FROM profiles
    LOOP
        FOREACH current_followee_id IN ARRAY profile_record.following_ids
        LOOP
            INSERT INTO follows (follower_id, followee_id)
            VALUES (profile_record.id, current_followee_id)
            ON CONFLICT (follower_id, followee_id) DO NOTHING;
        END LOOP;
    END LOOP;
END $$ LANGUAGE plpgsql;
