<script lang="ts">
	export let count = 0;
	export let url = '#';
	export let text = '';
</script>

<a class="flex flex-col items-center font-medium text-slate-800" href={url}>
	<span class="text-2xl">{count}</span>
	{text}
</a>
