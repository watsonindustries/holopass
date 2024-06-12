<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	import QR from '@svelte-put/qr/svg/QR.svelte';
	import { PROD_DOMAIN } from '../../const';
	import { Icon } from 'svelte-awesome';
	import link from 'svelte-awesome/icons/link';
	import share from 'svelte-awesome/icons/share';
	import SuperWhite from '$lib/components/SuperWhite.svelte';

	export let data: PageData;

	$: ({ profile } = data);

	$: encodedNickname = encodeURIComponent(profile.nickname);
	$: qrCodeUrl = `${PROD_DOMAIN}/pass/${encodedNickname}`;

	async function copyCode() {
		await navigator.clipboard.writeText(qrCodeUrl);
		alert('Code copied to clipboard!');
	}

	async function shareLink() {
		try {
			await navigator.share({ url: qrCodeUrl });
		} catch (e) {
			console.log(e);
		}
	}
</script>

<section
	id="qr-code-card-container"
	class="mx-4 h-screen space-y-8 pt-4"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<div
		class="card flex min-h-[80svh] justify-center rounded-3xl bg-white p-6 shadow-lg"
		id="qr-card"
	>
		<p class="text-center text-4xl font-semibold tracking-tight text-accent">{profile.nickname}</p>

		<div class="relative mx-auto h-72 w-72">
			<SuperWhite class="absolute left-0 top-0 h-full w-full rounded-2xl">
				<QR data={qrCodeUrl} margin={4} class="absolute left-0 top-0 block" />
			</SuperWhite>
		</div>

		<p class="text-center text-xl font-semibold tracking-tight text-accent">
			Show or send this <br /> QR code to others
		</p>

		<section class="mx-auto mt-auto flex w-44 flex-col items-center gap-4">
			<button
				class="btn btn-primary w-full rounded-full text-lg font-medium shadow-lg"
				on:click={copyCode}
			>
				<Icon data={link} scale={1.2}></Icon> Copy Link
			</button>

			<button
				class="btn btn-secondary w-full rounded-full text-lg font-medium shadow-lg"
				on:click={shareLink}
			>
				<Icon data={share} scale={1.2}></Icon> Share Link
			</button>
		</section>
	</div>
</section>
