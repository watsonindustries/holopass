import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Tables } from './lib/database.types';

/**
 * Loads the profile of a user from the Supabase database.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a user object and returns the user's profile.
 */
export function loadProfile(
	supabase: SupabaseClient
): (user: User | undefined) => Promise<Tables<'profiles'> | null> {
	return async (user: User | undefined) => {
		if (user === null) return null;
		const { data: profile } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, location, bio, badge_ids, talent_ids, following_ids')
			.eq('id', user?.id)
			.single();
		return profile as Tables<'profiles'> | null;
	};
}

export function loadProfiles(
	supabase: SupabaseClient
): (ids: string[]) => Promise<Tables<'profiles'>[]> {
	return async (ids: string[]) => {
		const { data: profiles } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, following_ids')
			.in('id', ids);
		return profiles as Tables<'profiles'>[];
	};
}

/**
 * Loads a pass from the Supabase database based on its ID.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a pass ID and returns the pass data.
 */
export function loadPass(
	supabase: SupabaseClient
): (id: string) => Promise<Tables<'profiles'> | null> {
	return async (id: string) => {
		const { data: pass } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, location, bio, badge_ids, talent_ids')
			.eq('id', id)
			.single();
		return pass as Tables<'profiles'> | null;
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
