<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import BottomNav from '$lib/components/BottomNav.svelte';

	export let data: LayoutData;

	let { supabase, session, pathname } = data;
	$: ({ supabase, session, pathname } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>holopass</title>
</svelte:head>

<div class="xl:mx-auto xl:max-w-xl">
	<slot />
	{#if pathname !== '/'}
		<BottomNav {pathname} />
	{/if}
</div>
