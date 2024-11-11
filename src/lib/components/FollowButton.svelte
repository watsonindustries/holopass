<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import plus from 'svelte-awesome/icons/plus';
	import check from 'svelte-awesome/icons/check';
	import { fade } from 'svelte/transition';

	export let clickCallback: () => void;
	export let isFollowed: boolean = false;
</script>

{#if isFollowed}
	<button
		class="btn btn-secondary min-w-fit rounded-full px-4 text-sm text-white shadow-lg"
		in:fade
	>
		<Icon data={check} />
		Following
	</button>
{:else}
	<button
		class="btn btn-primary min-w-fit rounded-full px-4 text-sm text-white shadow-lg"
		on:click={clickCallback}
		in:fade
	>
		<Icon data={plus} />
		Follow
	</button>
{/if}
