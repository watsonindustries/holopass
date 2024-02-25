import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { getSession, supabase } = event.locals;

	const session = await getSession();

	if (!session) {
		redirect(303, '/login');
	}

	const { user } = session;

	const { data: profile } = await supabase
		.from('profiles')
		.select('id, nickname')
		.eq('id', user.id)
		.single();

	return { profile };
}) satisfies PageServerLoad;
