<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import type { Tables } from '$lib/database.types';

	export let myPass = false;
	export let profile: Tables<'profiles'> | any;
	export let oshi: Promise<Tables<'talents'>[]> | any;
	export let badges: Promise<Tables<'badges'>[]> | any;
	export let following: Promise<{ following: Tables<'profiles'>[]; count: number }> = {
		following: [],
		count: 0
	};
	export let followers: Promise<{ followers: Tables<'profiles'>[]; count: number }> = {
		followers: [],
		count: 0
	};

	let nickname: string = profile?.nickname ?? '';
	$: avatarURL = profile?.avatar_url ?? '';
	let location: string = profile?.location ?? '';
	let bio: string = profile?.bio ?? '';
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
				<p class="text-2xl">{location ? location : 'None'}</p>
			</div>

			<div id="oshi">
				<p class="text-sm uppercase">Oshi</p>

				{#await oshi}
					<div class="skeleton h-4 w-full"></div>
				{:then oshi}
					{#if oshi && oshi.length === 1}
						<p class="text-2xl">{oshi[0].fanmark}</p>
					{:else if oshi && oshi.length > 1}
						<p class="text-2xl">{oshi.map((val) => val.fanmark).join(' ')}</p>
					{:else}
						<p class="text-2xl">None</p>
					{/if}
				{/await}
			</div>
		</section>
	</section>

	{#if myPass}
		<section class="flex flex-row place-content-evenly p-4" id="connections">
			{#await following then { count }}
				<a
					class="flex flex-col items-center font-medium text-slate-800"
					href="/mypass/connections?type=following"
				>
					<span class="text-2xl">{count}</span>
					Following
				</a>
			{/await}

			{#await followers then { count }}
				<a
					class="flex flex-col items-center font-medium text-slate-800"
					href="/mypass/connections?type=followers"
				>
					<span class="text-2xl">{count}</span>
					Followers
				</a>
			{/await}
		</section>
	{/if}

	<section id="bio" class="space-y-4 bg-slate-50 p-4">
		<p class="text-sm uppercase">Bio</p>
		<p class="whitespace-pre-line text-xl">
			{bio}
		</p>
	</section>

	<section id="badges" class="space-y-4 p-4">
		<p class="text-sm uppercase">badges</p>
		<div class="space-y-8">
			{#await badges}
				<p class="animate-pulse">Loading...</p>
			{:then badges}
				{#if badges && badges.length > 0}
					{#each badges as { name }}
						<Badge name={name || ''} />
					{/each}
				{:else}
					<p>None</p>
				{/if}
			{/await}
		</div>
	</section>
</div>
