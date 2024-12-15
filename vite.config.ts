import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import ServerUrlCopy from 'vite-plugin-url-copy';

export default defineConfig({
	plugins: [sveltekit(), ServerUrlCopy({ qrcode: { disabled: false } }), isoImport()]
});
