<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import plus from 'svelte-awesome/icons/plus';
	import check from 'svelte-awesome/icons/check';

	export let clickCallback: () => void;
	export let isFollowed: boolean = false;
</script>

{#if isFollowed}
	<button
		class="btn btn-secondary min-w-fit rounded-full px-4 text-lg text-white shadow-lg"
		on:click={clickCallback}
	>
		<Icon data={check} />
		Following
	</button>
{:else}
	<button
		class="btn btn-primary min-w-fit rounded-full px-4 text-lg text-white shadow-lg"
		on:click={clickCallback}
	>
		<Icon data={plus} />
		Follow
	</button>
{/if}
