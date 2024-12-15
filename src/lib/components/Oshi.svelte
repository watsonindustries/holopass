<script lang="ts">
	import type { Tables } from '$lib/database.types';

	interface Props {
		oshi: Promise<Tables<'talents'>> | any;
	}

	let { oshi }: Props = $props();
</script>

<span class="tooltip cursor-pointer" data-tip={oshi.name_en}>
	{oshi.fanmark}
</span>
