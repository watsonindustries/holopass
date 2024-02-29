import type { SupabaseClient, User } from '@supabase/supabase-js';

export function loadProfile(supabase: SupabaseClient) {
	return async (user: User) => {
		const { data: profile } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, location, bio, badge_ids, talent_ids')
			.eq('id', user.id)
			.single();
		return profile;
	};
}

export function loadBadges(badgeIds: number[], supabase: SupabaseClient) {
	const badges = supabase.from('badges').select('id, name, image, type').in('id', badgeIds);
	return badges;
}

export function loadOshi(talentIds: number[], supabase: SupabaseClient) {
	const oshi = supabase.from('talents').select('id, name_en, fanmark').in('id', talentIds);
	return oshi;
}
