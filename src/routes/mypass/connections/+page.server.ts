import { loadProfiles } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { profile } = await parent();

	return {
		followingProfiles: loadProfiles(supabase)(profile?.following_ids || [])
	};
}) satisfies PageServerLoad;
