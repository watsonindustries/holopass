import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const type = url.searchParams.get('type') || 'following';

	return { type };
}) satisfies PageServerLoad;
