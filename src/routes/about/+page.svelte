<script lang="ts">
	import { version } from '$app/environment';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let { supabase } = data;
	$: ({ supabase } = data);

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
		}
		goto('/');
	}
</script>

<section class="p-4" transition:fade={{ duration: 300, delay: 100 }}>
	<h1 class="text-4xl font-bold tracking-tight">About</h1>
	<p>
		holopass app
		<br />
		build version: {version}
	</p>

	<h2 class="text-2xl font-bold tracking-tight">Credits</h2>
	<p>Project lead: <a href="https://danirukun.com" class="link link-accent">@danirukun</a></p>
	<p>Alpha testers: Kaigainiki server members</p>
	<p>Artist: <a href="https://twitter.com/CaptainMeowHere" class="link link-accent">@captainmeow</a></p>

	<h2 class="text-2xl font-bold tracking-tight">Support</h2>
	<a href="https://discord.gg/VRMWrDb8" class="link link-accent">Discord</a>
	<a href="https://github.com/watsonindustries/holopass" class="link link-accent">GitHub</a>

	<h2 class="text-2xl font-bold tracking-tight">Privacy</h2>
	<a href="/privacy" class="link link-accent">Privacy Policy</a>

	<h2 class="text-2xl font-bold tracking-tight">Disclaimer</h2>
	<p>
		This is purely a fan project and not official in anyway. This project is done within the rules
		of the <a href="https://hololivepro.com/en/terms/" class="link link-secondary"
			>COVER Corp fan work guidelines</a
		> .
	</p>

	<br />
	<button class="btn btn-secondary rounded-full" on:click={handleLogout}>Logout</button>
</section>
