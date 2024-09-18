import { loadBadge, loadProfilesWithBadge } from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	// try convert id to number
	const idAsNumber = Number(id);
	if (isNaN(idAsNumber)) {
		return { status: 404, error: new Error('Invalid badge ID') };
	}

	const badge = loadBadge(supabase, idAsNumber);

	const profilesForBadge = loadProfilesWithBadge(supabase, idAsNumber);

	return { badge, profilesForBadge };
}) satisfies PageServerLoad;
