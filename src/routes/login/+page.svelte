<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome';

	import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';

	export let data: PageData;
</script>

<section
	id="home-container"
	class="mx-4 mt-4 space-y-6 pb-36"
	transition:fade={{ delay: 150, duration: 200 }}
>
	<div
		class="card mx-auto mt-[40vh] flex items-center space-y-4 bg-slate-50 p-6 shadow-lg"
		id="signin-card"
	>
		<div class="card-body items-center space-y-4">
			<h2 class="card-title text-4xl font-bold tracking-tight text-secondary">Sign In</h2>
			<div class="card-actions justify-end">
				<form class="" id="social-login" method="post">
					<button
						formaction="?/login&provider=discord"
						class="btn rounded-full bg-[#5865F2] text-white"
					>
						<Icon data={faDiscord} scale={1.2} />
						Login with Discord
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
