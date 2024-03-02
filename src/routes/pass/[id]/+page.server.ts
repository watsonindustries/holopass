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
		badges: loadBadges(pass?.badge_ids || [], supabase),
		oshi: loadOshi(pass?.talent_ids || [], supabase),
		profile: loadProfile(supabase)(user),
		pass
	};
}) satisfies PageServerLoad;
