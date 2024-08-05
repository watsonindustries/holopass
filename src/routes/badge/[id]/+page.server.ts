import type { PageServerLoad } from '../$types';
import { loadBadge, loadProfilesWithBadge } from '../../../supabase';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	const badge = loadBadge(supabase, id);

	const profilesForBadge = loadProfilesWithBadge(supabase, id);

	return { badge, profilesForBadge };
}) satisfies PageServerLoad;
