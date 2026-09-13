import {
	AnimatePresence,
	motion,
	useInView,
	useMotionValue,
	useSpring
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

// ── Появление при прокрутке ──
export function Reveal({
	children,
	delay = 0,
	className = ''
}: {
	children: ReactNode
	delay?: number
	className?: string
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 22 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	)
}

// ── Строки, выезжающие из-под маски ──
export function MaskLines({
	lines,
	className = '',
	delay = 0
}: {
	lines: { text: string; className?: string }[]
	className?: string
	delay?: number
}) {
	return (
		<span className={className}>
			{lines.map((l, i) => (
				<span
					key={l.text}
					className="block overflow-hidden pb-[0.08em]"
				>
					<motion.span
						className={`block ${l.className ?? ''}`}
						initial={{ y: '110%' }}
						animate={{ y: 0 }}
						transition={{
							duration: 0.9,
							delay: delay + i * 0.12,
							ease: [0.16, 1, 0.3, 1]
						}}
					>
						{l.text}
					</motion.span>
				</span>
			))}
		</span>
	)
}

// ── То же, но по прокрутке ──
export function MaskLinesOnView({
	lines,
	className = ''
}: {
	lines: { text: string; className?: string }[]
	className?: string
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, margin: '-100px' })

	return (
		<span
			ref={ref}
			className={className}
		>
			{lines.map((l, i) => (
				<span
					key={l.text}
					className="block overflow-hidden pb-[0.08em]"
				>
					<motion.span
						className={`block ${l.className ?? ''}`}
						initial={{ y: '110%' }}
						animate={inView ? { y: 0 } : { y: '110%' }}
						transition={{
							duration: 0.85,
							delay: i * 0.1,
							ease: [0.16, 1, 0.3, 1]
						}}
					>
						{l.text}
					</motion.span>
				</span>
			))}
		</span>
	)
}

// ── Счётчик ──
export function CountUp({
	to,
	duration = 1.6,
	className = ''
}: {
	to: number
	duration?: number
	className?: string
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, amount: 0.4 })
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (!inView) return

		let raf = 0
		const start = performance.now()

		const tick = (now: number) => {
			const p = Math.min((now - start) / (duration * 1000), 1)
			// Замедление к концу
			const eased = 1 - Math.pow(1 - p, 3)
			setValue(Math.round(to * eased))
			if (p < 1) raf = requestAnimationFrame(tick)
		}

		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
	}, [inView, to, duration])

	return (
		<span
			ref={ref}
			className={className}
		>
			{value}
		</span>
	)
}

// ── Бегущая строка ──
// Две одинаковые группы едут встык, поэтому стыка не видно
export function Marquee({
	items,
	reverse = false
}: {
	items: string[]
	reverse?: boolean
}) {
	const anim = reverse ? 'animate-marqueeBack' : 'animate-marquee'

	const group = (hidden: boolean) => (
		<div
			className={`flex shrink-0 items-center ${anim}`}
			aria-hidden={hidden || undefined}
		>
			{items.map(it => (
				<span
					key={it}
					className="flex shrink-0 items-center text-xl font-bold tracking-tight text-white/25 md:text-3xl"
				>
					<span className="px-6 md:px-8">{it}</span>
					<span
						aria-hidden
						className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
					/>
				</span>
			))}
		</div>
	)

	return (
		<div className="relative flex overflow-hidden py-5">
			{group(false)}
			{group(true)}
		</div>
	)
}

