import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { supabase, getSession } = event.locals;

	const session = await getSession();

	if (!session) {
		console.log('No session', session);
		redirect(303, '/login');
	}

	const { user } = session;

	const { data: profile } = await supabase
		.from('profiles')
		.select('id, avatar_url, nickname, location, bio, badge_ids, talent_ids')
		.eq('id', user.id)
		.single();

	const { data: badges, error } = await supabase
		.from('badges')
		.select('id, name, image, type')
		.in('id', profile.badge_ids);

	if (error) {
		return {
			status: 500,
			body: error
		};
	}

	const { data: oshi, error: error2 } = await supabase
		.from('talents')
		.select('id, name_en, fanmark')
		.in('id', profile.talent_ids);

	if (error2) {
		return {
			status: 500,
			body: error2
		};
	}

	return { badges, oshi, profile };
}) satisfies PageServerLoad;
