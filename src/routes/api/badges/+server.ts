import { json } from '@sveltejs/kit';

import type { Tables } from '$lib/database.types.js';
import { loadBadges } from '../../../supabase';

export type BadgesGetResponseBody = {
	badges?: Tables<'badges'>[];
	error?: string;
};
/**
 * Fetches the badge(s) with the specified ID(s) from the database.
 * If no ID is specified, returns all badges.
 * 
 * @param id - Zero or more badge IDs.
 * @returns `BadgesGetResponseBody` - The badges that were loaded, or an error message.
 */
export async function GET({ url, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (!session) {
		return json({
			error: 'Unauthorized',
		} as BadgesGetResponseBody, {
			status: 401,
		});
	}

	const ids = url.searchParams.getAll('id');
	// validate all convert to number[], else 400
	const idsNum = ids.map(Number);
	if (idsNum.some(isNaN)) {
		return json({
			error: 'Invalid request: id must be a number',
		} as BadgesGetResponseBody, {
			status: 400,
		});
	}

	const res = await loadBadges(supabase)(idsNum.length > 0 ? idsNum : null);

	if (!res) {
		return json({
			error: 'Internal server error',
		} as BadgesGetResponseBody, {
			status: 500,
		});
	}

	return json({
		badges: res,
	} as BadgesGetResponseBody, {
		status: 200,
	});
}