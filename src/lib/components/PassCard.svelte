<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import type { Oshi } from '../../custom';

	export let profile;
	export let oshi: Oshi[];
	export let badges: Badge[] = [];

	let nickname: string = profile?.nickname ?? '';
	let avatarURL: string = profile?.avatar_url ?? '';
	let location: string = profile?.location ?? '';
	let bio: string = profile?.bio ?? '';
	let oshis: { fanmark: string }[] = oshi ?? [];
</script>

<div class="card bg-slate-50 p-6 shadow-lg" id="pass-card">
	<section id="pass-info" class="flex">
		<section class="w-1/3 flex-1" id="profile-pic">
			<Avatar {avatarURL} />
			<p class="mb-4 text-center align-middle text-slate-600">holopass</p>
		</section>

		<section class="flex-2 w-2/3 space-y-4 p-4">
			<div id="nickname">
				<p class="text-sm uppercase">Nickname</p>
				<p class="text-2xl">{nickname}</p>
			</div>

			<div id="location">
				<p class="text-sm uppercase">Location</p>
				<p class="text-2xl">{location}</p>
			</div>

			<div id="oshi">
				<p class="text-sm uppercase">Oshi</p>
				{#if oshis.length === 0}
					<p class="text-2xl">None</p>
				{:else if oshis.length > 1}
					<p class="text-2xl">{oshis.map((oshi) => oshi.fanmark).join(' ')}</p>
				{:else}
					<p class="text-2xl">{oshi[0].fanmark}</p>
				{/if}
			</div>
		</section>
	</section>

	<section id="bio" class="space-y-4 bg-slate-50 p-4">
		<p class="text-sm uppercase">Bio</p>
		<p class="text-xl">
			{bio}
		</p>
	</section>

	<section id="badges" class="space-y-4 p-4">
		<p class="text-sm uppercase">badges</p>
		<div class="space-y-8">
			{#each badges as { name }}
				<Badge {name} />
			{/each}
		</div>
	</section>
</div>