<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from 'svelte-awesome';
	import link from 'svelte-awesome/icons/link';
	import edit from 'svelte-awesome/icons/edit';
	import calendarCheckO from 'svelte-awesome/icons/calendarCheckO';

	import { geolocation } from '@sveu/browser';

	import PassCard from '$lib/components/PassCard.svelte';
	import { PROD_DOMAIN } from '../../const';
	import { goto } from '$app/navigation';
	import type {
		CheckInStartPostRequestBody,
		CheckInStartPostResponseBody
	} from '../api/check-in/start/+server';

	export let data: PageData;

	let { profile, badges, oshi, following, followers } = data;

	$: ({ session, supabase, profile, badges, oshi, following, followers } = data);

	// note: Stores must be declared at the top level of the component (this may change in a future version of Svelte)
	const { supported, coords, locatedAt, error, resume, pause } = geolocation();

	function handleCopyLink() {
		const link = `${PROD_DOMAIN}/pass/${profile?.id}`;
		navigator.clipboard.writeText(link);
		alert('Pass link copied to clipboard!');
	}

	async function handleCheckIn() {
		resume();
		if (!$supported) {
			alert('This browser does not support geolocation. Please use another browser!');
			pause();
			return;
		}
		if ($error) {
			var errMsg = "";
			switch ($error.code) {
				case $error.PERMISSION_DENIED:
					errMsg = "You must allow location access to check in!";
					break;
				case $error.POSITION_UNAVAILABLE:
					errMsg = "Location information is unavailable. Please try again later!";
					break;
				case $error.TIMEOUT:
					errMsg = "The request to get location timed out. Please try again later!";
					break;
			}
			alert(errMsg);
			pause();
			return;
		}

		// make API call to fetch possible check-in locations
		const res = await fetch("/api/check-in/start", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				loc: [$coords.latitude, $coords.longitude],
			} as CheckInStartPostRequestBody),
		});

		console.log("coords:", JSON.stringify($coords));
		
		const data: CheckInStartPostResponseBody = await res.json();

		switch (res.status) {
			case 200:
				alert("Check-in locations fetched successfully!");
				console.log(data);
				break;
			default:
				alert(data.error ?? "An error occurred while fetching check-in locations. Please try again later!");
				break;
		}
		pause();
	}

	onMount(() => {
		const redirectAfterLoginURL = sessionStorage.getItem('redirectAfterLoginURL');
		if (redirectAfterLoginURL) {
			sessionStorage.removeItem('redirectAfterLoginURL');
			goto(redirectAfterLoginURL);
		}
	});
</script>

<div
	id="my-pass-container"
	class="mx-4 space-y-6 pb-36 pt-4"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<PassCard {profile} {oshi} {badges} {following} {followers} myPass />

	<section class="mx-auto flex w-full flex-col sm:flex-row justify-center gap-4">
		<a
			href="/mypass/edit"
			class="btn btn-primary basis-0 grow w-full rounded-full text-lg font-medium shadow-lg"
		>
			<Icon data={edit} scale={1.2}></Icon> Edit
		</a>

		<button
			class="btn btn-secondary basis-0 grow w-full rounded-full text-lg font-medium shadow-lg"
			on:click={handleCopyLink}><Icon data={link} scale={1.2}></Icon> Copy Link</button
		>

		<button
			class="btn btn-secondary basis-0 grow w-full rounded-full text-lg font-medium shadow-lg"
			on:click={null}><Icon data={calendarCheckO} scale={1.2}></Icon> Check In</button
		>
	</section>
</div>
