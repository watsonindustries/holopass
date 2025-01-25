<script lang="ts">
	interface Props {
		self_id: string | number | undefined;
		id: string | number;
		avatar_url: string;
		nickname: string;
		location: string;
	}

	let {
		self_id,
		id,
		avatar_url,
		nickname,
		location
	}: Props = $props();

	let profile_link = $derived(self_id && self_id === id ? '/mypass' : `/pass/${id}`);
</script>

<a class="flex items-center gap-3" href={profile_link} data-sveltekit-reload>
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
