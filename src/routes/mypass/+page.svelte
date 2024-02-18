<script lang="ts">
	import type { PageData } from './$types';

	import Badge from '$lib/components/Badge.svelte';
	import { onMount } from 'svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data: PageData;

	let nickname = 'unknown';
	let avatarURL = '';
	let location = 'Vienna, Austria';
	let oshis = ['🔎', '🐔', '👁️‍🗨️'];
	let bio = `👋 Hi, I'm DaniruKun. I'm a software engineer and I love to build things. I'm also a big fan of Hololive and I love to watch anime. Also enjoy photography and going to cons around the world.`;
	let badges = [
		'Connect the World 2023',
		'stage1 2024',
		'stage2 2024',
		'stage3 2024',
		'honeyworks 2024'
	];

	onMount(async () => {
		const { user } = data.session || {};
		console.log(user);
		// hydrate the user info in the pass
		nickname = user?.user_metadata.full_name;
		avatarURL = user?.user_metadata.avatar_url;
		bio = user?.user_metadata.bio;
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
					<p class="text-2xl">{oshis.join(' ')}</p>
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
				{#each badges as badge}
					<Badge name={badge} />
				{/each}
			</div>
		</section>
	</div>
</div>
