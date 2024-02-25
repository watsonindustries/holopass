import type { TypedSupabaseClient } from '@supabase/ssr/dist/typeTypedSupabaseClient';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		declare module 'svelte-qrcode';
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: TypedSupabaseClient;
			getSession: () => Promise<import('@supabase/supabase-js').Session | null>;
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
	}
}

export {};
