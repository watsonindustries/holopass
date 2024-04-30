<script lang="ts">
	import ListProfile from '$lib/components/ListProfile.svelte';
	import type { PageData } from './$types';
	import { Icon } from 'svelte-awesome';
	import arrowLeft from 'svelte-awesome/icons/arrowLeft';

	export let data: PageData;

	$: ({ followers, following, type, pass } = data);

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
		href={`/pass/${pass?.id}`}
		class="btn btn-accent min-w-fit rounded-full px-4 text-lg text-white shadow-sm"
		data-sveltekit-reload
	>
		<Icon data={arrowLeft} />
		Back</a
	>
</section>

<div class="mb-14 space-y-4 overflow-x-auto" id="following-profiles">
	<h1 class="mx-4 text-4xl font-semibold tracking-tight">
		{type.charAt(0).toUpperCase() + type.slice(1)}
	</h1>

	{#if type === 'following'}
		{#await following}
			<div class="flex w-full flex-col gap-4 p-4">
				<div class="skeleton h-32 w-full"></div>
				<div class="skeleton h-4 w-28"></div>
				<div class="skeleton h-4 w-full"></div>
				<div class="skeleton h-4 w-full"></div>
			</div>
		{:then following}
			<table class="table">
				<tbody>
					{#each following.follows as follow}
						<tr>
							<td>
								<ListProfile profile={follow.profiles} />
							</td>
							<td>
								<!-- <span class="badge badge-ghost badge-sm"></span> -->
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/await}
	{:else if type === 'followers'}
		{#await followers}
			<div class="flex w-full flex-col gap-4 p-4">
				<div class="skeleton h-32 w-full"></div>
				<div class="skeleton h-4 w-28"></div>
				<div class="skeleton h-4 w-full"></div>
				<div class="skeleton h-4 w-full"></div>
			</div>
		{:then followers}
			<table class="table">
				<tbody>
					{#each followers.followers as follower}
						<tr>
							<td>
								<ListProfile profile={follower.profiles} />
							</td>
							<td>
								<!-- <span class="badge badge-ghost badge-sm"></span> -->
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/await}
	{/if}
</div>
