import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { z } from 'zod';
import { loadProfile } from '../../../supabase';

const profileSchema = z.object({
	nickname: z.string().min(3).max(30).trim(),
	location: z.string().max(30).optional(),
	bio: z
		.string()
		.min(0)
		.max(250, { message: 'Bio must be less than 250 characters' })
		.trim()
		.optional(),
	badge_ids: z.array(z.number().max(100)).max(100).optional(),
	talent_ids: z.array(z.number().max(100)).max(100).optional()
});

export const load = (async ({ locals }) => {
	const { supabase } = locals;

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		console.log('No session');
		redirect(303, '/login');
	}

	const profile = await loadProfile(supabase)(user);

	const { data: badges, error } = await supabase.from('badges').select('id, name, type, image');

	if (error) {
		console.error('error', error);
		return {};
	}

	const { data: talents, error: error2 } = await supabase.from('talents').select('*');

	if (error2) {
		console.error('error2', error);
		return {};
	}

	return { profile, badges, talents };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();

		const nickname = formData.get('nickname') as string;
		const location = formData.get('location') as string;
		const bio = formData.get('bio') as string;
		const badgeIds = mapToEntityIds(formData.entries(), 'badge') as number[];
		const talentIds = mapToEntityIds(formData.entries(), 'talent') as number[];

		const session = await getSession();

		try {
			profileSchema.parse({
				nickname,
				location,
				bio,
				badge_ids: badgeIds,
				talent_ids: talentIds
			});
		} catch (error) {
			const { fieldErrors: errors } = (error as z.ZodError).flatten();
			return { errors, nickname, location, bio, badgeIds, talentIds, success: false };
		}

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			nickname,
			location,
			bio,
			badge_ids: badgeIds,
			talent_ids: talentIds
		});

		if (error) {
			return fail(500, { nickname, location, bio, badgeIds, talentIds });
		}

		return { nickname, location, bio, badgeIds, talentIds, success: true };
	}
} satisfies Actions;

// Takes an iterable of FormDataEntryValue as input and returns an array of ids to be used as foreign keys
// The key name is expected to be in the format of `<entityName>-<id>`
function mapToEntityIds(
	data: IterableIterator<[string, FormDataEntryValue]>,
	entity = 'badge'
): number[] {
	const entityIds: number[] = [];
	for (const [key] of data) {
		if (key.includes(entity)) {
			const [, entityIdStr] = key.split('-');
			const entityId = parseInt(entityIdStr, 10);
			if (!isNaN(entityId)) {
				entityIds.push(entityId);
			}
		}
	}
	return entityIds;
}
