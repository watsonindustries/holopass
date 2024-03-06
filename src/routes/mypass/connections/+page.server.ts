import { loadProfiles } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, parent, url }) => {
	const { supabase } = locals;

	const { profile } = await parent();

	const type = url.searchParams.get('type') || 'following';

	return {
		followingProfiles: loadProfiles(supabase)(profile?.following_ids || []),
		type
	};
}) satisfies PageServerLoad;
