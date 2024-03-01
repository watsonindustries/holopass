import { fail } from '@sveltejs/kit';
import { loadBadges, loadOshi, loadPass } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	const pass = await loadPass(supabase)(id);

	if (!pass) {
		return fail(404, { message: 'Pass not found' });
	}

	return {
		badges: loadBadges(pass?.badge_ids, supabase),
		oshi: loadOshi(pass?.talent_ids, supabase),
		pass
	};
}) satisfies PageServerLoad;
