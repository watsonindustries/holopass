import type { SupabaseClient, User } from '@supabase/supabase-js';

/**
 * Loads the profile of a user from the Supabase database.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a user object and returns the user's profile.
 */
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

/**
 * Loads a pass from the Supabase database based on its ID.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a pass ID and returns the pass data.
 */
export function loadPass(supabase: SupabaseClient) {
	return async (id: string) => {
		const { data: pass } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, location, bio, badge_ids, talent_ids')
			.eq('id', id)
			.single();
		return pass;
	};
}

/**
 * Loads badges from the Supabase database based on their IDs.
 * @param badgeIds - An array of badge IDs.
 * @param supabase - The Supabase client instance.
 * @returns The badges data.
 */
export function loadBadges(badgeIds: number[] = [], supabase: SupabaseClient) {
	if (badgeIds === null) return [];
	const badges = supabase.from('badges').select('id, name, image, type').in('id', badgeIds);
	return badges;
}

/**
 * Loads oshi (talents) from the Supabase database based on their IDs.
 * @param talentIds - An array of talent IDs.
 * @param supabase - The Supabase client instance.
 * @returns The oshi data.
 */
export function loadOshi(talentIds: number[] = [], supabase: SupabaseClient) {
	if (talentIds === null) return [];
	const oshi = supabase.from('talents').select('id, name_en, fanmark').in('id', talentIds);
	return oshi;
}

