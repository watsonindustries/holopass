<script lang="ts">
	import { version } from '$app/environment';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { DISCORD_SERVER_INVITE_URL } from '../../const';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { supabase } = $derived(data);

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
		}
		goto('/');
	}
</script>

<section class="h-screen space-y-4 p-4" transition:fade={{ duration: 300, delay: 100 }}>
	<section id="about">
		<h1 class="text-4xl font-bold tracking-tight">About</h1>
		<p>
			holopass app
			<br />
			build version: {version}
		</p>
	</section>

	<section id="credits">
		<h2 class="text-2xl font-bold tracking-tight">Credits</h2>
		<p>Project lead: <a href="https://danirukun.com" class="link link-accent">@danirukun</a></p>
		<p>
			Developers:
			<a href="https://x.com/ithixgameplay/" class="link link-accent">IthiX</a>,
			<a href="https://x.com/moondog_94" class="link link-accent">Moondog</a>,
			<a href="https://linktr.ee/kanomeister" class="link link-accent">kanomeister</a>
		</p>
		<p>Alpha testers: Kaigainiki server members</p>
		<p>
			Artist: <a href="https://twitter.com/CaptainMeowHere" class="link link-accent">@captainmeow</a
			>
			Designer: <a href="https://x.com/elmi_hikaribi" class="link link-accent">@elmi_hikaribi</a>
		</p>
	</section>

	<section id="support">
		<h2 class="text-2xl font-bold tracking-tight">Support</h2>
		<a href={DISCORD_SERVER_INVITE_URL} class="link link-accent">Discord</a>
		<a href="https://github.com/watsonindustries/holopass/issues" class="link link-accent"
			>Issue Tracker</a
		>
	</section>

	<section id="privacy">
		<h2 class="text-2xl font-bold tracking-tight">Privacy</h2>
		<a href="/privacy" class="link link-accent">Privacy Policy</a>
	</section>

	<section id="disclaimer">
		<h2 class="text-2xl font-bold tracking-tight">Disclaimer</h2>
		<p>
			This is purely a fan project and not official in anyway. This project is done within the rules
			of the <a href="https://hololivepro.com/en/terms/" class="link link-secondary"
				>COVER Corp fan work guidelines</a
			> .
		</p>
	</section>

	<br />
	<button class="btn btn-secondary rounded-full" onclick={handleLogout}>Logout</button>
</section>
