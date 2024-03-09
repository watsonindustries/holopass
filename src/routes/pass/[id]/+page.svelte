<script lang="ts">
	import { fade } from 'svelte/transition';

	import { MetaTags } from 'svelte-meta-tags';

	import PassCard from '$lib/components/PassCard.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';

	import type { PageData } from './$types';
	import type { Tables } from '$lib/database.types';

	export let data: PageData;

	// in this context pass is another user's "profile"
	// and profile is the current user's profile
	$: ({ pass, oshi, badges, profile } = data);

	async function handleFollow(profile: Tables<'profiles'>, pass: Tables<'profiles'> | undefined) {
		if (pass === null) return;
		if (pass && profile.following_ids?.includes(pass.id)) return; // already following

		const resp = await fetch(`/pass/${pass?.id}/follow`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ profile })
		});
		if (resp.ok) {
			location.reload();
		}
	}

	function isProfileFollowingPass(profile: Tables<'profiles'>, pass: Tables<'profiles'>) {
		return profile?.following_ids?.includes(pass.id);
	}
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
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<PassCard profile={pass} {oshi} {badges} />

	<div class="flex justify-center">
		{#await profile}
			<span class="loading loading-ball loading-lg text-accent"></span>
		{:then profile}
			{#if profile && pass}
				<!-- <FollowButton
					clickCallback={() => handleFollow(profile, pass)}
					isFollowed={isProfileFollowingPass(profile, pass)}
				/> -->
			{/if}
		{/await}
	</div>
</div>
