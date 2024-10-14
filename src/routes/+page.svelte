<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	import ConnectTheFansImg from '$lib/assets/images/connect_the_fans3.png';
	import EditProfileImg from '$lib/assets/images/edit_profile.png';
	import ShareProfileImg from '$lib/assets/images/share_code_with_headturn_effect.png';
	import ScanCodeImg from '$lib/assets/images/scan_code.png';

	import { MetaTags } from 'svelte-meta-tags';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import Logo from '$lib/components/Logo.svelte';

	export let data: PageData;

	let { supabase, socialThumbImgURL } = data;
	$: ({ supabase } = data);

	onMount(() => {
		invalidateAll();
	});
</script>

<MetaTags
	title="holopass - home"
	description="holopass app home"
	openGraph={{
		url: 'https://holo-pass.com',
		title: 'holopass',
		description: 'holopass - connect with fans at events!',
		siteName: 'holo-pass',
		images: [
			{
				url: socialThumbImgURL,
				width: 700,
				height: 466,
				alt: 'HoloPass logo'
			}
		]
	}}
	twitter={{
		handle: '@danirukun',
		site: '@danirukun',
		title: 'holopass',
		description: 'holopass - connect with fans at events!',
		image: socialThumbImgURL,
		imageAlt: 'HoloPass logo',
		cardType: 'summary_large_image'
	}}
	additionalMetaTags={[
		{
			property: 'og:image:secure_url',
			content: socialThumbImgURL
		},
		{
			property: 'twitter:image:src',
			content: socialThumbImgURL
		}
	]}
/>

<section id="home-container" transition:fade={{ delay: 0, duration: 300 }}>
	<section class="bg-slate-50 py-8" id="header-hero">
		<div class="mx-auto max-w-md space-y-2 p-4">
			<Logo class="max-h-40" />
		</div>
	</section>

	<section class="hero min-h-[60dvh] bg-blue-50 py-8" id="connect-the-fans-hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<img src={ConnectTheFansImg} alt="Connect the fans" class="mx-auto" />

				<p class="py-6 text-xl font-semibold text-accent">
					Connect with fans at hololive events from around the world!
				</p>
				<LoginButton />
			</div>
		</div>
	</section>

	<section class="bg-dots-straight bg-slate-50 py-8" id="hero-how-does-it-work">
		<div class="mx-auto max-w-lg space-y-2">
			<h1 class="text-center text-8xl font-bold text-secondary">How does it work?</h1>
		</div>
	</section>

	<section class="hero min-h-[60dvh] bg-blue-50 py-4" id="fill-in-profile-hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<p class="text-6xl font-bold text-accent">
					Fill in your <span class="text-primary">pass</span> profile
				</p>
				<img src={EditProfileImg} alt="Edit profile" class="mx-auto" loading="lazy" />
			</div>
		</div>
	</section>

	<section class="hero min-h-[60dvh] bg-blue-100 py-4" id="share-profile-hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<p class="text-6xl font-bold text-accent">
					Share your pass <span class="text-primary">link</span> or
					<span class="text-primary"> QR code</span>
				</p>
				<img src={ShareProfileImg} alt="Edit profile" class="mx-auto" loading="lazy" />
			</div>
		</div>
	</section>

	<section class="hero min-h-[60dvh] bg-blue-50 py-4" id="follow-pass-hero">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<p class="text-6xl font-bold text-accent">
					<span class="text-primary">Follow</span> other fans
				</p>
				<img src={ScanCodeImg} alt="Edit profile" class="mx-auto" loading="lazy" />
				<p class="py-6 text-2xl font-semibold text-secondary">
					Simply scan their QR code, or open their pass and press <span class="text-primary"
						>follow</span
					>
				</p>
			</div>
		</div>
	</section>

	<section class="space-y-4 bg-slate-50 py-8" id="info-hero">
		<div class="mx-auto max-w-lg space-y-6 text-center">
			<h1 class="text-center text-8xl font-bold text-secondary">Info</h1>
			<p class="text-center text-xl font-semibold text-accent">
				<span class="text-primary">holopass</span> is a fan project and is not affiliated with hololive
				or COVER Corp.
			</p>
			<p class="text-center text-xl font-semibold text-accent">
				All inquiries should go to <a href="https://x.com/danirukun">@danirukun</a>
			</p>
			<a href="/privacy" class="text-primary">Privacy Policy</a>
		</div>
	</section>

	<footer class="bg-slate-200 py-8" id="footer">
		<div class="mx-auto max-w-lg space-y-6 text-center">
			<p class="text-center text-xl font-semibold text-accent">
				&copy; 2024 <span class="text-primary">holopass developers</span>
			</p>
		</div>
	</footer>
</section>
