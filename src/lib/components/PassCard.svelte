<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Bio from '$lib/components/Bio.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import type { Tables } from '$lib/database.types';
	import { htmlifyLinks } from '../../html';
	import * as profiles from '../../profiles';
	import Oshi from './Oshi.svelte';
	import {profileRedirectURL} from "../../profiles";
	import LoginButton from "$lib/components/LoginButton.svelte";
	import FollowButton from "$lib/components/FollowButton.svelte";
	import {invalidateAll} from "$app/navigation";

	export let profile: Tables<'profiles'>;
	export let pass: Tables<'profiles'>;
	export let oshi: Promise<Tables<'talents'>[]>;
	export let badges: Promise<Tables<'badges'>[]>;
	export let isFollowed: boolean;
	export let myPass: boolean;
	export let following: Promise<{ following: Tables<'profiles'>[]; count: number }> = {
		following: [],
		count: 0
	};
	export let followers: Promise<{ followers: Tables<'profiles'>[]; count: number }> = {
		followers: [],
		count: 0
	};

	if (!pass) pass = profile;

	let nickname = pass.nickname ?? '';
	let nicknameJP = pass.nickname_jp ?? '';
	$: avatarURL = pass.avatar_url ?? '';
	let location = pass.location ?? '';
	let bio = pass.bio ?? '';
	let favStream = pass.fav_stream ?? '';

	async function handleFollow(profile: Tables<'profiles'>, pass: Tables<'profiles'>) {
		const resp = await fetch(`/pass/${pass?.id}/follow`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ profile })
		});
		if (resp.ok) {
			invalidateAll();
		} else {
			console.error('Failed to follow user with status:', resp.status);
		}
	}
</script>

<div
	class={profiles.isDaniru(pass.id)
		? 'card bg-gradient-to-br from-primary/50 to-secondary/50 p-4 shadow-2xl shadow-primary/60'
		: 'card bg-slate-50 p-4 shadow-lg'}
	id="pass-card"
>
	<section id="pass-info" class="flex">
		<section class="w-3/5 flex-1" id="profile-pic">
			<Avatar {avatarURL} />
			<p class="mb-4 text-center align-middle text-slate-600">holopass</p>
			{#if !myPass}
				<div class="flex justify-center">
					{#if profile && pass}
						<FollowButton
								{isFollowed}
								clickCallback={() => profile && pass && handleFollow(profile, pass)}
						/>
					{:else}
						<div class="flex flex-col gap-4">
							<p class="text-center text-2xl font-semibold tracking-tight text-secondary">
								Login or Signup to follow
							</p>
							<LoginButton
									loginRoute={`/login?redirectAfterLoginURL=${profileRedirectURL(pass?.id || '')}`}
							/>
						</div>
					{/if}
				</div>
			{/if}
		</section>

		<section class="flex-2 w-2/3 space-y-4 p-4">
			<div id="nickname">
				<p class="text-sm uppercase">Nickname</p>
				<p class="text-2xl">{nickname}</p>
				{#if nicknameJP}
					<p class="text-2xl">{nicknameJP}</p>
				{/if}
			</div>

			{#if location}
				<div id="location">
					<p class="text-sm uppercase">Location</p>
					<p class="text-lg">{location ? location : 'None'}</p>
				</div>
			{/if}

			<div id="oshi">
				<p class="text-sm uppercase">Oshi</p>

				{#await oshi}
					<div class="skeleton h-4 w-full"></div>
				{:then oshi}
					{#if oshi.length === 0}
						<p>None</p>
					{:else}
						<div class="space-x-1 text-lg" id="oshi-container">
							{#each oshi as o}
								<Oshi oshi={o} />
							{/each}
						</div>
					{/if}
				{/await}
			</div>
		</section>
	</section>

	<section class="flex flex-row place-content-evenly p-4" id="connections">
		{#await following then { count }}
			<Counter {count} url={`/pass/${pass.id}/connections?type=following`} text="Following" />
		{/await}

		{#await followers then { count }}
			<Counter {count} url={`/pass/${pass.id}/connections?type=followers`} text="Followers" />
		{/await}
	</section>

	<Bio {bio} />

	{#if favStream}
		<section id="favstream" class="space-y-4 p-4">
			<p class="text-sm uppercase">Favorite stream</p>
			<p class="whitespace-pre-line text-wrap text-xl">
				{@html htmlifyLinks(favStream)}
			</p>
		</section>
	{/if}

	<section id="badges" class="space-y-4 p-4">
		<p class="text-sm uppercase">badges</p>
		<div class="grid grid-cols-2 gap-4">
			{#await badges}
				<div class="skeleton h-64 w-full"></div>
				<div class="skeleton h-64 w-full"></div>
				<div class="skeleton h-64 w-full"></div>
				<div class="skeleton h-64 w-full"></div>
			{:then badges}
				{#each badges as { id, name, image }}
					<Badge name={name || ''} image={image ? image : undefined} {id} />
				{:else}
					<p>None</p>
				{/each}
			{/await}
		</div>
	</section>
</div>
