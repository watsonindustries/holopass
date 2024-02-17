import { type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		const { supabase } = locals;

		console.log('got login request with provider:', provider);

		if (provider) {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `http://localhost:5173/auth/callback`
				}
			});

			throw redirect(303, data.url);

			console.log(data);

			if (error) {
				fail(500);
			}
		}
	}
};
