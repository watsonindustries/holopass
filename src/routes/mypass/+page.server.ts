import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { supabase, getSession } = event.locals;

	const session = await getSession();

	if (!session) {
		return {
			status: 302,
			headers: {
				location: '/login'
			}
		};
	}

	const { user } = session;

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