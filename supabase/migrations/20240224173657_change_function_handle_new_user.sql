CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
insert into public.profiles (id, nickname, avatar_url, email)
values (
		new.id,
		COALESCE(
			new.raw_user_meta_data->>'full_name',
			new.raw_user_meta_data->>'nickname'
		),
		new.raw_user_meta_data->>'avatar_url',
		new.raw_user_meta_data->>'email'
	);
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;