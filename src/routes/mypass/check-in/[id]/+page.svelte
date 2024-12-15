<script lang="ts">
	import { fade } from 'svelte/transition';

	import Icon from 'svelte-awesome';
	import errorIcon from 'svelte-awesome/icons/exclamationTriangle';
	import successIcon from 'svelte-awesome/icons/checkCircle';
	import infoIcon from 'svelte-awesome/icons/infoCircle';

	import { geolocation } from '@sveu/browser';
	import BackButton from '$lib/components/BackButton.svelte';
	import type {
		CheckInPostRequestBody,
		CheckInPostResponseBody
	} from '../../../api/check-in/+server';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import PopupStatusCard from '$lib/components/PopupStatusCard.svelte';

	const { supported, coords, locatedAt, error } = geolocation();

	let data: CheckInPostResponseBody | null = $state(null);
	let status: number | null = $state(null);

	async function tryCheckin() {
		if (!$supported) {
			errMsg = 'This browser does not support geolocation. Please use another browser!';
			data = { error: errMsg };
			status = 400;
			return;
		}
		if ($error) {
			var errMsg = '';
			switch ($error.code) {
				case $error.PERMISSION_DENIED:
					errMsg = 'You must allow location access to check in!';
					status = 409;
					break;
				case $error.POSITION_UNAVAILABLE:
					errMsg = 'Location information is unavailable. Please try again later!';
					status = 400;
					break;
				case $error.TIMEOUT:
					errMsg = 'The request to get location timed out. Please try again later!';
					status = 400;
					break;
				default:
					errMsg =
						'An unknown error occurred while trying to get your location. Please try again later!';
					status = 400;
					break;
			}
			data = { error: errMsg };
			return;
		}

		// make API call to fetch possible check-in locations
		const res = await fetch('/api/check-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: $page.params.id,
				loc: [$coords.latitude, $coords.longitude]
			} as CheckInPostRequestBody)
		});

		status = res.status;
		data = await res.json();

		switch (res.status) {
			case 200:
				// alert("Check-in locations fetched successfully!");
				// console.log(data);
				break;
			default:
				errMsg = 'An error occurred while fetching check-in locations. Please try again later!';
				if (!data?.error) {
					data = { error: errMsg };
				}
				break;
		}
	}

	onMount(() => {
		// small delay to allow geolocation stores to update
		setTimeout(async () => {
			if ($supported) {
				await tryCheckin();
			}
		}, 100);
	});

	const bgInfo = 'bg-[#389BF2]';
	const bgError = 'bg-[#ff0000]';
	const bgSuccess = 'bg-[#16a34a]';
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url={data && data.badge ? '/mypass' : '/mypass/check-in'} />
</section>

<div
	id="check-in-container"
	class="min-h-[calc(100vh-128px)] space-y-6 p-4"
	transition:fade={{ delay: 0, duration: 500 }}
>
	<div id="check-in-card" class="card bg-slate-50 p-4 shadow-lg">
		<section class="flex flex-col p-4">
			<h1 class="text-2xl"><b>Check In</b></h1>
			<div class="py-2"></div>
			{#if data}
				{#if data.error}
					{#if status === 409}
						<PopupStatusCard icon={infoIcon} color={bgInfo} text_color="white">
							<p>{data.error.endsWith('.') ? data.error : `${data.error}.`}</p>
						</PopupStatusCard>
					{:else}
						<PopupStatusCard icon={errorIcon} color={bgError} text_color="white">
							<p>{data.error.endsWith('.') ? data.error : `${data.error}.`}</p>
						</PopupStatusCard>
					{/if}
				{:else}
					<PopupStatusCard icon={successIcon} color={bgSuccess} text_color="white">
						<p>Successfully checked in!</p>
					</PopupStatusCard>
				{/if}
			{:else}
				<div class="text-center">Loading...</div>
			{/if}
		</section>
	</div>
</div>
