import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { loadProfile } from '../../supabase';

export const load = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { session } = await parent();

	if (!session) {
		console.log('No session', session);
		redirect(303, '/login');
	}

	const { user } = session;

	const profile = await loadProfile(supabase)(user);

	return { user, profile };
}) satisfies LayoutServerLoad;