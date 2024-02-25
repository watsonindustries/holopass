import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;

	const { data: pass, error } = await supabase
		.from('profiles')
		.select('avatar_url, bio, nickname, location, badge_ids, talent_ids')
		.eq('id', id)
		.single();

	if (error) {
		return error(500, error.message);
	}

	const { data: badges, error2 } = await supabase
		.from('badges')
		.select('id, name, image, type')
		.in('id', pass.badge_ids);

	if (error2) {
		return {
			status: 500,
			body: error
		};
	}

	const { data: oshi, error: error3 } = await supabase
		.from('talents')
		.select('id, name_en, fanmark')
		.in('id', pass.talent_ids);

	if (error3) {
		return {
			status: 500,
			body: error2
		};
	}

	return { pass, badges, oshi };
}) satisfies PageServerLoad;
