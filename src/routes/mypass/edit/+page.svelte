<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fly, fade } from 'svelte/transition';

	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageData } from './$types';

	export let form;
	export let data: PageData;

	let { session, supabase, profile, badges, talents } = data;
	$: ({ session, supabase, profile, badges, talents } = data);

	$: console.log(profile, form);

	let profileForm: HTMLFormElement;
	let loading = false;
	let nickname: string = profile?.nickname ?? '';
	let avatarURL: string = profile?.avatar_url ?? '';
	let location: string = profile?.location ?? '';
	let bio: string = profile?.bio ?? '';
	let badgeIds: string[] = profile?.badge_ids ?? [];
	let oshiIds: string[] = profile?.talent_ids ?? [];

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async () => {
			loading = false;
		};
	};
</script>

{#if form?.success}
	<div
		role="alert"
		class="alert alert-info m-4 flex w-auto flex-row justify-center justify-items-center gap-2"
		transition:fly={{ duration: 300, y: -100 }}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Pass updated!</span>
	</div>
{/if}

<section
	id="basic-info"
	class="space-y-4 p-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<section id="header" class="space-y-2">
		<h2 class="text-center text-4xl font-semibold tracking-tight">Setup your Pass</h2>
		<div class="mx-auto max-w-40">
			<Avatar {avatarURL} />
		</div>
	</section>

	<section id="profile-details">
		<h3 class="text-2xl">Basic Info</h3>
		<form method="post" class="space-y-4" bind:this={profileForm}>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">What is your nickname?</span>
				</div>
				<input
					type="text"
					name="nickname"
					id="nickname"
					class="input input-bordered input-primary w-full max-w-xs"
					value={form?.nickname ?? nickname}
				/>
				<div class="label">
					<span class="label-text-alt">*Required</span>
				</div>
			</label>

			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Where are you from?</span>
				</div>
				<input
					type="text"
					name="location"
					id="location"
					class="input input-bordered input-secondary w-full max-w-xs"
					value={form?.location ?? location}
				/>
				<div class="label">
					<span class="label-text-alt">Optional</span>
				</div>
			</label>

			<label class="form-control">
				<div class="label">
					<span class="label-text">About you</span>
				</div>
				<textarea
					name="bio"
					id="bio"
					class="textarea textarea-bordered textarea-secondary h-24"
					placeholder="Bio"
					value={form?.bio ?? bio}
				></textarea>
				<div class="label">
					<span class="label-text-alt">Optional</span>
				</div>
			</label>

			<section id="badges">
				<h3 class="text-2xl">Badges</h3>
				<div class="form-control">
					{#each badges as badge}
						<label class="label cursor-pointer">
							<span class="label-text">{badge.name}</span>
							<input
								type="checkbox"
								class="checkbox-accent checkbox"
								checked={badgeIds?.includes(badge.id)}
								id={badge.id}
								name="badge-{badge.id}"
							/>
						</label>
					{/each}
				</div>
			</section>

			<section id="talents">
				<h3 class="text-2xl">Oshi</h3>
				<div class="form-control">
					{#each talents as talent}
						<label class="label cursor-pointer">
							<span class="label-text">{talent.fanmark} {talent.name_en}</span>
							<input
								type="checkbox"
								class="checkbox-accent checkbox"
								checked={oshiIds?.includes(talent.id)}
								id={talent.id}
								name="talent-{talent.id}"
							/>
						</label>
					{/each}
				</div>
			</section>

			<button type="submit" class="btn btn-primary my-2 w-full rounded-full text-xl"
				>{loading ? 'Saving...' : 'Save'}</button
			>
		</form>
	</section>
</section>
