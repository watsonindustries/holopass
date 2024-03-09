ALTER TABLE follows
	ADD CONSTRAINT follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES profiles(id);

ALTER TABLE follows
	ADD CONSTRAINT follows_followee_id_fkey FOREIGN KEY (followee_id) REFERENCES profiles(id);
