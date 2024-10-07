<script lang="ts">
	import { browser } from '$app/environment';

	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	dayjs.extend(advancedFormat);
	dayjs.extend(localizedFormat);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { Map, Marker, Popup, TileLayer, Control, ControlScale } from 'sveaflet?client';
	import Icon from 'svelte-awesome';
	import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

	import BackButton from '$lib/components/BackButton.svelte';
	import ProfileItemList from '$lib/components/ProfileItemList.svelte';
	import ProfileItemListSkeleton from '$lib/components/ProfileItemListSkeleton.svelte';
	import type { PageData } from './$types';
	import { BADGE_PLACEHOLDER_URL } from '../../../const';

	export let data: PageData;

	$: ({ badge, badgeLocation, profilesForBadge } = data);

	let image: string;
	let loc: [number, number] | null = null;

	$: {
		badge?.then((b) => {
			image = b.image ?? BADGE_PLACEHOLDER_URL;
		});
		badgeLocation?.then((arr) => {
			if (!arr || arr.length === 0) {
				return;
			}
			let l = arr[0];
			loc = [l.lat, l.long];
		});
	}

	let map: any;
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url="/mypass" />
</section>

<div class="mx-2 flex min-h-[calc(100vh-128px)] flex-col md:mx-4">
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
				<p class="text-md hyphens-none text-center" id="badge-description">
					{dayjs(badge.event_start).format('LLLL z')} &mdash; {dayjs(badge.event_end).format(
						'LLLL z'
					)}
				</p>
				<a
					href={badge.external_url}
					class="btn btn-primary btn-lg min-w-52 rounded-full px-4 text-lg font-bold text-white shadow-lg"
					>Website</a
				>
				{#if loc && browser}
					<div class="z-[0] h-[500px] w-full md:max-w-[96vw] lg:max-w-[90vw]">
						<Map
							options={{
								center: loc,
								zoom: 10
							}}
							bind:instance={map}
						>
							<Control options={{ position: 'topleft' }}>
								<!--recenter map button-->
								<button
									class="btn btn-sm w-[34px] rounded-[4px] border-2 border-[#00000044] bg-white px-1 text-lg font-bold text-black shadow-md hover:bg-gray-200 active:bg-sky-300"
									on:click={() => {
										map.flyTo(loc, 10);
									}}
								>
									<Icon data={faLocationCrosshairs} scale={1.2} />
								</button>
							</Control>
							<ControlScale />
							<TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
							<Marker latLng={loc}>
								<Popup>
									{badge.name}
								</Popup>
							</Marker>
						</Map>
					</div>
				{/if}
			</div>
			<div
				class="flex h-full w-full grow flex-col rounded-t-3xl bg-base-100 px-2 py-4 pb-10 shadow-lg md:px-4"
			>
				<p class="p-8 text-center text-2xl font-bold tracking-tight text-secondary md:text-4xl">
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
