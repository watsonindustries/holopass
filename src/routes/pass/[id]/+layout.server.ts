import type { LayoutServerLoad } from '../../$types';
import { loadPass, loadProfileFollowers, loadProfileFollowing } from '../../../supabase';

export const load = (async ({ locals, params }) => {
	const { supabase } = locals;

	const { id } = params;
	const idOrNickname = decodeURIComponent(id || '');

	const pass = await loadPass(supabase)(idOrNickname);

	return {
		pass,
		following: loadProfileFollowing(supabase)(pass?.id ?? ''),
		followers: loadProfileFollowers(supabase)(pass?.id ?? '')
	};
}) satisfies LayoutServerLoad;
