import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { supabase } = event.locals;

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		console.log('No session');
		redirect(303, '/login');
	}

	const { data: badges, error } = await supabase
		.from('badges')
		.select('id, name, image, type')
		.in('id', user.user_metadata.badgeIds);

	if (error) {
		return {
			status: 500,
			body: error
		};
	}

	const { data: oshi, error: error2 } = await supabase
		.from('talents')
		.select('id, name_en, fanmark')
		.in('id', user.user_metadata.oshiIds);

	if (error2) {
		return {
			status: 500,
			body: error2
		};
	}

	return { badges, oshi };
}) satisfies PageServerLoad;