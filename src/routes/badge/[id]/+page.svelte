<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import ProfileItemList from '$lib/components/ProfileItemList.svelte';
	import ProfileItemListSkeleton from '$lib/components/ProfileItemListSkeleton.svelte';
	import type { PageData } from './$types';
	import { BADGE_PLACEHOLDER_URL } from '../../../const';

	export let data: PageData;

	$: ({ badge, profilesForBadge } = data);
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url="/mypass" />
</section>

<div class="flex h-screen flex-col">
	{#await badge then badge}
		<div id="badge-container" class="flex flex-col items-center justify-center space-y-4 py-6">
			<div class="avatar w-48" id="badge">
				<div class="w-full rounded-full shadow-lg ring ring-neutral ring-offset-base-100">
					<img
						src={badge.image !== '' ? badge.image : BADGE_PLACEHOLDER_URL}
						width="1000"
						height="1000"
						loading="lazy"
						class:p-8={!badge.image}
						class="mx-auto bg-base-100"
						alt="Badge image"
					/>
				</div>
			</div>
			<p class="text-balance text-center text-2xl font-semibold" id="badge-caption">{badge.name}</p>
			{#if badge.external_url}
				<a
					href={badge.external_url}
					class="btn btn-primary btn-lg min-w-52 rounded-full px-4 text-lg font-bold text-white shadow-lg"
					>Website</a
				>
			{/if}
		</div>
	{/await}

	<div
		class="flex w-full flex-grow flex-col rounded-3xl bg-base-100 py-4 pb-24 shadow-lg"
		id="profiles-container"
	>
		<p class="p-8 text-center text-4xl font-bold tracking-tight text-secondary">
			People with this badge
		</p>
		<div class="flex-grow space-y-4">
			{#await profilesForBadge}
				<ProfileItemListSkeleton />
			{:then profiles}
				<ProfileItemList {profiles}></ProfileItemList>
			{/await}
			<p class="text-center text-lg">
				That's everyone! Ask more fans to add their badge to their holopass.
			</p>
		</div>
	</div>
</div>
