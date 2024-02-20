<script lang="ts">
	import type { PageData } from './$types';
	import Avatar from '$lib/components/Avatar.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let nickname = 'unknown';
	let avatarURL = '';
	let location = 'none';
	let bio = '';
	let oshi = [] as { fanmark: string }[];
	let badges = [] as { name: string }[];

	onMount(async () => {
		const { user } = data.session || {};
		console.log(user);
		// hydrate the user info in the pass
		nickname = user?.user_metadata.nickname;
		avatarURL = user?.user_metadata.avatar_url;
		bio = user?.user_metadata.bio;
		location = user?.user_metadata.location;

		badges = data.badges;
		oshi = data.oshi;
	});
</script>

<div id="my-pass-container" class="pb-36">
	<div class="card m-4 bg-slate-50 p-6 shadow-lg">
		<section id="my-info" class="flex">
			<section class="w-1/3 flex-1" id="profile-pic">
				<Avatar {avatarURL} />
				<p class="mb-4 text-center align-middle">holopass</p>
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
					<p class="text-2xl">{oshi.map((oshi) => oshi.fanmark).join(' ')}</p>
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
</div>
