import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';
import { loadPass, loadProfileFollowers, loadProfileFollowing } from '../../../supabase';

export const load = (async ({ locals, params }) => {
	const { supabase, getSession } = locals;
	const session = await getSession();

	const { id } = params;

	if (!session) {
		console.log('No session', session);
		redirect(303, '/login');
	}

	const pass = await loadPass(supabase)(id);

	if (pass === null) {
		return fail(404, { message: 'Pass not found' });
	}

	return {
		pass,
		user: session.user,
		following: loadProfileFollowing(supabase)(pass.id),
		followers: loadProfileFollowers(supabase)(pass.id)
	};
}) satisfies LayoutServerLoad;
