<script lang="ts">

	interface Props {
		form: any;
		optional?: boolean;
		fieldName?: string;
		label: string;
		fallbackValue?: string;
	}

	let {
		form,
		optional = false,
		fieldName = '',
		label,
		fallbackValue = ''
	}: Props = $props();
</script>

<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<input
		type="text"
		name={fieldName}
		id={fieldName}
		class="input input-bordered {optional ? 'input-secondary' : 'input-primary'} w-full max-w-xs"
		value={form?.[fieldName] || fallbackValue}
	/>
	{#if form?.errors?.[fieldName]}
		<span class="px-1 py-2 text-error">{form?.errors?.[fieldName][0]}</span>
	{/if}
	<div class="label">
		<span class="label-text-alt">{optional ? 'Optional' : '*Required'}</span>
	</div>
</label>
