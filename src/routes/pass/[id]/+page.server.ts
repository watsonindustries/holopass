import { redirect } from '@sveltejs/kit';
import { loadBadges, loadOshi } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, parent }) => {
	const { supabase } = locals;

	const { pass, profile } = await parent();

	if (profile && profile.id === pass?.id) {
		redirect(303, '/mypass');
	}

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
		isFollowed
	};
}) satisfies PageServerLoad;
