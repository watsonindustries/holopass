<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import plus from 'svelte-awesome/icons/plus';
	import check from 'svelte-awesome/icons/check';
	import { fade } from 'svelte/transition';

	interface Props {
		clickCallback: () => void;
		isFollowed?: boolean;
	}

	let { clickCallback, isFollowed = false }: Props = $props();
</script>

{#if isFollowed}
	<button
		class="btn btn-secondary min-w-fit rounded-full px-4 text-lg text-white shadow-lg"
		in:fade
	>
		<Icon data={check} />
		Following
	</button>
{:else}
	<button
		class="btn btn-primary min-w-fit rounded-full px-4 text-lg text-white shadow-lg"
		onclick={clickCallback}
		in:fade
	>
		<Icon data={plus} />
		Follow
	</button>
{/if}
