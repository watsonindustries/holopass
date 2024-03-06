<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import * as custom from '../../custom';
	import type { Tables } from '$lib/database.types';

	export let myPass = false;
	export let profile: Tables<'profiles'>;
	export let oshi: Promise<{ data: custom.Oshi[] }> | any;
	export let badges: Promise<{ data: custom.Badge[] }> | any;
	export let followingCount: number = 0;
	export let followersAndCount: Promise<{ followers: Tables<'profiles'>[]; count: number }>;

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
					<p class="animate-pulse">Loading...</p>
				{:then oshi}
					{#if oshi && oshi.data?.length === 1}
						<p class="text-2xl">{oshi.data[0].fanmark}</p>
					{:else if oshi && oshi.data?.length > 1}
						<p class="text-2xl">{oshi.data?.map((val) => val.fanmark).join(' ')}</p>
					{:else}
						<p class="text-2xl">None</p>
					{/if}
				{/await}
			</div>
		</section>
	</section>

	{#if myPass}
		<section class="flex flex-row place-content-evenly p-4" id="connections">
			<a
				class="flex flex-col items-center font-medium text-slate-800"
				href="/mypass/connections?type=following"
			>
				<span class="text-2xl">{followingCount}</span>
				Following
			</a>

			{#await followersAndCount then { count }}
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
		<p class="text-xl whitespace-pre-line">
			{bio}
		</p>
	</section>

	<section id="badges" class="space-y-4 p-4">
		<p class="text-sm uppercase">badges</p>
		<div class="space-y-8">
			{#await badges}
				<p class="animate-pulse">Loading...</p>
			{:then badges}
				{#if badges && badges.data?.length > 0}
					{#each badges.data as { name }}
						<Badge {name} />
					{/each}
				{:else}
					<p>None</p>
				{/if}
			{/await}
		</div>
	</section>
</div>
