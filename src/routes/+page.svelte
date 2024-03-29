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
			<svg class="" viewBox="0 0 439 91" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0.344 70L15.128 0.879997H30.872L24.248 31.984L23.384 27.232C25.784 24.864 28.44 23.008 31.352 21.664C34.296 20.288 37.4 19.6 40.664 19.6C44.472 19.6 47.736 20.432 50.456 22.096C53.208 23.76 55.192 26.048 56.408 28.96C57.656 31.872 57.912 35.216 57.176 38.992L50.552 70H34.808L40.52 43.408C41.16 40.432 40.792 38.096 39.416 36.4C38.072 34.704 35.848 33.856 32.744 33.856C30.92 33.856 29.256 34.24 27.752 35.008C26.28 35.776 25.016 36.912 23.96 38.416C22.904 39.888 22.136 41.728 21.656 43.936L16.088 70H0.344ZM89.6503 71.44C84.5303 71.44 80.0823 70.4 76.3063 68.32C72.5623 66.208 69.6663 63.392 67.6183 59.872C65.5703 56.352 64.5463 52.464 64.5463 48.208C64.5463 44.304 65.3463 40.624 66.9463 37.168C68.5783 33.712 70.7863 30.672 73.5703 28.048C76.3863 25.424 79.6023 23.36 83.2183 21.856C86.8343 20.352 90.6583 19.6 94.6903 19.6C99.7783 19.6 104.194 20.64 107.938 22.72C111.714 24.8 114.626 27.6 116.674 31.12C118.722 34.64 119.746 38.512 119.746 42.736C119.746 46.64 118.946 50.336 117.346 53.824C115.746 57.28 113.538 60.336 110.722 62.992C107.938 65.616 104.738 67.68 101.122 69.184C97.5063 70.688 93.6823 71.44 89.6503 71.44ZM90.8983 57.904C93.5863 57.904 95.9223 57.248 97.9063 55.936C99.9223 54.592 101.474 52.832 102.562 50.656C103.65 48.48 104.194 46.144 104.194 43.648C104.194 41.472 103.746 39.6 102.85 38.032C101.954 36.464 100.69 35.264 99.0583 34.432C97.4583 33.568 95.5703 33.136 93.3943 33.136C90.7383 33.136 88.4023 33.792 86.3863 35.104C84.4023 36.416 82.8503 38.16 81.7303 40.336C80.6423 42.48 80.0983 44.8 80.0983 47.296C80.0983 49.472 80.5463 51.36 81.4423 52.96C82.3703 54.528 83.6503 55.744 85.2823 56.608C86.9143 57.472 88.7863 57.904 90.8983 57.904ZM123.813 70L138.597 0.879997H154.341L139.557 70H123.813ZM179.182 71.44C174.062 71.44 169.614 70.4 165.838 68.32C162.094 66.208 159.198 63.392 157.15 59.872C155.102 56.352 154.078 52.464 154.078 48.208C154.078 44.304 154.878 40.624 156.478 37.168C158.11 33.712 160.318 30.672 163.102 28.048C165.918 25.424 169.134 23.36 172.75 21.856C176.366 20.352 180.19 19.6 184.222 19.6C189.31 19.6 193.726 20.64 197.47 22.72C201.246 24.8 204.158 27.6 206.206 31.12C208.254 34.64 209.278 38.512 209.278 42.736C209.278 46.64 208.478 50.336 206.878 53.824C205.278 57.28 203.07 60.336 200.254 62.992C197.47 65.616 194.27 67.68 190.654 69.184C187.038 70.688 183.214 71.44 179.182 71.44ZM180.43 57.904C183.118 57.904 185.454 57.248 187.438 55.936C189.454 54.592 191.006 52.832 192.094 50.656C193.182 48.48 193.726 46.144 193.726 43.648C193.726 41.472 193.278 39.6 192.382 38.032C191.486 36.464 190.222 35.264 188.59 34.432C186.99 33.568 185.102 33.136 182.926 33.136C180.27 33.136 177.934 33.792 175.918 35.104C173.934 36.416 172.382 38.16 171.262 40.336C170.174 42.48 169.63 44.8 169.63 47.296C169.63 49.472 170.078 51.36 170.974 52.96C171.902 54.528 173.182 55.744 174.814 56.608C176.446 57.472 178.318 57.904 180.43 57.904Z"
					fill="#27CDF2"
				/>
				<path
					d="M209.12 90.16L223.808 21.04H237.392L236.48 25.504C238.368 23.68 240.56 22.24 243.056 21.184C245.584 20.128 248.496 19.6 251.792 19.6C256.176 19.6 260 20.512 263.264 22.336C266.56 24.16 269.12 26.72 270.944 30.016C272.8 33.312 273.728 37.168 273.728 41.584C273.728 45.616 273.024 49.44 271.616 53.056C270.24 56.64 268.288 59.824 265.76 62.608C263.264 65.36 260.32 67.52 256.928 69.088C253.536 70.656 249.84 71.44 245.84 71.44C242.64 71.44 239.696 70.88 237.008 69.76C234.32 68.64 232.048 67.056 230.192 65.008L224.816 90.16H209.12ZM244.88 57.904C247.376 57.904 249.632 57.28 251.648 56.032C253.664 54.784 255.248 53.088 256.4 50.944C257.584 48.768 258.176 46.272 258.176 43.456C258.176 41.344 257.712 39.52 256.784 37.984C255.888 36.416 254.624 35.216 252.992 34.384C251.392 33.552 249.52 33.136 247.376 33.136C244.72 33.136 242.384 33.792 240.368 35.104C238.384 36.416 236.832 38.144 235.712 40.288C234.624 42.4 234.08 44.688 234.08 47.152C234.08 49.328 234.528 51.232 235.424 52.864C236.32 54.464 237.584 55.712 239.216 56.608C240.848 57.472 242.736 57.904 244.88 57.904ZM301.309 71.44C296.957 71.44 293.133 70.528 289.837 68.704C286.541 66.88 283.965 64.32 282.109 61.024C280.285 57.728 279.373 53.872 279.373 49.456C279.373 45.424 280.029 41.616 281.341 38.032C282.685 34.448 284.573 31.28 287.005 28.528C289.437 25.744 292.317 23.568 295.645 22C299.005 20.4 302.685 19.6 306.685 19.6C311.581 19.6 315.741 20.704 319.165 22.912C322.621 25.088 324.765 27.952 325.597 31.504L322.813 33.808L325.501 21.04H339.037L328.669 70H315.133L317.869 57.232L319.261 61.504C317.469 64.512 315.069 66.928 312.061 68.752C309.085 70.544 305.501 71.44 301.309 71.44ZM305.389 57.904C307.757 57.904 309.933 57.328 311.917 56.176C313.901 54.992 315.485 53.344 316.669 51.232C317.853 49.088 318.445 46.576 318.445 43.696C318.445 41.552 317.997 39.696 317.101 38.128C316.205 36.528 314.957 35.296 313.357 34.432C311.789 33.568 309.981 33.136 307.933 33.136C305.565 33.136 303.389 33.728 301.405 34.912C299.453 36.096 297.885 37.776 296.701 39.952C295.517 42.096 294.925 44.576 294.925 47.392C294.925 49.536 295.357 51.408 296.221 53.008C297.117 54.576 298.349 55.792 299.917 56.656C301.517 57.488 303.341 57.904 305.389 57.904ZM362.566 71.344C358.278 71.344 354.054 70.704 349.894 69.424C345.766 68.144 342.262 66.176 339.381 63.52L346.246 53.248C348.806 55.2 351.622 56.752 354.694 57.904C357.766 59.024 360.71 59.584 363.526 59.584C365.83 59.584 367.606 59.216 368.854 58.48C370.134 57.712 370.774 56.624 370.774 55.216C370.774 54.32 370.214 53.616 369.094 53.104C368.006 52.592 365.83 51.936 362.566 51.136C356.87 49.824 352.646 48.032 349.894 45.76C347.174 43.488 345.814 40.544 345.814 36.928C345.814 33.28 346.79 30.128 348.742 27.472C350.694 24.816 353.318 22.768 356.614 21.328C359.91 19.856 363.574 19.12 367.606 19.12C371.99 19.12 376.038 19.792 379.75 21.136C383.494 22.448 386.55 24.224 388.917 26.464L382.198 36.832C380.918 35.648 379.43 34.608 377.734 33.712C376.038 32.816 374.246 32.128 372.358 31.648C370.47 31.136 368.646 30.88 366.885 30.88C364.87 30.88 363.238 31.248 361.99 31.984C360.742 32.688 360.118 33.68 360.118 34.96C360.118 35.92 360.678 36.688 361.798 37.264C362.918 37.84 364.998 38.544 368.038 39.376C373.99 40.944 378.294 42.8 380.95 44.944C383.606 47.056 384.934 49.808 384.934 53.2C384.934 56.88 383.958 60.08 382.006 62.8C380.086 65.52 377.446 67.632 374.086 69.136C370.726 70.608 366.886 71.344 362.566 71.344ZM411.878 71.344C407.59 71.344 403.366 70.704 399.206 69.424C395.078 68.144 391.574 66.176 388.694 63.52L395.558 53.248C398.118 55.2 400.934 56.752 404.006 57.904C407.078 59.024 410.022 59.584 412.838 59.584C415.142 59.584 416.918 59.216 418.166 58.48C419.446 57.712 420.086 56.624 420.086 55.216C420.086 54.32 419.526 53.616 418.406 53.104C417.318 52.592 415.142 51.936 411.878 51.136C406.182 49.824 401.958 48.032 399.206 45.76C396.486 43.488 395.126 40.544 395.126 36.928C395.126 33.28 396.102 30.128 398.054 27.472C400.006 24.816 402.63 22.768 405.926 21.328C409.222 19.856 412.886 19.12 416.918 19.12C421.302 19.12 425.35 19.792 429.062 21.136C432.806 22.448 435.862 24.224 438.23 26.464L431.51 36.832C430.23 35.648 428.742 34.608 427.046 33.712C425.35 32.816 423.558 32.128 421.67 31.648C419.782 31.136 417.958 30.88 416.198 30.88C414.182 30.88 412.55 31.248 411.302 31.984C410.054 32.688 409.43 33.68 409.43 34.96C409.43 35.92 409.99 36.688 411.11 37.264C412.23 37.84 414.31 38.544 417.35 39.376C423.302 40.944 427.606 42.8 430.262 44.944C432.918 47.056 434.246 49.808 434.246 53.2C434.246 56.88 433.27 60.08 431.318 62.8C429.398 65.52 426.758 67.632 423.398 69.136C420.038 70.608 416.198 71.344 411.878 71.344Z"
					fill="#F26BB5"
				/>
			</svg>
			<h1 class="text-center text-2xl tracking-wide text-accent">beta</h1>
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
				&copy; 2024 <span class="text-primary">holo-pass.com</span>
			</p>
		</div>
	</footer>
</section>
