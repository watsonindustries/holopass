<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import * as inapp_notifications from '$lib/stores/inapp_notifications';
	import { store as iapStore } from '$lib/stores/inapp_notifications';
	import Toast from '$lib/components/Toast.svelte';

	export let data: LayoutData;

	let { supabase, session, pathname } = data;
	$: ({ supabase, session, pathname } = data);

	// Handle Responsive Navigation
	let windowWidth: number;
  	let activeIndex = 0;
  	let position: string;
  	let positionMobile = "bottom";

	const MIN_MOBILE_WIDTH = 768;
  	$: position = windowWidth <= MIN_MOBILE_WIDTH ? positionMobile : "left";

	function handleResize() {
    	windowWidth = window.innerWidth;

    	console.log("Window width: ", windowWidth);
  	}

	onMount(() => {
		if (typeof window !== "undefined") {
      		// Set initial window width
      		windowWidth = window.innerWidth;

      		// Add resize event listener
      		window.addEventListener("resize", handleResize);
    	}

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

	onDestroy(() => {
    	// Remove resize event listener when component is destroyed
    	if (typeof window !== "undefined") {
      		window.removeEventListener("resize", handleResize);
    	}
  	});

	$: isHomePage = pathname === '/';
</script>

<svelte:head>
	<title>holopass</title>
</svelte:head>

<div
	class="bg-gradient-to-r from-secondary/25 to-accent/25 xl:mx-auto"
>
	{#if position == "left"}
		<SideNav {pathname} />
	{/if}

	<div class="p-4 sm:ml-64">
		<slot />
	</div>
	<div class="stack mx-auto">
		{#if $iapStore && $iapStore.length > 0}
			{#each $iapStore as notification}
				<Toast message={notification.message} />
			{/each}
		{/if}
	</div>
	{#if !isHomePage}
		{#if position == "bottom"}
			<BottomNav {pathname} />
		{/if}
	{/if}
</div>
