<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';

	import QR from '@svelte-put/qr/svg/QR.svelte';
	import { PROD_DOMAIN } from '../../const';
	import { Icon } from 'svelte-awesome';
	import link from 'svelte-awesome/icons/link';
	import share from 'svelte-awesome/icons/share';

	export let data: PageData;

	$: ({ profile } = data);

	$: qrCodeUrl = `${PROD_DOMAIN}/pass/${profile.id}`;

	function copyCode() {
		navigator.clipboard.writeText(qrCodeUrl);
		alert('Code copied to clipboard!');
	}

	async function shareLink() {
		const shareUrl = `${PROD_DOMAIN}/pass/${profile.id}`;
		try {
			await navigator.share({ url: shareUrl });
		} catch (e) {
			console.log(e);
		}
	}
</script>

<section
	id="qr-code-card-container"
	class="mx-4 mt-4 space-y-8 pb-36"
	transition:fade={{ delay: 0, duration: 200 }}
>
	<div
		class="card flex min-h-[80svh] justify-center rounded-3xl bg-white p-6 shadow-lg"
		id="qr-card"
	>
		<p class="text-center text-4xl font-semibold tracking-tight text-accent">{profile.nickname}</p>

		<div class="relative mx-auto h-72 w-72">
			<video
				id="qr-code-video-bg"
				class="absolute left-0 top-0 h-full w-full rounded-2xl"
				muted
				autoplay
				playsinline
				loop
				poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQAAAAA3iMLMAAAAAXNSR0IArs4c6QAAAA5JREFUeNpj+P+fgRQEAP1OH+HeyHWXAAAAAElFTkSuQmCC"
				src="data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw"
			>
			</video>
			<QR data={qrCodeUrl} margin={4} class="absolute left-0 top-0 block" />
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
