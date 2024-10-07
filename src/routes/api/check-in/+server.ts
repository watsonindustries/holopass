import type { Tables } from '$lib/database.types';
import { json } from '@sveltejs/kit';
import {
	loadBadge,
	loadBadgeLocation,
	loadNearestBadgesTemporal,
	loadProfile
} from '../../../supabase';

export type CheckInPostRequestBody = {
	id: string;
	/** GPS coordinates, in `[latitude, longitude]`. */
	loc: [number, number];
};
export type CheckInPostResponseBody = {
	badge?: Tables<'badges'>;
	error?: string;
};
export async function POST({ request, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (!session) {
		return json(
			{
				error: 'Unauthorized'
			} as CheckInPostResponseBody,
			{
				status: 401
			}
		);
	}

	let body: CheckInPostRequestBody;
	try {
		body = await request.json();
	} catch (e) {
		const errMsg = e instanceof Error ? e.message : 'Unknown error';
		return json(
			{
				error: `Invalid request: ${errMsg}`
			} as CheckInPostResponseBody,
			{
				status: 400
			}
		);
	}

	const { id, loc } = body;

	console.log(JSON.stringify(body));

	const { user } = session;
	// fetch user badge IDs
	const profile = await loadProfile(supabase)(user);
	if (!profile) {
		return json(
			{
				error: 'Profile not found'
			} as CheckInPostResponseBody,
			{
				status: 404
			}
		);
	}

	// try convert id to number
	const idAsNumber = Number(id);
	if (isNaN(idAsNumber)) {
		return json(
			{
				error: 'Invalid request: id must be a number'
			} as CheckInPostResponseBody,
			{
				status: 400
			}
		);
	}

	const badge = await loadBadge(supabase, idAsNumber);
	const badgeLoc = await loadBadgeLocation(supabase, idAsNumber);
	if (!badgeLoc) {
		return json(
			{
				error: 'Badge location not found'
			} as CheckInPostResponseBody,
			{
				status: 404
			}
		);
	}

	const activeNearbyBadges = await loadNearestBadgesTemporal(
		supabase,
		loc[0],
		loc[1],
		1600 /* 1-mile radius */
	);
	if (!activeNearbyBadges || activeNearbyBadges.length === 0) {
		return json(
			{
				error: 'No badges found for current time and location'
			} as CheckInPostResponseBody,
			{
				status: 404
			}
		);
	}

	// check if badge is active (just like `/api/check-in/start`)
	const badgeInActiveNearbyBadges = activeNearbyBadges.find((b) => b.id === idAsNumber);
	if (!badgeInActiveNearbyBadges) {
		return json(
			{
				error: 'That badge is not active right now'
			} as CheckInPostResponseBody,
			{
				status: 400
			}
		);
	}

	// check if badge is already in profile
	if (profile.badge_ids?.includes(idAsNumber)) {
		return json(
			{
				error: 'You already have this badge'
			} as CheckInPostResponseBody,
			{
				status: 400
			}
		);
	}

	// it is active now, so let's update the check-in
	const { err } = await supabase
		.from('profiles')
		.update({
			badge_ids: profile.badge_ids?.concat(idAsNumber) || [idAsNumber]
		})
		.eq('id', user.id);

	if (err) {
		console.error(`[/api/check-in] ${err}`);
		return json(
			{
				error: 'Internal server error'
			} as CheckInPostResponseBody,
			{
				status: 500
			}
		);
	}

	return json(
		{
			badge
		},
		{
			status: 200
		}
	);
}
