import type { PageServerLoad } from './$types';
import { loadBadge, loadProfilesWithBadge } from '../../../supabase';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	const badge = loadBadge(supabase, Number(id));

	const profilesForBadge = loadProfilesWithBadge(supabase, Number(id));

	return { badge, profilesForBadge };
}) satisfies PageServerLoad;
