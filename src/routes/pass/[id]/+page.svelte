<script lang="ts">
	import { fade } from 'svelte/transition';

	import { MetaTags } from 'svelte-meta-tags';

	import PassCard from '$lib/components/PassCard.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	// in this context pass is another user's "profile"
	// and profile is the current user's profile
	$: ({ pass, oshi, badges, profile, following, followers, isFollowed } = data);
</script>

<MetaTags
	title="holopass - mypass"
	description="holopass app"
	openGraph={{
		url: 'https://holo-pass.com',
		title: 'holopass - mypass',
		description: `@${pass?.nickname} - follow me on holopass!`,
		siteName: 'holo-pass'
	}}
/>

<div
	id="my-pass-container"
	class="mx-4 space-y-6 pb-36 pt-4"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<PassCard {pass} {profile} {oshi} {badges} {followers} {following} {isFollowed} />
</div>