// ── Карточка, реагирующая на курсор ──
export function TiltCard({
	children,
	className = ''
}: {
	children: ReactNode
	className?: string
}) {
	const ref = useRef<HTMLDivElement>(null)
	const rx = useMotionValue(0)
	const ry = useMotionValue(0)
	const srx = useSpring(rx, { stiffness: 260, damping: 22 })
	const sry = useSpring(ry, { stiffness: 260, damping: 22 })

	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = ref.current
		if (!el) return
		const r = el.getBoundingClientRect()
		const px = (e.clientX - r.left) / r.width - 0.5
		const py = (e.clientY - r.top) / r.height - 0.5
		ry.set(px * 9)
		rx.set(-py * 9)
	}

	const onLeave = () => {
		rx.set(0)
		ry.set(0)
	}

	return (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

// ── Обёртка секции ──
export function Section({
	id,
	children,
	className = '',
	decor
}: {
	id?: string
	children: ReactNode
	className?: string
	decor?: ReactNode
}) {
	return (
		<section
			id={id}
			className={`relative overflow-hidden py-20 md:py-28 ${className}`}
		>
			{decor}
			<div className="relative mx-auto max-w-page px-5 md:px-8">{children}</div>
		</section>
	)
}

// ── Заголовок секции ──
export function SectionHead({
	kicker,
	title,
	lead,
	center = false
}: {
	kicker: string
	title: ReactNode
	lead?: string
	center?: boolean
}) {
	return (
		<Reveal className={center ? 'text-center' : ''}>
			<p className="kicker">{kicker}</p>
			<h2
				className="h2 mt-4 max-w-[20ch] md:mt-5"
				style={center ? { marginInline: 'auto' } : undefined}
			>
				{title}
			</h2>
			{lead && (
				<p
					className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg"
					style={center ? { marginInline: 'auto' } : undefined}
				>
					{lead}
				</p>
			)}
		</Reveal>
	)
}

// ── Скриншот телефона ──
// Пока картинки нет — показываем рамку с подписью
export function Phone({
	src,
	label,
	note,
	className = '',
	caption = true
}: {
	src?: string
	label: string
	note?: string
	className?: string
	caption?: boolean
}) {
	// Готовый мокап показываем как есть — рамка не нужна
	if (src) {
		const img = (
			<div className="mock-glow">
				<img
					src={src}
					alt={label}
					loading="lazy"
					className="block w-full object-contain"
				/>
			</div>
		)

		if (!caption) return <div className={className}>{img}</div>

		return (
			<figure className={className}>
				{img}
				<figcaption className="mt-4 text-center">
					<span className="block text-[13px] font-bold leading-tight text-white md:text-sm">
						{label}
					</span>
					{note && (
						<span className="mt-1 block text-[11px] leading-tight text-faint">
							{note}
						</span>
					)}
				</figcaption>
			</figure>
		)
	}

	return (
		<div
			className={`relative aspect-[9/19.5] w-full overflow-hidden rounded-[28px] border border-dashed border-lime/45 bg-surface transition-colors hover:border-lime ${className}`}
		>
			<div className="absolute inset-0 grid place-content-center px-4 text-center">
				<p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
					Скриншот
				</p>
				<p className="mt-2 text-sm font-bold leading-tight text-white">
					{label}
				</p>
				{note && <p className="mt-1.5 text-[11px] text-faint">{note}</p>}
			</div>
		</div>
	)
}

// ── Широкий скриншот ──
export function Shot({
	src,
	label,
	note,
	className = ''
}: {
	src?: string
	label: string
	note?: string
	className?: string
}) {
	if (src) {
		return (
			<figure className={className}>
				<img
					src={src}
					alt={label}
					loading="lazy"
					className="block w-full rounded-2xl object-contain"
				/>
				<figcaption className="mt-4 text-center">
					<span className="block text-[13px] font-bold leading-tight text-white md:text-sm">
						{label}
					</span>
					{note && (
						<span className="mt-1 block text-[11px] leading-tight text-faint">
							{note}
						</span>
					)}
				</figcaption>
			</figure>
		)
	}

	return (
		<div
			className={`relative overflow-hidden rounded-2xl border border-dashed border-lime/45 bg-surface transition-colors hover:border-lime ${className}`}
		>
			<div className="absolute inset-0 grid place-content-center px-5 text-center">
				<p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime">
					Скриншот
				</p>
				<p className="mt-2 text-sm font-bold leading-tight text-white">
					{label}
				</p>
				{note && <p className="mt-1.5 text-[11px] text-faint">{note}</p>}
			</div>
		</div>
	)
}

// ── Переключатель экранов ──
// Один крупный мокап и кнопки под ним. Пока не трогали — листает сам
export function PhoneSwitcher({
	items,
	className = ''
}: {
	items: { label: string; note?: string; src?: string }[]
	className?: string
}) {
	const [active, setActive] = useState(0)
	const [auto, setAuto] = useState(true)
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { amount: 0.35 })

	useEffect(() => {
		if (!auto || !inView) return
		const id = setInterval(() => setActive(i => (i + 1) % items.length), 4200)
		return () => clearInterval(id)
	}, [auto, inView, items.length])

	const pick = (i: number) => {
		setAuto(false)
		setActive(i)
	}

	const current = items[active]

	return (
		<div
			ref={ref}
			className={className}
		>
			{/* Экран */}
			<div className="mx-auto w-full max-w-[300px] md:max-w-[340px]">
				<div className="relative aspect-[8/15]">
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0, scale: 0.96, y: 14 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.97, y: -10 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
							className="absolute inset-0 flex items-center"
						>
							<Phone
								src={current.src}
								label={current.label}
								note={current.note}
								caption={false}
								className="w-full"
							/>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* Подпись */}
			<div className="mt-5 min-h-[3rem] text-center">
				<AnimatePresence mode="wait">
					<motion.div
						key={active}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.28 }}
					>
						<p className="text-base font-bold leading-tight text-white">
							{current.label}
						</p>
						{current.note && (
							<p className="mt-1 text-xs text-faint">{current.note}</p>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Кнопки */}
			<div className="mt-6 flex flex-wrap justify-center gap-2">
				{items.map((it, i) => (
					<button
						key={it.label + i}
						type="button"
						onClick={() => pick(i)}
						aria-pressed={active === i}
						className={`relative overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition md:text-[13px] ${
							active === i
								? 'bg-lime text-ink'
								: 'bg-surface2 text-muted hover:text-white'
						}`}
					>
						{it.label}

						{/* Полоска обратного отсчёта */}
						{active === i && auto && (
							<motion.span
								key={`bar-${i}`}
								className="absolute inset-x-0 bottom-0 h-[2px] bg-ink/25"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 4.2, ease: 'linear' }}
								style={{ originX: 0 }}
							/>
						)}
					</button>
				))}
			</div>
		</div>
	)
}

// ── Пункт списка с чертой ──
export function Bullet({ children }: { children: ReactNode }) {
	return (
		<li className="flex gap-4">
			<span
				aria-hidden
				className="mt-[0.62em] h-px w-4 shrink-0 bg-lime"
			/>
			<span className="text-[15px] leading-relaxed text-white/90 md:text-base">
				{children}
			</span>
		</li>
	)
}
