import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (session) {
		throw redirect(303, '/mypass');
	}
	return {};
}) satisfies PageServerLoad;
