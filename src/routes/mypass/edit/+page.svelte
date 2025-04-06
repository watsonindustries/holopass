<script lang="ts">
	import { fade } from 'svelte/transition';

	import Avatar from '$lib/components/Avatar.svelte';
	import type { ActionData, PageData } from './$types';
	import type { Talent } from '../../../custom';
	import FormTextInput from '$lib/components/FormTextInput.svelte';

	interface Props {
		form: ActionData;
		data: PageData;
	}

	let { form, data }: Props = $props();

	let { profile, badges, talents } = $derived(data);

	let generations = $state<Record<string, Talent[]>>({});
	let profileForm = $state<HTMLFormElement | null>(null);
	let loading = $state(false);
	let nickname = $state('');
	let nicknameJP = $state('');
	let avatarURL = $state('');
	let location = $state('');
	let bio = $state('');
	let favStream = $state('');
	let badgeIds = $state<number[]>([]);
	let oshiIds = $state<number[]>([]);

	// Update generations when talents change
	$effect(() => {
		if (talents) {
			generations = talents.reduce((acc: Record<string, Talent[]>, talent: Talent) => {
				if (!acc[talent.gen]) {
					acc[talent.gen] = [];
				}
				acc[talent.gen].push(talent);
				return acc;
			}, {} as Record<string, Talent[]>);
		}
	});

	// Update form fields when profile changes
	$effect(() => {
		if (profile) {
			nickname = profile.nickname ?? '';
			nicknameJP = profile.nickname_jp ?? '';
			avatarURL = profile.avatar_url ?? '';
			location = profile.location ?? '';
			bio = profile.bio ?? '';
			favStream = profile.fav_stream ?? '';
			badgeIds = profile.badge_ids ?? [];
			oshiIds = profile.talent_ids ?? [];
		}
	});
</script>

<section id="basic-info" class="space-y-4 p-6 pb-36" transition:fade={{ delay: 0, duration: 200 }}>
	<section id="header" class="space-y-2">
		<div class="mx-auto max-w-40">
			<Avatar {avatarURL} />
		</div>
	</section>

	<section id="profile-details">
		<h3 class="text-2xl">Basic Info</h3>
		<form method="post" class="space-y-4" bind:this={profileForm}>
			<FormTextInput
				{form}
				fieldName="nickname"
				label="Nickname / 名前（英語）"
				fallbackValue={nickname}
			/>

			<FormTextInput
				{form}
				fieldName="nickname_jp"
				label="Name JP / 名前"
				fallbackValue={nicknameJP}
				optional
			/>

			<FormTextInput
				{form}
				fieldName="location"
				label="Where are you from? / 出身"
				fallbackValue={location}
				optional
			/>

			<label class="form-control">
				<div class="label">
					<span class="label-text">About you / みんなに一言</span>
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

			<FormTextInput
				{form}
				fieldName="fav_stream"
				label="Favorite stream / 好きな配信"
				fallbackValue={favStream}
				optional
			/>

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

			{#if !form?.success && form?.errors !== undefined}
				<ul class="text-error">
					{#each Object.entries(form.errors) as [field, message]}
						<li>{field}: {message}</li>
					{/each}
				</ul>
			{/if}

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
