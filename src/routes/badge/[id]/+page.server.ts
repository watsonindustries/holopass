import {
	loadBadge,
	loadBadgeLocation,
	loadProfile,
	loadProfilesWithBadge
} from '../../../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const { id } = params;

	const session = await getSession();
	const user = session?.user;

	const profile = await loadProfile(supabase)(user);

	// try convert id to number
	const idAsNumber = Number(id);
	if (isNaN(idAsNumber)) {
		return { status: 404, error: new Error('Invalid badge ID') };
	}

	const badge = loadBadge(supabase, idAsNumber);
	const badgeLocation = loadBadgeLocation(supabase, idAsNumber);

	const profilesForBadge = loadProfilesWithBadge(supabase, idAsNumber);

	return {
		profile,
		badge,
		badgeLocation,
		profilesForBadge
	};
}) satisfies PageServerLoad;
