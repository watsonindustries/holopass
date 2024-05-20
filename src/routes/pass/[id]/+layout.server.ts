import { fail } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';
import { loadPass, loadProfileFollowers, loadProfileFollowing } from '../../../supabase';

export const load = (async ({ locals, params }) => {
	const { supabase } = locals;

	const { id } = params;
	const idOrNickname = decodeURIComponent(id || '');

	const pass = await loadPass(supabase)(idOrNickname);

	if (pass === null) {
		return fail(404, { message: 'Pass not found' });
	}

	return {
		pass,
		following: loadProfileFollowing(supabase)(pass.id),
		followers: loadProfileFollowers(supabase)(pass.id)
	};
}) satisfies LayoutServerLoad;
