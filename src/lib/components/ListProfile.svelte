<script lang="ts">
	import type { Tables } from '$lib/database.types';

	export let profile: Tables<'profiles'>;
</script>

<a class="flex items-center gap-3" href="/pass/{profile.id}" data-sveltekit-reload>
	<div class="avatar">
		<div class="h-12 w-12 rounded-full ring ring-primary">
			<img src={profile.avatar_url} alt="Avatar" />
		</div>
	</div>
	<div>
		<div class="font-semibold">{profile.nickname}</div>
		<div class="text-sm opacity-50">{profile.location || ''}</div>
	</div>
</a>
