<script lang="ts">
	import { fade } from 'svelte/transition';

	export let message: string;
</script>

<div class="toast toast-top toast-start">
	<div class="alert alert-info w-fit shadow-lg" transition:fade>
		<div class="text-center place-content-center text-lg text-white">
			<span>{message}</span>
		</div>
	</div>
</div>
