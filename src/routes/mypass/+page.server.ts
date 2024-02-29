import { redirect } from '@sveltejs/kit';
import { loadBadges, loadOshi, loadProfile } from '../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { supabase, getSession } = event.locals;

	const session = await getSession();

	if (!session) {
		console.log('No session', session);
		redirect(303, '/login');
	}

	const { user } = session;

	const profile = await loadProfile(supabase)(user);

	return {
		badges: loadBadges(profile?.badge_ids, supabase),
		oshi: loadOshi(profile?.talent_ids, supabase),
		profile
	};
}) satisfies PageServerLoad;
