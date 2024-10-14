<script lang="ts">
	import type { PageData } from './$types';

	import Icon from 'svelte-awesome';
	import link from 'svelte-awesome/icons/link';
	import edit from 'svelte-awesome/icons/edit';

	import { fade } from 'svelte/transition';
	import PassCard from '$lib/components/PassCard.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { profileURLFromNickname } from '../../profiles';

	export let data: PageData;

	let { profile, badges, oshi, following, followers } = data;

	$: ({ session, supabase, profile, badges, oshi, following, followers } = data);

	function handleCopyLink() {
		const link = profileURLFromNickname(profile?.nickname || '');
		navigator.clipboard.writeText(link);
		alert('Pass link copied to clipboard!');
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

	<section class="mx-auto flex w-44 flex-col items-center gap-4">
		<a href="/mypass/edit" class="btn btn-primary w-full rounded-full text-lg font-medium shadow-lg"
			><Icon data={edit} scale={1.2}></Icon> Edit</a
		>

		<button
			class="btn btn-secondary w-full rounded-full text-lg font-medium shadow-lg"
			on:click={handleCopyLink}><Icon data={link} scale={1.2}></Icon> Copy Link</button
		>
	</section>
</div>
