import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ServerUrlCopy from 'vite-plugin-url-copy';
import { isoImport } from 'vite-plugin-iso-import';

export default defineConfig({
	plugins: [
		sveltekit(),
		ServerUrlCopy({ qrcode: { disabled: false } }),
		isoImport()
	]
});
