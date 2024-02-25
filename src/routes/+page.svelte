<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase } = data);

	$: isLoggedIn = session !== null;

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
		}
		goto('/login');
	}
</script>

<section
	id="home-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<div class="card space-y-4 bg-slate-50 p-6 shadow-lg" id="home-card">
		<h1 class="mb-4 text-center text-5xl font-bold tracking-tight text-accent">holopass</h1>

		<a href="/mypass/edit" class="btn btn-primary rounded-full">Edit My Pass</a>

		{#if isLoggedIn}
			<button class="btn btn-secondary rounded-full" on:click={handleLogout}>Logout</button>
		{:else}
			<a href="/login" class="btn btn-secondary rounded-full">Login</a>
		{/if}

		<a href="/privacy" class="link link-secondary text-center">Privacy</a>
	</div>
</section>
