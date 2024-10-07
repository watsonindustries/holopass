import { loadBadges, loadOshi, loadProfile } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, parent }) => {
	const { supabase, getSession } = locals;
	
	const session = await getSession();
	const user = session?.user;

	const { pass } = await parent();

	const profile = await loadProfile(supabase)(user);

	const { data } = await supabase
		.from('follows')
		.select('follower_id, followee_id')
		.eq('follower_id', profile?.id)
		.eq('followee_id', pass?.id)
		.single();

	const isFollowed = data !== null;

	return {
		badges: loadBadges(supabase)(pass?.badge_ids || []),
		oshi: loadOshi(supabase)(pass?.talent_ids || []),
		profile,
		isFollowed
	};
}) satisfies PageServerLoad;
