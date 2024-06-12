<script lang="ts">
	import { fade } from 'svelte/transition';

	import { MetaTags } from 'svelte-meta-tags';

	import PassCard from '$lib/components/PassCard.svelte';
	import FollowButton from '$lib/components/FollowButton.svelte';

	import type { PageData } from './$types';
	import type { Tables } from '$lib/database.types';
	import { invalidateAll } from '$app/navigation';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import { profileRedirectURL } from '../../../profiles';

	export let data: PageData;

	// in this context pass is another user's "profile"
	// and profile is the current user's profile
	$: ({ pass, oshi, badges, profile, following, followers, isFollowed } = data);

	async function handleFollow(profile: Tables<'profiles'>, pass: Tables<'profiles'>) {
		const resp = await fetch(`/pass/${pass?.id}/follow`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ profile })
		});
		if (resp.ok) {
			invalidateAll();
		} else {
			console.error('Failed to follow user with status:', resp.status);
		}
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
	class="mx-4 space-y-6 pb-36 pt-4"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<PassCard profile={pass} {oshi} {badges} {followers} {following} />

	<div class="flex justify-center">
		{#if profile && pass}
			<FollowButton
				{isFollowed}
				clickCallback={() => profile && pass && handleFollow(profile, pass)}
			/>
		{:else}
			<div class="flex flex-col gap-4">
				<p class="text-center text-2xl font-semibold tracking-tight text-secondary">
					Login or Signup to follow
				</p>
				<LoginButton
					loginRoute={`/login?redirectAfterLoginURL=${profileRedirectURL(pass?.id || '')}`}
				/>
			</div>
		{/if}
	</div>
</div>
