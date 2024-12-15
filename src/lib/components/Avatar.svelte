<script lang="ts">
	const fallbackImg = 'https://cdn.discordapp.com/embed/avatars/1.png';

	interface Props {
		avatarURL?: string;
	}

	let { avatarURL = '' }: Props = $props();
</script>

<div class="avatar m-4">
	<div class="w-full rounded-full ring ring-accent ring-offset-2 ring-offset-base-100">
		<img
			src={avatarURL}
			alt="My avatar"
			width="128"
			height="128"
			loading="eager"
			onerror={() => (avatarURL = fallbackImg)}
		/>
	</div>
</div>
