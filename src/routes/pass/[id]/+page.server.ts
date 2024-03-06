import { fail } from '@sveltejs/kit';
import { loadBadges, loadOshi, loadPass, loadProfile } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase, getSession } = locals;

	const session = await getSession();
	const user = session?.user;

	const pass = await loadPass(supabase)(id);

	if (pass === null) {
		return fail(404, { message: 'Pass not found' });
	}

	return {
		badges: loadBadges(supabase)(pass?.badge_ids || []),
		oshi: loadOshi(supabase)(pass?.talent_ids || []),
		profile: loadProfile(supabase)(user),
		pass
	};
}) satisfies PageServerLoad;
