import logo from '../assets/logo-dark-small.png'

// ── Пятно света ──
export function Glow({
	className = '',
	size = 620,
	strength = 0.26
}: {
	className?: string
	size?: number
	strength?: number
}) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
			style={{
				width: size,
				height: size,
				background: `radial-gradient(circle, rgba(184,242,41,${strength}) 0%, transparent 68%)`
			}}
		/>
	)
}

// ── Сетка линий ──
export function GridBg({
	className = '',
	step = 72,
	fade = 'radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 78%)'
}: {
	className?: string
	step?: number
	fade?: string
}) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute inset-0 opacity-[0.14] ${className}`}
			style={{
				backgroundImage:
					'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
				backgroundSize: `${step}px ${step}px`,
				maskImage: fade,
				WebkitMaskImage: fade
			}}
		/>
	)
}

// ── Россыпь точек ──
export function DotBg({
	className = '',
	step = 26,
	fade = 'radial-gradient(ellipse 60% 70% at 80% 50%, black 5%, transparent 72%)'
}: {
	className?: string
	step?: number
	fade?: string
}) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute inset-0 opacity-[0.5] ${className}`}
			style={{
				backgroundImage:
					'radial-gradient(rgba(184,242,41,0.22) 1px, transparent 1px)',
				backgroundSize: `${step}px ${step}px`,
				maskImage: fade,
				WebkitMaskImage: fade
			}}
		/>
	)
}

// ── Наклонный луч ──
export function Beam({ className = '' }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute ${className}`}
			style={{
				background:
					'linear-gradient(105deg, transparent 0%, rgba(184,242,41,0.10) 45%, rgba(184,242,41,0.03) 60%, transparent 100%)',
				filter: 'blur(34px)'
			}}
		/>
	)
}

// ── Логотип водяным знаком ──
export function LogoMark({
	className = '',
	width = 760,
	opacity = 0.04
}: {
	className?: string
	width?: number
	opacity?: number
}) {
	return (
		<img
			src={logo}
			alt=""
			aria-hidden
			className={`pointer-events-none absolute select-none ${className}`}
			style={{ width, opacity }}
		/>
	)
}

// ── Разделитель с логотипом ──
export function Divider() {
	return (
		<div
			aria-hidden
			className="mx-auto flex max-w-page items-center gap-5 px-5 md:px-8"
		>
			<span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
			<img
				src={logo}
				alt=""
				className="h-5 w-auto opacity-40"
			/>
			<span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
		</div>
	)
}

// ── Верхняя светящаяся кромка секции ──
export function TopEdge() {
	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 top-0 h-px"
			style={{
				background:
					'linear-gradient(90deg, transparent 0%, rgba(184,242,41,0.55) 50%, transparent 100%)'
			}}
		/>
	)
}
