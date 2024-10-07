<script lang="ts">
	import { fade } from 'svelte/transition';

	import Icon from 'svelte-awesome';
	import errorIcon from 'svelte-awesome/icons/exclamationTriangle';
	import successIcon from 'svelte-awesome/icons/checkCircle';

	import { geolocation } from '@sveu/browser';
	import BackButton from '$lib/components/BackButton.svelte';
	import type {
		CheckInPostRequestBody,
		CheckInPostResponseBody
	} from '../../../api/check-in/+server';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const { supported, coords, locatedAt, error, resume, pause } = geolocation();

	let data: CheckInPostResponseBody | null = null;

	async function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	async function tryCheckin() {
		resume();
		await wait(100);
		if (!$supported) {
			pause();
			errMsg = 'This browser does not support geolocation. Please use another browser!';
			data = { error: errMsg };
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
			data = { error: errMsg };
			pause();
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

		data = await res.json();

		switch (res.status) {
			case 200:
				// alert("Check-in locations fetched successfully!");
				console.log(data);
				break;
			default:
				errMsg = 'An error occurred while fetching check-in locations. Please try again later!';
				if (!data?.error) {
					data = { error: errMsg };
				}
				break;
		}
		pause();
	}

	onMount(() => {
		// small delay to allow geolocation stores to update
		setTimeout(async () => {
			if ($supported) {
				await tryCheckin();
			}
		}, 100);
	});
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
			<div class="py-2" />
			{#if data}
				{#if data.error}
					<div class="card flex-row place-content-center bg-red-600 p-2 text-center text-white">
						<div class="align-center">
							<Icon data={errorIcon} scale={1.2}></Icon>
						</div>
						<div class="px-2" />
						{data.error.endsWith('.') ? data.error : `${data.error}.`}
					</div>
				{:else}
					<div class="card flex-row place-content-center bg-green-600 p-2 text-center text-white">
						<div class="align-center">
							<Icon data={successIcon} scale={1.2}></Icon>
						</div>
						<div class="px-2" />
						Successfully checked in!
					</div>
				{/if}
			{:else}
				<div class="text-center">Loading...</div>
			{/if}
		</section>
	</div>
</div>
