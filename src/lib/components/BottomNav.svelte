<script lang="ts">
	import Icon from 'svelte-awesome';
	import qrcode from 'svelte-awesome/icons/qrcode';

	export let pathname = '/';
</script>

<div class="btm-nav bg-slate-200 text-info xl:mx-auto xl:max-w-xl">
	<a class:active={pathname.includes('/mypass')} href="/mypass" data-sveltekit-reload>
		<svg width="28" height="28" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_156_3)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10 8C10 5.79087 11.7909 4 14 4H41C43.2091 4 45 5.79086 45 8V46.3235C45 48.5327 43.2091 50.3235 41 50.3235H14C11.7909 50.3235 10 48.5327 10 46.3235V8ZM35.2899 18.1707C36.7541 18.9105 36.7541 21.0013 35.2899 21.741L23.1959 27.8507C21.8657 28.5227 20.2941 27.5559 20.2941 26.0655L20.2941 13.8463C20.2941 12.3559 21.8657 11.3891 23.1959 12.0611L35.2899 18.1707ZM19.2353 40.0294C18.683 40.0294 18.2353 40.4771 18.2353 41.0294V44.1765C18.2353 44.7288 18.683 45.1765 19.2353 45.1765H36.7941C37.3464 45.1765 37.7941 44.7288 37.7941 44.1765V41.0294C37.7941 40.4771 37.3464 40.0294 36.7941 40.0294H19.2353Z"
					fill="currentColor"
				/>
			</g>
		</svg>
		<span class="btm-nav-label">My Pass</span>
	</a>
	<a class:active={pathname === '/qr'} href="/qr">
		<Icon data={qrcode} scale={1.5} />
		<span class="btm-nav-label">Connect</span>
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
