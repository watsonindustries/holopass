<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	import { MetaTags } from 'svelte-meta-tags';

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

<MetaTags
	title="holopass - home"
	description="holopass app home"
	openGraph={{
		url: 'https://holo-pass.com',
		title: 'holopass',
		description: 'holopass - connect with fans at events!',
		siteName: 'holo-pass'
	}}
/>

<section
	id="home-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<div class="card space-y-4 bg-slate-50 p-6 shadow-lg" id="home-card">
		<h1 class="mb-4 text-center text-5xl font-bold tracking-tight text-accent">holopass</h1>

		<a href="/mypass/edit" class="btn btn-primary rounded-full">My Pass</a>

		{#if isLoggedIn}
			<button class="btn btn-secondary rounded-full" on:click={handleLogout}>Logout</button>
		{:else}
			<a href="/login" class="btn btn-secondary rounded-full">Login</a>
		{/if}

		<a href="/privacy" class="link link-accent text-center">Privacy</a>
	</div>
</section>
