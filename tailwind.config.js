/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				holographic: {
					primary: '#27CDF2',
					secondary: '#F26BB5',
					accent: '#389BF2',
					neutral: '#062233',
					'base-100': '#D5E7F2',
					info: '#389BF2',
					success: '#F26BB5',
					warning: '#F2D649',
					error: '#ff0000'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
