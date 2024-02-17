<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="card mx-auto mt-[40vh] flex w-96 items-center bg-slate-50 shadow-xl">
	<div class="card-body items-center space-y-4">
		<h2 class="card-title text-2xl">Sign In</h2>
		<div class="card-actions justify-end">
			<form class="" id="social-login" method="post">
				<button formaction="?/login&provider=discord" class="btn btn-primary rounded-full"
					>Discord</button
				>
			</form>
		</div>
	</div>
</div>
