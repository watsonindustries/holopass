<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import ProfileItemList from '$lib/components/ProfileItemList.svelte';
	import ProfileItemListSkeleton from '$lib/components/ProfileItemListSkeleton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ followers, following, type, pass } = data);
</script>

<section class="bg-base-100 p-4">
	<BackButton url={`/pass/${pass?.id}`} />
</section>

<div class="flex min-h-[calc(100vh-128px)] mx-2 md:mx-4 flex-col">
	<div
		id="following-profiles"
		class="grow mt-4 px-2 md:px-4 pb-10 h-full w-full rounded-t-3xl bg-base-100 shadow-lg"
	>
		<h1 class="mx-4 py-4 text-4xl font-semibold tracking-tight">
			{type.charAt(0).toUpperCase() + type.slice(1)}
		</h1>

		{#if type === 'following'}
			{#await following}
				<ProfileItemListSkeleton />
			{:then following}
				<ProfileItemList profiles={following?.follows.map((p) => p.profiles)} />
			{/await}
		{:else if type === 'followers'}
			{#await followers}
				<ProfileItemListSkeleton />
			{:then followers}
				<ProfileItemList profiles={followers?.followers.map((p) => p.profiles)} />
			{/await}
		{/if}
	</div>
</div>