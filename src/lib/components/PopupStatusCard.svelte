<script lang="ts">
	import Icon from 'svelte-awesome';
	import type { IconType } from 'svelte-awesome/components/Icon.svelte';

	export let icon: IconType;
	export let color: string;
	export let text_color: string;
</script>

<div
	class={`card flex-row bg-${color}-600 p-2 text-${text_color} place-content-center text-center`}
>
	<div class="align-center">
		<Icon data={icon} scale={1.2}></Icon>
	</div>
	<div class="px-2" />
	<slot />
</div>
