/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Фон и поверхности
				ink: '#060607',
				surface: '#101013',
				surface2: '#17171B',
				line: '#26262C',

				// Акцент
				lime: {
					DEFAULT: '#B8F229',
					soft: '#CBF56B',
					dim: '#8FC318',
					deep: '#5E8210'
				},

				// Текст
				muted: '#8A8A93',
				faint: '#5A5A63'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			maxWidth: {
				page: '1240px'
			},
			keyframes: {
				// Медленное дыхание свечения за первым экраном
				breathe: {
					'0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.08)' }
				},
				// Появление снизу
				riseIn: {
					from: { opacity: '0', transform: 'translateY(24px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				// Подсказка «крути вниз»
				nudge: {
					'0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
					'50%': { transform: 'translateY(6px)', opacity: '1' }
				},
				// Бегущая строка
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' }
				},
				marqueeBack: {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				}
			},
			animation: {
				breathe: 'breathe 9s ease-in-out infinite',
				riseIn: 'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
				nudge: 'nudge 2.2s ease-in-out infinite',
				marquee: 'marquee 32s linear infinite',
				marqueeBack: 'marqueeBack 32s linear infinite'
			}
		}
	},
	plugins: []
}
