<script lang="ts">
	interface Props {
		loginRoute?: string;
	}

	let { loginRoute = '/login' }: Props = $props();
</script>

<a
	href={loginRoute}
	class="btn btn-primary btn-md min-w-52 rounded-full px-4 text-lg font-bold text-white shadow-lg"
	>Open holopass</a
>
