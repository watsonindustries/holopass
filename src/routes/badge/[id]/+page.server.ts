import type { PageServerLoad } from '../$types';
import { loadBadge } from '../../../supabase';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	const badge = await loadBadge(supabase)(id);

	console.log(badge);

	return { badge };
}) satisfies PageServerLoad;
