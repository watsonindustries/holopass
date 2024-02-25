<script lang="ts">
	import type { PageData } from './$types';

	import { fade } from 'svelte/transition';
	import PassCard from '$lib/components/PassCard.svelte';

	export let data: PageData;

	let { profile, badges, oshi } = data;
	$: ({ session, supabase, profile, badges, oshi } = data);
</script>

<div
	id="my-pass-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<PassCard {profile} {oshi} {badges} />

	<a href="/mypass/edit" class="btn btn-primary w-full rounded-full text-xl">Edit</a>
</div>
