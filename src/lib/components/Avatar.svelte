<script lang="ts">
	export let avatarURL = '';
</script>

<div class="avatar m-4">
	<div class="w-full rounded-full ring ring-accent ring-offset-2 ring-offset-base-100">
		<img src={avatarURL} alt="My avatar" />
	</div>
</div>
