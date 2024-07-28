<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import type { PageData } from '../$types';
	import { BADGE_PLACEHOLDER_URL } from '../../../const';

	export let data: PageData;

	$: ({ badge } = data);
</script>

<section class="bg-neutral-50 p-4">
	<BackButton url="/mypass" />
</section>
<div class="flex h-screen flex-col items-center justify-center space-y-4 py-4">
	<div class="avatar w-48">
		<div class="w-full rounded-full ring ring-neutral ring-offset-base-100">
			<img
				src={badge.image ?? BADGE_PLACEHOLDER_URL}
				width="1000"
				height="1000"
				loading="lazy"
				class:p-4={badge.image === BADGE_PLACEHOLDER_URL}
				alt="badge-pic"
			/>
		</div>
	</div>

	<p class="text-balance text-center text-2xl font-semibold" id="badge-caption">{badge.name}</p>
</div>
