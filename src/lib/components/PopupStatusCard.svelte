<script lang="ts">
	import Icon from 'svelte-awesome';
	import type { IconType } from 'svelte-awesome/components/Icon.svelte';

	interface Props {
		icon: IconType;
		color: string;
		text_color: string;
		children?: import('svelte').Snippet;
	}

	let {
		icon,
		color,
		text_color,
		children
	}: Props = $props();
</script>

<div class={`card flex-row ${color} p-2 text-${text_color} place-content-center text-center`}>
	<div class="align-center">
		<Icon data={icon} scale={1.2}></Icon>
	</div>
	<div class="px-2"></div>
	{@render children?.()}
</div>
