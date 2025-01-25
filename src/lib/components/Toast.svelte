<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		message: string;
	}

	let { message }: Props = $props();
</script>

<div class="toast toast-start toast-top">
	<div class="alert alert-info w-fit shadow-lg" transition:fade>
		<div class="place-content-center text-center text-lg text-white">
			<span>{message}</span>
		</div>
	</div>
</div>
