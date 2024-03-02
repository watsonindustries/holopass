ALTER TABLE profiles DROP COLUMN following_ids;

ALTER TABLE profiles ADD COLUMN following_ids UUID[] DEFAULT '{}'::UUID[];
