<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	import QR from '@svelte-put/qr/svg/QR.svelte';
	import { PROD_DOMAIN } from '../../const';

	export let data: PageData;

	$: ({ profile } = data);

	$: qrCodeUrl = `${PROD_DOMAIN}/pass/${profile.id}`;

	function copyCode() {
		navigator.clipboard.writeText(qrCodeUrl);
		alert('Code copied to clipboard!');
	}
</script>

<section
	id="qr-code-card-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<div
		class="card flex min-h-[80svh] justify-center rounded-3xl bg-white p-6 shadow-lg"
		id="qr-card"
	>
		<p class="text-center text-4xl font-bold tracking-tight text-accent">{profile.nickname}</p>

		<QR data={qrCodeUrl} margin={4} />

		<p class="text-center text-2xl font-bold tracking-tight text-accent">My code</p>

		<button class="btn btn-primary btn-md mt-auto rounded-full text-xl" on:click={copyCode}
			>Copy code</button
		>
	</div>
</section>
