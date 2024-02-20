import { type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { dev } from '$app/environment';

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		const { supabase } = locals;

		// where the user goes after logging in
		const redirectTo = dev ? 'http://localhost:5173/' : 'https://holopass.pages.dev/';

		if (provider) {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: { redirectTo }
			});
			if (error) {
				fail(500);
			}
			throw redirect(303, data.url);
		}
	}
};
