<script lang="ts">
	import type { PageData } from './$types';

	import Badge from '$lib/components/Badge.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: ({ supabase } = data);

	let nickname = 'danirukun';
	let avatarURL = 'https://github.com/danirukun.png';
	let location = 'Vienna, Austria';
	let oshis = ['🔎', '🐔', '👁️‍🗨️'];
	let bio = `👋 Hi, I'm DaniruKun. I'm a software engineer and I love to build things. I'm also a big fan of Hololive and I love to watch anime. Also enjoy photography and going to cons around the world.`;
	let badges = ['Connect the World', 'Holofes 2024'];

	onMount(async () => {
		const { data: sbData, error } = await supabase.auth.getUser();
		console.log(sbData.user, error);
	});
</script>

<div class="card m-4 bg-slate-50 p-6 shadow-lg">
	<section id="my-info" class="h-screen/2 flex">
		<section class="w-1/3 flex-1" id="profile-pic">
			<div class="avatar m-4">
				<div class="w-full rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
					<img src={avatarURL} alt="My avatar" />
				</div>
			</div>
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
