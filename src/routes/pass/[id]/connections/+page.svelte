<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import ProfileItemList from '$lib/components/ProfileItemList.svelte';
	import ProfileItemListSkeleton from '$lib/components/ProfileItemListSkeleton.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { followers, following, type, pass, profile } = $derived(data);
	let self_id = $derived(profile?.id);
</script>

<section class="bg-base-100 p-4">
	<BackButton url={`/pass/${pass?.id}`} />
</section>

<div class="mx-2 flex min-h-[calc(100vh-128px)] flex-col md:mx-4">
	<div
		id="following-profiles"
		class="mt-4 h-full w-full grow rounded-t-3xl bg-base-100 px-2 pb-10 shadow-lg md:px-4"
	>
		<h1 class="mx-4 py-4 text-4xl font-semibold tracking-tight">
			{type.charAt(0).toUpperCase() + type.slice(1)}
		</h1>

		{#if type === 'following'}
			{#await following}
				<ProfileItemListSkeleton />
			{:then following}
				<ProfileItemList {self_id} profiles={following?.follows.map((p) => p.profiles)} />
			{/await}
		{:else if type === 'followers'}
			{#await followers}
				<ProfileItemListSkeleton />
			{:then followers}
				<ProfileItemList {self_id} profiles={followers?.followers.map((p) => p.profiles)} />
			{/await}
		{/if}
	</div>
</div>
