import type { LayoutServerLoad } from '../../$types';
import {
	loadPass,
	loadProfile,
	loadProfileFollowers,
	loadProfileFollowing
} from '../../../supabase';

export const load = (async ({ locals, params }) => {
	const { supabase, getSession } = locals;

	const session = await getSession();
	const user = session?.user;

	const profile = await loadProfile(supabase)(user);

	const { id } = params;
	const idOrNickname = decodeURIComponent(id || '');

	const pass = await loadPass(supabase)(idOrNickname);

	return {
		profile,
		pass,
		following: loadProfileFollowing(supabase)(pass?.id ?? ''),
		followers: loadProfileFollowers(supabase)(pass?.id ?? '')
	};
}) satisfies LayoutServerLoad;
