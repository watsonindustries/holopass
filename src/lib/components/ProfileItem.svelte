<script lang="ts">
	export let id: string | number;
	export let avatar_url: string;
	export let nickname: string;
	export let location: string;
</script>

<a class="flex items-center gap-3" href="/pass/{id}" data-sveltekit-reload>
	<div class="avatar">
		<div class="h-12 w-12 rounded-full ring ring-primary">
			<img src={avatar_url} alt="Avatar" loading="lazy" />
		</div>
	</div>
	<div>
		<div class="font-semibold">{nickname}</div>
		<div class="text-sm opacity-50">{location || ''}</div>
	</div>
</a>
