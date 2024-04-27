import { type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const redirectAfterLoginURL = url.searchParams.get('redirectAfterLoginURL') as string;
	if (redirectAfterLoginURL) {
		return { redirectAfterLoginURL };
	}
	return { redirectAfterLoginURL: '' };
};

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		const redirectAfterLoginURL = url.searchParams.get('redirectAfterLoginURL') as string;
		const { supabase } = locals;

		if (provider) {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				redirectTo: redirectAfterLoginURL
			});
			if (error) {
				fail(500);
			}

			throw redirect(303, data.url);
		}
	}
};
