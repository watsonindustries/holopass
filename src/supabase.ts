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
			.select(
				`id, 
				avatar_url, 
				nickname, 
				nickname_jp,
				location, 
				bio, 
				badge_ids, 
				talent_ids`
			)
			.eq('id', user?.id)
			.single();
		return profile as Tables<'profiles'>;
	};
}

/**
 * Loads the profiles that a user is following from the Supabase database.
 * @param supabase - The Supabase client instance.
 * @returns A function that accepts a profile ID and returns the profiles that the user is following.
 */
export function loadProfileFollowing(
	supabase: SupabaseClient
): (profileId: string) => Promise<{ follows: Tables<'follows'>[]; count: number }> {
	return async (profileId: string) => {
		if (profileId === null) return { follows: [], count: 0 };
		const { data: follows, count } = await supabase
			.from('follows')
			.select(
				`
			follower_id, 
			profiles:followee_id (
				id,
				nickname,
				avatar_url,
				location
			)`,
				{ count: 'exact' }
			)
			.eq('follower_id', profileId);
		return { follows, count } as unknown as { follows: Tables<'follows'>[]; count: number };
	};
}

export function loadProfileFollowers(
	supabase: SupabaseClient
): (profileId: string) => Promise<{ followers: Tables<'profiles'>[]; count: number }> {
	return async (profileId: string) => {
		if (profileId === null) return { followers: [], count: 0 };
		const { data: followers, count } = await supabase
			.from('follows')
			.select(
				`
			followee_id, 
			profiles:follower_id (
				id,
				nickname,
				avatar_url,
				location
			)`,
				{ count: 'exact' }
			)
			.eq('followee_id', profileId);
		return { followers, count } as unknown as { followers: Tables<'profiles'>[]; count: number };
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
	};
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
