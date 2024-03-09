CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID NOT NULL,
    followee_id UUID NOT NULL,
    PRIMARY KEY (follower_id, followee_id)
);
