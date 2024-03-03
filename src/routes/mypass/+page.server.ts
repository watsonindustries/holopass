import { loadBadges, loadOshi } from '../../supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { profile } = await parent();

	return {
		badges: loadBadges(profile?.badge_ids || [], supabase),
		oshi: loadOshi(profile?.talent_ids || [], supabase),
		profile
	};
}) satisfies PageServerLoad;
