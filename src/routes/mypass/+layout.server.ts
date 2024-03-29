import { redirect } from '@sveltejs/kit';
import { loadProfile, loadProfileFollowers, loadProfileFollowing } from '../../supabase';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { session } = await parent();

	if (!session) {
		console.log('No session', session);
		redirect(303, '/login');
	}

	const { user } = session;

	const profile = await loadProfile(supabase)(user);

	return {
		user,
		profile,
		following: loadProfileFollowing(supabase)(profile?.id || ''),
		followers: loadProfileFollowers(supabase)(profile?.id || '')
	};
}) satisfies LayoutServerLoad;
