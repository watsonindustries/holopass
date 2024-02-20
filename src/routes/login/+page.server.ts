import { type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		const { supabase } = locals;

		if (provider) {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `http://localhost:5173/` // where the user goes after logging in
				}
			});
			if (error) {
				fail(500);
			}
			throw redirect(303, data.url);
		}
	}
};
