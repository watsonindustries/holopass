<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
		}
		goto('/login');
	}
</script>

<h1 class="mb-4 text-4xl font-bold tracking-tight">Welcome to holopass</h1>

<a href="/mypass" class="btn btn-primary rounded-full">My Pass</a>
<a href="/mypass/edit" class="btn btn-primary rounded-full">Edit profile</a>
<a href="/login" class="btn btn-primary rounded-full">Login</a>
<button class="btn btn-primary rounded-full" on:click={handleLogout}>Logout</button>
