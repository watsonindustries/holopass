import { json } from '@sveltejs/kit';

import type { Database } from '$lib/database.types.js';
import { loadNearestBadgesTemporal } from '../../../../supabase';

export type CheckInStartPostRequestBody = {
	/** GPS coordinates, in `[latitude, longitude]`. */
	loc: [number, number];
};
export type CheckInStartPostResponseBody = {
	badges?: Database['public']['Functions']['get_nearest_badges_temporal']['Returns'];
	error?: string;
};
export async function POST({ request, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (!session) {
		return json(
			{
				error: 'Unauthorized'
			} as CheckInStartPostResponseBody,
			{
				status: 401
			}
		);
	}

	let body: CheckInStartPostRequestBody;
	try {
		body = await request.json();
	} catch (e) {
		const errMsg = e instanceof Error ? e.message : 'Unknown error';
		return json(
			{
				error: `Invalid request: ${errMsg}`
			} as CheckInStartPostResponseBody,
			{
				status: 400
			}
		);
	}

	const { loc } = body;
	const res = await loadNearestBadgesTemporal(supabase, loc[0], loc[1], 1600 /* 1-mile radius */);

	if (!res) {
		return json(
			{
				error: 'Internal server error'
			} as CheckInStartPostResponseBody,
			{
				status: 500
			}
		);
	}

	if (res.length === 0) {
		return json(
			{
				error: 'No events found for current time and location'
			} as CheckInStartPostResponseBody,
			{
				status: 404
			}
		);
	}

	return json(
		{
			badges: res
		} as CheckInStartPostResponseBody,
		{
			status: 200
		}
	);
}
