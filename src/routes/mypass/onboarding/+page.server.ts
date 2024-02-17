import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { supabase } = locals;

	const { data, error } = await supabase.from('badges').select('id, name, type, image');
	if (error) {
		console.error('error', error);
		return {};
	}
	const badges = data;

	const { data: data2, error: error2 } = await supabase.auth.getUser();
	if (error2) {
		console.error('error', error2);
		return {};
	}
	console.log('data2', data2);

	return { badges, userData: data2 };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);
		const badgeIds = mapToBadgeIds(formData.entries());
		const { data, error } = await supabase.auth.updateUser({
			data: {
				nickname: formData.get('nickname'),
				location: formData.get('location'),
				bio: formData.get('bio'),
				badgeIds
			}
		});

		if (error) {
			console.error('error', error);
			fail(500);
		}

		console.log('data', data);
	}
}

function mapToBadgeIds(data: IterableIterator<[string, FormDataEntryValue]>): number[] {
	const badgeIds: number[] = [];
	for (const [key,] of data) {
		if (key.includes('badge')) {
			const [, badgeIdStr] = key.split('-');
			const badgeId = parseInt(badgeIdStr, 10); if (!isNaN(badgeId)) { badgeIds.push(badgeId); }
		}
	} return badgeIds;
}