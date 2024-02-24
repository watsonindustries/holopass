<script lang="ts">
	import Icon from 'svelte-awesome';
	import home from 'svelte-awesome/icons/home';
	import user from 'svelte-awesome/icons/user';

	export let pathname = '/';
</script>

<div class="btm-nav text-info xl:mx-auto xl:max-w-xl">
	<a class:active={pathname === '/'} href="/">
		<Icon data={home} scale={1.5} />
		<span class="btm-nav-label">Home</span>
	</a>
	<a class:active={pathname === '/mypass'} href="/mypass">
		<Icon data={user} scale={1.5} />
		<span class="btm-nav-label">My Pass</span>
	</a>
	<a class:active={pathname === '/about'} href="/about">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
			/>
		</svg>
		<span class="btm-nav-label">About</span>
	</a>
</div>
