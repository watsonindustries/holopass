import { loadBadges, loadOshi } from '../../supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { profile } = await parent();

	return {
		badges: loadBadges(supabase)(profile?.badge_ids || []),
		oshi: loadOshi(supabase)(profile?.talent_ids || []),
		profile
	};
}) satisfies PageServerLoad;
