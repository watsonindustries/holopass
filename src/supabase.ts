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
		return profile as Tables<'profiles'>;
	};
}

/**
 * Loads multiple profiles from the Supabase database based on their IDs.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts an array of profile IDs and returns the profiles data.
 */
export function loadProfiles(
	supabase: SupabaseClient
): (ids: string[]) => Promise<Tables<'profiles'>[]> {
	return async (ids: string[]) => {
		const { data: profiles } = await supabase
			.from('profiles')
			.select('id, avatar_url, nickname, following_ids, location')
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
 * Retrieves the follower count for a user from the Supabase database.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a profile ID and returns the followers and follower count.
 */
export function loadFollowers(
	supabase: SupabaseClient
): (profileId: string) => Promise<{ followers: Tables<'profiles'>[]; count: number }> {
	return async (profileId: string) => {
		const { data: followers, count } = await supabase
			.from('profiles')
			.select('*', { count: 'exact' })
			.contains('following_ids', [profileId]);

		return { followers, count } as unknown as { followers: Tables<'profiles'>[]; count: number };
	};
}

/**
 * Loads badges from the Supabase database based on their IDs.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts an array of badge IDs and returns the badges data.
 */
export function loadBadges(supabase: SupabaseClient) {
	return async (badgeIds: number[]) => {
		const { data: badges } = await supabase
			.from('badges')
			.select('id, name, image, type')
			.in('id', badgeIds);

		return badges as Tables<'badges'>[];
	}
}

/**
 * Loads oshi (talents) from the Supabase database based on their IDs.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts an array of talent IDs and returns the oshi data.
 */
export function loadOshi(supabase: SupabaseClient) {
	return async (talentIds: number[]) => {
		const { data: oshi } = await supabase
			.from('talents')
			.select('id, name_en, fanmark')
			.in('id', talentIds);

		return oshi as Tables<'talents'>[];
	};
}
