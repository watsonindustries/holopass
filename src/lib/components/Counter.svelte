<script lang="ts">
	interface Props {
		count?: number;
		url?: string;
		text?: string;
	}

	let { count = 0, url = '#', text = '' }: Props = $props();
</script>

<a class="flex flex-col items-center font-medium text-slate-800" href={url}>
	<span class="text-2xl">{count}</span>
	{text}
</a>
