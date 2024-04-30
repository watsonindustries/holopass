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

	const profile = await loadProfile(supabase)(user);

	const { data } = await supabase
		.from('follows')
		.select('follower_id, followee_id')
		.eq('follower_id', profile?.id)
		.eq('followee_id', pass.id)
		.single();

	const isFollowed = data !== null;

	return {
		badges: loadBadges(supabase)(pass?.badge_ids || []),
		oshi: loadOshi(supabase)(pass?.talent_ids || []),
		profile,
		pass,
		isFollowed
	};
}) satisfies PageServerLoad;
