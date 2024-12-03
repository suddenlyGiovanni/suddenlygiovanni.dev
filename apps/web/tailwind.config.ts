import typographyPlugin from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config = {
	content: ['./app/**/*.tsx', '../../packages/ui/src/**/*.tsx'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		fontFamily: {
			comic: [
				'"Shantell Sans", cursive',
				{
					fontFeatureSettings: '"cv11", "ss01"',
					fontVariationSettings: '"BNCE" 30, "INFM" 50, "SPAC" 0;',
				},
			],
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-open': {
					from: {
						width: '0',
						height: '0',
					},
					to: {
						width: 'var(--radix-accordion-content-width)',
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-close': {
					from: {
						width: 'var(--radix-accordion-content-width)',
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						width: '0',
						height: '0',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'accordion-open': 'accordion-open 1000ms ease-out',
				'accordion-close': 'accordion-close 1000ms ease-out',
			},
		},
	},
	plugins: [animatePlugin, typographyPlugin],
} satisfies Config

export default config
