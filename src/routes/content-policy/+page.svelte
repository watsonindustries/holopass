<script lang="ts">
	import { fade } from 'svelte/transition';
	import BackButton from '$lib/components/BackButton.svelte';
</script>

<div class="mx-auto min-h-screen w-full bg-white p-6" transition:fade={{ delay: 100, duration: 300 }}>
	<div class="mb-4">
		<BackButton url="/" />
	</div>

	<h1 class="mb-6 text-3xl font-bold text-gray-800">Content Policy</h1>
	
	<p class="mb-6 text-gray-600">
		At HoloPass, we are committed to providing a safe and positive environment for all users. We have strict 
		policies in place regarding prohibited content to ensure our platform remains safe and legal.
	</p>

	<h2 class="mb-4 text-2xl font-semibold text-gray-800">Prohibited Content</h2>
	
	<p class="mb-6 text-gray-600">
		HoloPass strictly prohibits the manual upload of images that could be considered Child Sexual Abuse Material (CSAM) 
		or any content that could potentially exploit or harm minors. Additionally, we do not allow content that:
	</p>

	<ul class="mt-4 mb-6 list-disc space-y-2 pl-6 text-gray-700">
		<li>Contains explicit sexual content involving minors</li>
		<li>Depicts violence against children</li>
		<li>Exploits or sexualizes individuals under the age of 18</li>
		<li>Contains non-consensual intimate imagery</li>
		<li>Promotes, glorifies, or encourages illegal activities</li>
		<li>Violates intellectual property rights</li>
		<li>Contains hate speech or discriminatory content</li>
	</ul>

	<h2 class="mb-4 text-2xl font-semibold text-gray-800">Reporting Abuse</h2>
	
	<p class="mb-6 text-gray-600">
		If you encounter content on HoloPass that you believe violates our content policy or could potentially be 
		abusive, please report it immediately. We take all reports seriously and will investigate promptly.
	</p>

	<p class="mb-6 text-gray-600">To report potentially abusive content:</p>

	<ol class="list-decimal space-y-4 pl-6 text-gray-700">
		<li>
			Send an email to
			<a
				href="mailto:contact@holo-pass.com?subject=Content%20Policy%20Violation%20Report"
				class="text-blue-600 hover:text-blue-800 hover:underline"
			>
				contact@holo-pass.com
			</a>
			with the subject "Content Policy Violation Report"
		</li>
		<li>Include specific details about the content in question (URL, username, etc.)</li>
		<li>Our team will review your report within 24 hours</li>
		<li>We will take appropriate action based on our investigation</li>
	</ol>

	<p class="mt-8 text-gray-600">
		HoloPass is committed to maintaining a safe platform for all users. We actively monitor for violations 
		of our content policy and have systems in place to prevent the upload of prohibited content.
	</p>

	<p class="mt-4 text-gray-600">
		Thank you for helping us maintain a safe community. If you have any questions about our content 
		policy, please contact us at 
		<a
			href="mailto:contact@holo-pass.com"
			class="text-blue-600 hover:text-blue-800 hover:underline"
		>
			contact@holo-pass.com
		</a>.
	</p>
</div> 