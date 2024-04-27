<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import * as inapp_notifications from '$lib/stores/inapp_notifications';
	import { store as iapStore } from '$lib/stores/inapp_notifications';
	import Toast from '$lib/components/Toast.svelte';

	export let data: LayoutData;

	let { supabase, session, pathname } = data;
	$: ({ supabase, session, pathname } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// payload
		// 		{
		//     "schema": "public",
		//     "table": "follows",
		//     "commit_timestamp": "2024-03-09T21:41:35.623Z",
		//     "eventType": "INSERT",
		//     "new": {
		//         "followee_id": "be0ceb30-c434-4090-ac4f-fbc08fd00eab",
		//         "follower_id": "33e4a9c6-f4f8-4c7b-acd4-8f343e1561a5"
		//     },
		//     "old": {},
		//     "errors": null
		// }

		const handleFollow = (payload: { new: { follower_id: string; followee_id: string } }) => {
			console.log('Got followed by:', payload.new.follower_id);
			inapp_notifications.addInappNotification({
				type: 'info',
				message: `You have a new follower!`
			});
		};

		const channel = supabase
			.channel('follows')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'follows',
					filter: `followee_id=eq.${session?.user.id}`
				},
				handleFollow
			)
			.subscribe();

		// FOR DEBUGGING
		// iapStore.subscribe((value) => {
		// 	console.log('inappNotifications', value);
		// });

		// window.ian = inapp_notifications;

		return () => data.subscription.unsubscribe();
	});

	$: isHomePage = pathname === '/';
</script>

<svelte:head>
	<title>holopass</title>
</svelte:head>

<div class="xl:mx-auto" class:xl:max-w-xl={!isHomePage}>
	<div class="stack mx-auto bg-red-50">
		{#if $iapStore && $iapStore.length > 0}
			{#each $iapStore as notification}
				<Toast message={notification.message} />
			{/each}
		{/if}
	</div>
	<slot />
	{#if !isHomePage}
		<BottomNav {pathname} />
	{/if}
</div>
