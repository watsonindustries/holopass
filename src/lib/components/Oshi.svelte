<script lang="ts">
	import type { Tables } from '$lib/database.types';

	export let oshi: Promise<Tables<'talents'>> | any;
</script>

<span class="tooltip cursor-pointer" data-tip={oshi.name_en}>
	{oshi.fanmark}
</span>

