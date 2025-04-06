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

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// in this context pass is another user's "profile"
	// and profile is the current user's profile
	let { pass, oshi, badges, profile, following, followers, isFollowed } = $derived(data);

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
	class="mx-4 min-h-[calc(100vh-128px)] space-y-6 pb-12 pt-4"
	transition:fade={{ delay: 0, duration: 200 }}
>

<div class="flex h-full justify-center">
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

<PassCard profile={pass} {oshi} {badges} {followers} {following} />
</div>
