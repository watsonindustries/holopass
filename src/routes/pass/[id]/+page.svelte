<script lang="ts">
	import { fade } from 'svelte/transition';
	import PassCard from '$lib/components/PassCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ pass, oshi, badges } = data);
</script>

<div
	id="my-pass-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<PassCard profile={pass} {oshi} {badges} />
</div>
