<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
</script>

<footer class="flex flex-col items-start justify-between bg-slate-200 md:flex-row" id="footer">
	<div class="max-w-2xl space-y-6 p-4">
		<p class="text-accent">
			<span class="text-primary">holopass</span> is a fan project and is not affiliated with hololive
			or COVER Corp.
		</p>
		<p class="text-accent">
			Send suggestions and feedback to <a href="https://x.com/danirukun">@danirukun</a>
		</p>

		<div
			id="footer-nav"
			class="flex flex-row space-x-4 divide-x-2 divide-solid divide-secondary whitespace-break-spaces"
		>
			<p class="text-accent">
				&copy; 2024 <span class="text-primary">holopass developers</span>
			</p>
			<a href="/privacy" class="px-4 text-primary">Privacy Policy</a>
			<!-- <a href="/privacy" class="text-primary px-4">Credits</a> -->
		</div>
	</div>
	<div class="flex max-w-lg flex-row space-x-4 p-4 text-center md:self-end" id="socials">
		<a id="x-link" class="flex items-center justify-center text-3xl" href="https://x.com/holopassapp"
			>𝕏</a
		>
		<a
			id="github-link"
			class="flex items-center justify-center text-3xl"
			href="https://github.com/watsonindustries/holopass"
		>
			<Icon data={faGithub} scale={1.4} />
		</a>
	</div>
</footer>
