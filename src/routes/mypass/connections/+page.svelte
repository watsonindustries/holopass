<script lang="ts">
	import type { PageData } from './$types';
	import { Icon } from 'svelte-awesome';
	import arrowLeft from 'svelte-awesome/icons/arrowLeft';

	export let data: PageData;

	$: ({ followingProfiles } = data);

	function randomDefaultPlace() {
		const places = [
			'usual room',
			"yagoo's office",
			'detective bureau',
			'Makuhari Messe',
			'Menya Botan',
			"Shiori's archives",
			"Haato's kitchen"
		];
		return places[Math.floor(Math.random() * places.length)];
	}
</script>

<section class="m-4 mb-4">
	<a
		href="/mypass"
		class="btn btn-accent min-w-fit rounded-full px-4 text-lg text-white shadow-sm"
		data-sveltekit-reload
	>
		<Icon data={arrowLeft} />
		Back</a
	>
</section>

<div class="space-y-4 overflow-x-auto" id="following-profiles">
	<h1 class="mx-4 text-4xl font-semibold tracking-tight">Following</h1>

	{#await followingProfiles}
		<div class="flex w-full flex-col gap-4 p-4">
			<div class="skeleton h-32 w-full"></div>
			<div class="skeleton h-4 w-28"></div>
			<div class="skeleton h-4 w-full"></div>
			<div class="skeleton h-4 w-full"></div>
		</div>
	{:then followingProfiles}
		<table class="table">
			<tbody>
				{#each followingProfiles as profile}
					<tr>
						<td>
							<a class="flex items-center gap-3" href="/pass/{profile.id}" data-sveltekit-reload>
								<div class="avatar">
									<div class="h-12 w-12 rounded-full ring ring-primary">
										<img src={profile.avatar_url} alt="Avatar" />
									</div>
								</div>
								<div>
									<div class="font-semibold">{profile.nickname}</div>
									<div class="text-sm opacity-50">{profile.location || randomDefaultPlace()}</div>
								</div>
							</a>
						</td>
						<td>
							<!-- <span class="badge badge-ghost badge-sm"></span> -->
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/await}
</div>
