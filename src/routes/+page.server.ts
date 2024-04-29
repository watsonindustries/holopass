import { redirect } from '@sveltejs/kit';
import { setProfilePictureFromURL } from '../supabase';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals }) => {
	const { session, socialThumbImgURL } = await parent();
	const { supabase } = locals;

	if (session) {
		// MARK: Login flow complete and the user is logged in

		const discordAvatarURL: string = session.user.user_metadata.avatar_url;

		await setProfilePictureFromURL(supabase, discordAvatarURL, session.user.id);

		throw redirect(303, '/mypass');
	}
	return { socialThumbImgURL };
}) satisfies PageServerLoad;
