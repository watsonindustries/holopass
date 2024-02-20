import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { supabase } = locals;

	const { data: { user }, error: error3 } = await supabase.auth.getUser();

	if (!user) {
		console.log('No session');
		redirect(303, '/login');
	}

	if (error3) {
		console.error('error3', error3);
		return {};
	}

	const { data: badges, error } = await supabase
		.from('badges')
		.select('id, name, type, image');

	if (error) {
		console.error('error', error);
		return {};
	}

	const { data: talents, error: error2 } = await supabase
		.from('talents')
		.select('*');


	if (error2) {
		console.error('error2', error);
		return {};
	}

	return { badges, talents, user };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const badgeIds = mapToEntityIds(formData.entries(), 'badge');
		const oshiIds = mapToEntityIds(formData.entries(), 'talent');
		const { error } = await supabase.auth.updateUser({
			data: {
				nickname: formData.get('nickname') as string,
				location: formData.get('location') as string,
				bio: formData.get('bio') as string,
				badgeIds,
				oshiIds
			}
		});

		if (error) {
			console.error('error', error);
			fail(500);
		}
	}
}

// Takes an iterable of FormDataEntryValue as input and returns an array of ids to be used as foreign keys
// The key name is expected to be in the format of `<entityName>-<id>`
function mapToEntityIds(data: IterableIterator<[string, FormDataEntryValue]>, entity = 'badge'): number[] {
	const entityIds: number[] = [];
	for (const [key,] of data) {
		if (key.includes(entity)) {
			const [, entityIdStr] = key.split('-');
			const entityId = parseInt(entityIdStr, 10); if (!isNaN(entityId)) { entityIds.push(entityId); }
		}
	} return entityIds;
}