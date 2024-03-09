<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageData } from './$types';
	import type { Talent } from '../../../custom';

	export let form;
	export let data: PageData;

	let { session, supabase, profile, badges, talents } = data;
	$: ({ session, supabase, profile, badges, talents } = data);

	// group talents by generation
	const generations = (talents as Talent[]).reduce((acc: any, talent: Talent) => {
		if (!acc[talent.gen]) {
			acc[talent.gen] = [];
		}
		acc[talent.gen].push(talent);
		return acc;
	}, {}) as { [key: string]: Talent[] };

	let profileForm: HTMLFormElement;
	let loading = false;
	let nickname: string = profile?.nickname ?? '';
	let nicknameJP: string = profile?.nickname_jp ?? '';
	let avatarURL: string = profile?.avatar_url ?? '';
	let location: string = profile?.location ?? '';
	let bio: string = profile?.bio ?? '';
	let badgeIds: number[] = profile?.badge_ids ?? [];
	let oshiIds: number[] = profile?.talent_ids ?? [];
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

<section id="basic-info" class="space-y-4 p-6 pb-36" transition:fade={{ delay: 0, duration: 200 }}>
	<section id="header" class="space-y-2">
		<div class="mx-auto max-w-40">
			<Avatar {avatarURL} />
		</div>
	</section>

	<section id="profile-details">
		<h3 class="text-2xl">Basic Info</h3>
		<form method="post" class="space-y-4" bind:this={profileForm}>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Nickname</span>
				</div>
				<input
					type="text"
					name="nickname"
					id="nickname"
					class="input input-bordered input-primary w-full max-w-xs"
					value={form?.nickname ?? nickname}
				/>
				{#if form?.errors?.nickname}
					<span class="px-1 py-2 text-error">{form?.errors?.nickname[0]}</span>
				{/if}
				<div class="label">
					<span class="label-text-alt">*Required</span>
				</div>
			</label>

			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Name JP / 名前</span>
				</div>
				<input
					type="text"
					name="nickname_jp"
					id="nickname_jp"
					class="input input-bordered input-secondary w-full max-w-xs"
					value={form?.nickname_jp ?? nicknameJP}
				/>
				{#if form?.errors?.nickname_jp}
					<span class="px-1 py-2 text-error">{form?.errors?.nickname_jp[0]}</span>
				{/if}
				<div class="label">
					<span class="label-text-alt">Optional</span>
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
				{#if form?.errors?.location}
					<span class="px-1 py-2 text-error">{form?.errors?.location[0]}</span>
				{/if}
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
				{#if form?.errors?.bio}
					<span class="px-1 py-2 text-error">{form?.errors?.bio[0]}</span>
				{/if}
				<div class="label">
					<span class="label-text-alt">Optional</span>
				</div>
			</label>

			<section id="badges" class="space-y-2">
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

			<section id="talents" class="space-y-2">
				<h3 class="text-2xl">Oshi</h3>
				<div class="form-control gap-4">
					{#each Object.entries(generations) as [gen, ts]}
						<details class="collapse collapse-arrow border border-accent bg-base-100">
							<summary class="collapse-title text-lg font-medium">{gen}</summary>
							<div class="collapse-content">
								{#each ts as talent}
									<label class="label cursor-pointer">
										<span class="label-text">{talent.fanmark} {talent.name_en}</span>
										<input
											type="checkbox"
											class="checkbox-accent checkbox"
											checked={oshiIds?.includes(talent.id)}
											id={talent.id.toString()}
											name="talent-{talent.id}"
										/>
									</label>
								{/each}
							</div>
						</details>
					{/each}
				</div>
			</section>

			<div class="flex items-center">
				<button
					type="submit"
					class="btn btn-primary mx-auto my-2 w-44 rounded-full text-xl text-white shadow-lg"
					>{@html loading
						? '<span class="loading loading-spinner"></span> Saving...'
						: 'Save'}</button
				>
			</div>
		</form>
	</section>
</section>
