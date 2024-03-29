import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Geologica"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	daisyui: {
		themes: [
			{
				holographic: {
					primary: '#F26BB5',
					secondary: '#27CDF2',
					accent: '#389BF2',
					neutral: '#062233',
					'base-100': '#efefef',
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
