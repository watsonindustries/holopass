<script lang="ts">
	import { BADGE_PLACEHOLDER_URL } from '../../const';

	export let name: string;
	export let image = BADGE_PLACEHOLDER_URL;
</script>

<div class="flex min-h-36 w-full flex-col items-center justify-center space-y-4 py-4">
	<div class="avatar w-24">
		<div class="w-full rounded-full ring ring-neutral ring-offset-base-100">
			<img
				src={image ?? BADGE_PLACEHOLDER_URL}
				width="1000"
				height="1000"
				loading="lazy"
				class:p-4={image === BADGE_PLACEHOLDER_URL}
				alt="badge-pic"
			/>
		</div>
	</div>

	<p class="text-balance text-center font-semibold" id="badge-caption">{name}</p>
</div>
