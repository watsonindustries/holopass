import { loadProfile } from '../../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase, getSession } }) => {
	const type = url.searchParams.get('type') || 'following';

	const session = await getSession();
	const user = session?.user;

	const profile = await loadProfile(supabase)(user);

	return { type, profile };
}) satisfies PageServerLoad;
