<script lang="ts">
	import { htmlifyLinks } from '../../html';

	interface Props {
		bio?: string;
	}

	let { bio = 'None' }: Props = $props();
</script>

<section id="bio" class="space-y-4 p-4">
	<p class="text-sm uppercase">Bio</p>
	<p class="whitespace-pre-line text-lg">
		{@html htmlifyLinks(bio)}
	</p>
</section>
