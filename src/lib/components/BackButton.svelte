<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import arrowLeft from 'svelte-awesome/icons/arrowLeft';

	interface Props {
		url?: string;
	}

	let { url = '/' }: Props = $props();
</script>

<a
	id="back-button"
	href={url}
	class="btn btn-accent min-w-fit rounded-full px-4 text-lg text-white shadow-sm"
	data-sveltekit-reload
>
	<Icon data={arrowLeft} />
	Back</a
>
