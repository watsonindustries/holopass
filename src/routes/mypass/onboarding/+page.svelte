<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { badges: availableBadges } = data;

	let user = {
		nickname: data.userData.user?.user_metadata.full_name,
		avatarURL: data.userData.user?.user_metadata.avatar_url,
		bio: data.userData.user?.user_metadata.bio,
		location: data.userData.user?.user_metadata.location,
		badgeIds: data.userData.user?.user_metadata.badgeIds
	};

	$: console.log(user);
</script>

<section id="basic-info" class="space-y-4 p-6 pb-36">
	<section id="header" class="space-y-2">
		<h2 class="text-center text-4xl font-semibold tracking-tight">Setup your Pass</h2>
		<div class="mx-auto max-w-40">
			<Avatar avatarURL={user.avatarURL} />
		</div>
	</section>

	<section id="profile-details">
		<h3 class="text-2xl">Basic Info</h3>
		<form method="post">
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">What is your nickname?</span>
				</div>
				<input
					type="text"
					name="nickname"
					id="nickname"
					bind:value={user.nickname}
					class="input input-bordered input-primary w-full max-w-xs"
				/>
				<div class="label">
					<span class="label-text-alt">*Required</span>
				</div>
			</label>
			<br />
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Where are you from?</span>
				</div>
				<input
					type="text"
					name="location"
					id="location"
					bind:value={user.location}
					class="input input-bordered input-secondary w-full max-w-xs"
				/>
				<div class="label">
					<span class="label-text-alt">Optional</span>
				</div>
			</label>
			<br />

			<!-- <label for="oshi">Oshi</label>
            <input type="text" id="oshi" name="oshi" />
            <br /> -->

			<label class="form-control">
				<div class="label">
					<span class="label-text">About you</span>
				</div>
				<textarea
					name="bio"
					id="bio"
					class="textarea textarea-bordered textarea-secondary h-24"
					placeholder="Bio"
					bind:value={user.bio}
				></textarea>
				<div class="label">
					<span class="label-text-alt">Optional</span>
				</div>
			</label>

			<h3 class="text-2xl">Badges</h3>
			<div class="form-control">
				{#each availableBadges as badge}
					<label class="label cursor-pointer">
						<span class="label-text">{badge.name}</span>
						<input
							type="checkbox"
							class="checkbox-accent checkbox"
							checked={user.badgeIds.includes(badge.id)}
							id={badge.id}
							name="badge-{badge.id}"
						/>
					</label>
				{/each}
			</div>

			<button type="submit" class="btn btn-primary my-2 w-full rounded-full text-xl">Save</button>
		</form>
	</section>
</section>
