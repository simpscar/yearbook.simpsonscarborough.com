import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				xs: '1.25rem',
				sm: '1.5rem',
				md: '1.75rem',
				lg: '2rem',
				xl: '2.25rem',
				'2xl': '2.5rem'
			}
		},
		extend: {
			screens: {
				xs: '480px'
			},
			colors: {
				blue: '#0077cd',
				midnight: '#002A3A',
				2010: '#ffac00',
				304: '#9adcf7',
				7487: '#c5f1a5',
				7627: '#a72a2e',
				'process-yellow-50': '#fbee81',
				1895: '#ffb3e0',
				2344: '#ff8679',
				gray: {
					fog: '#bfced6',
					'fog-25': '#eff2f4'
				}
			},
			fontFamily: {
				sans: ['"Figtree Variable"', ...defaultTheme.fontFamily.sans],
				serif: ['"TRJN DaVinci"', ...defaultTheme.fontFamily.serif],
			}
		},
	},
	plugins: [],
}
