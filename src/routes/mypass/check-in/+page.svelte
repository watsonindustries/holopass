<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import errorIcon from 'svelte-awesome/icons/exclamationTriangle';
	import infoIcon from 'svelte-awesome/icons/infoCircle';

	import { geolocation } from '@sveu/browser';
	import type {
		CheckInStartPostRequestBody,
		CheckInStartPostResponseBody
	} from '../../api/check-in/start/+server';
	import type { BadgesGetResponseBody } from '../../api/badges/+server';

	import BackButton from '$lib/components/BackButton.svelte';
	import CheckInBadgeButton from '$lib/components/CheckInBadgeButton.svelte';
	import PopupStatusCard from '$lib/components/PopupStatusCard.svelte';

	// note: Stores must be declared at the top level of the component (this may change in a future version of Svelte)
	const { supported, coords, locatedAt, error, resume, pause } = geolocation();

	let geolocFetched = false;
	let nearbyEventData: CheckInStartPostResponseBody | null = null;

	async function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	async function tryStartCheckIn() {
		resume();
		await wait(100);
		if (!$supported) {
			pause();
			errMsg = 'This browser does not support geolocation. Please use another browser!';
			nearbyEventData = { error: errMsg };
			return;
		}
		if ($error) {
			var errMsg = '';
			switch ($error.code) {
				case $error.PERMISSION_DENIED:
					errMsg = 'You must allow location access to check in!';
					break;
				case $error.POSITION_UNAVAILABLE:
					errMsg = 'Location information is unavailable. Please try again later!';
					break;
				case $error.TIMEOUT:
					errMsg = 'The request to get location timed out. Please try again later!';
					break;
				default:
					errMsg =
						'An unknown error occurred while trying to get your location. Please try again later!';
					break;
			}
			nearbyEventData = { error: errMsg };
			pause();
			return;
		}

		// make API call to fetch possible check-in locations
		const res = await fetch('/api/check-in/start', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				loc: [$coords.latitude, $coords.longitude]
			} as CheckInStartPostRequestBody)
		});

		nearbyEventData = await res.json();

		switch (res.status) {
			case 200:
				// alert("Check-in locations fetched successfully!");
				console.log(nearbyEventData);
				break;
			default:
				errMsg = 'An error occurred while fetching check-in locations. Please try again later!';
				if (!nearbyEventData?.error) {
					nearbyEventData = { error: errMsg };
				}
				break;
		}
		pause();
	}

	async function fetchBadges(badgeIds: number[]): Promise<BadgesGetResponseBody> {
		console.log('fetching badges:', badgeIds);
		const idParams = badgeIds.map((id) => `id=${id}`).join('&');
		const res = await fetch(`/api/badges?${idParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return await res.json();
	}

	onMount(() => {
		// small delay to allow geolocation stores to update
		setTimeout(async () => {
			if ($supported) {
				await tryStartCheckIn();
				geolocFetched = true;
			}
		}, 100);
	});

	onDestroy(() => {
		pause();
	});
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url="/mypass" />
</section>

<div
	id="check-in-container"
	class="min-h-[calc(100vh-128px)] space-y-6 p-4"
	transition:fade={{ delay: 0, duration: 500 }}
>
	<div id="check-in-card" class="card bg-slate-50 p-4 shadow-lg">
		<section class="flex flex-col p-4">
			<h1 class="text-2xl"><b>Check In</b></h1>
			<div class="py-2" />
			{#if geolocFetched}
				{#if $supported}
					<div class="align-center">
						{#if nearbyEventData}
							{#if nearbyEventData.error}
								<PopupStatusCard icon={infoIcon} color="red" text_color="white">
									{nearbyEventData.error?.endsWith('.') || nearbyEventData.error?.endsWith('!')
										? nearbyEventData.error
										: `${nearbyEventData.error}.`}
								</PopupStatusCard>
							{:else if nearbyEventData.badges}
								{#await fetchBadges(nearbyEventData.badges.map((loc) => loc.id))}
									<div class="text-center">Loading...</div>
								{:then badgeData}
									{#if badgeData}
										{#if badgeData.error}
											<PopupStatusCard icon={errorIcon} color="red" text_color="white">
												Failed to fetch events: {badgeData.error?.endsWith('.') ||
												badgeData.error?.endsWith('!')
													? badgeData.error
													: `${badgeData.error}.`}
											</PopupStatusCard>
										{:else if badgeData.badges}
											<div class="text-lg">
												Looking to check in for an event badge? We found the following events near
												you happening now!
											</div>
											<div class="p-2" />
											<div class="text-lg"><b>Select an event below:</b></div>
											{#each badgeData.badges as loc}
												<CheckInBadgeButton data={loc} />
											{/each}
										{:else}
											<PopupStatusCard icon={infoIcon} color="blue" text_color="white">
												<p>No events found.</p>
											</PopupStatusCard>
										{/if}
									{/if}
								{/await}
							{:else}
								<PopupStatusCard icon={infoIcon} color="blue" text_color="white">
									<p>No nearby locations found.</p>
								</PopupStatusCard>
							{/if}
						{:else}
							<PopupStatusCard icon={infoIcon} color="blue" text_color="white">
								<p>No nearby locations found.</p>
							</PopupStatusCard>
						{/if}
					</div>
				{:else}
					<PopupStatusCard  icon={errorIcon} color="red" text_color="white">
						This browser does not support geolocation. Please use another browser!
					</PopupStatusCard>
				{/if}
			{:else}
				<div class="text-center">Checking your location...</div>
			{/if}
		</section>
	</div>
</div>
