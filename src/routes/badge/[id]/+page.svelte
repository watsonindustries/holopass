<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import ProfileItemList from '$lib/components/ProfileItemList.svelte';
	import ProfileItemListSkeleton from '$lib/components/ProfileItemListSkeleton.svelte';
	import type { PageData } from './$types';
	import { BADGE_PLACEHOLDER_URL } from '../../../const';

	export let data: PageData;

	$: ({ badge, profilesForBadge } = data);

	let image: string;

	$: {
		badge?.then((b) => {
			image = b.image ?? BADGE_PLACEHOLDER_URL;
		});
	}
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url="/mypass" />
</section>

<div class="flex min-h-[calc(100vh-128px)] flex-col">
	{#await badge}
		<p>Loading...</p>
	{:then badge}
		{#if badge}
			<div id="badge-container" class="flex flex-col items-center justify-center space-y-4 py-6">
				<div class="avatar w-48" id="badge">
					<div class="w-full rounded-full shadow-lg ring ring-neutral ring-offset-base-100">
						<img
							src={image}
							width="1000"
							height="1000"
							loading="lazy"
							class:p-8={image === BADGE_PLACEHOLDER_URL}
							class="mx-auto bg-base-100"
							alt="Badge icon"
						/>
					</div>
				</div>
				<p class="text-balance text-center text-2xl font-semibold" id="badge-caption">
					{badge.name}
				</p>
				<a
					href={badge.external_url}
					class="btn btn-primary btn-lg min-w-52 rounded-full px-4 text-lg font-bold text-white shadow-lg"
					>Website</a
				>
			</div>
			<div class="flex flex-col grow h-full w-full rounded-t-3xl bg-base-100 py-4 pb-10 shadow-lg">
				<p class="p-8 text-center text-4xl font-bold tracking-tight text-secondary">
					People with this badge
				</p>
				{#await profilesForBadge}
					<ProfileItemListSkeleton />
				{:then profiles}
					<ProfileItemList {profiles}></ProfileItemList>
				{/await}
			</div>
		{:else}
			<p>Badge not found</p>
		{/if}
	{/await}
</div>
