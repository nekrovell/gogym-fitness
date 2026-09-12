import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { M } from '../mockups'
import { Phone, Reveal } from './ui'

const STEPS = [
	{
		kicker: 'Клиент',
		title: 'Открывает приложение',
		text: 'Видит остаток посещений и до какого числа действует абонемент. Не звонит на ресепшен и не спорит на входе.',
		shot: 'Главный экран',
		note: 'остаток и срок',
		src: M.membership
	},
	{
		kicker: 'Вход',
		title: 'Показывает QR-код',
		text: 'Администратор сканирует. Посещение отмечается, абонемент списывается сам — на это уходит секунда.',
		shot: 'QR на вход',
		note: 'показал — прошёл',
		src: M.qr
	},
	{
		kicker: 'В зале',
		title: 'Заказывает в баре',
		text: 'Берёт воду или протеин по ходу тренировки, счёт копится. Платит один раз на выходе.',
		shot: 'Витрина бара',
		note: 'товары и корзина',
		src: M.bar
	},
	{
		kicker: 'После',
		title: 'Смотрит на прогресс',
		text: 'Тренер записал замеры после занятия. Клиент видит, как за месяцы менялись вес и обхваты.',
		shot: 'Замеры',
		note: 'динамика по месяцам',
		src: M.measurements
	}
]

export function Showcase() {
	return (
		<div id="features">
			<MobileSteps />
			<StickySteps />
		</div>
	)
}

// ── На телефоне: обычная лента, без прилипания ──
function MobileSteps() {
	return (
		<section className="py-20 lg:hidden">
			<div className="mx-auto max-w-page px-5">
				{STEPS.map((s, i) => (
					<Reveal
						key={s.title}
						delay={0.05}
					>
						<div className="border-b border-line py-10 last:border-0">
							<div className="mx-auto max-w-[280px]">
								<Phone
									src={s.src}
									label={s.shot}
									note={s.note}
								/>
							</div>

							<div className="mt-7 text-center">
								<p className="kicker">{s.kicker}</p>
								<h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white">
									{s.title}
								</h3>
								<p className="mx-auto mt-3 max-w-[38ch] text-[15px] leading-relaxed text-muted">
									{s.text}
								</p>
							</div>

							<p className="mt-6 text-center text-xs font-bold tracking-widest text-faint">
								{String(i + 1).padStart(2, '0')} /{' '}
								{String(STEPS.length).padStart(2, '0')}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	)
}

// ── На широком экране: телефон прилипает, экраны меняются ──
function StickySteps() {
	const ref = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(0)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end']
	})

	useEffect(() => {
		return scrollYProgress.on('change', v => {
			const i = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length + 0.15))
			setActive(i)
		})
	}, [scrollYProgress])

	const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

	return (
		<div
			ref={ref}
			className="relative hidden lg:block"
			style={{ height: `${STEPS.length * 90}vh` }}
		>
			<div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
				{/* Свечение за телефоном */}
				<div
					aria-hidden
					className="pointer-events-none absolute left-[22%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
					style={{
						background:
							'radial-gradient(circle, rgba(184,242,41,0.28) 0%, transparent 68%)'
					}}
				/>

				<div className="relative mx-auto grid w-full max-w-page items-center gap-16 px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
					{/* Телефон */}
					<div className="mx-auto w-full max-w-[420px]">
						<div className="relative aspect-[8/15]">
							{STEPS.map((s, i) => (
								<motion.div
									key={s.shot}
									className="absolute inset-0 flex items-center"
									initial={false}
									animate={{
										opacity: active === i ? 1 : 0,
										scale: active === i ? 1 : 0.94,
										y: active === i ? 0 : 18
									}}
									transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
								>
									<Phone
										src={s.src}
										label={s.shot}
										note={s.note}
										className="h-full"
									/>
								</motion.div>
							))}
						</div>
					</div>

					{/* Текст */}
					<div className="flex gap-10">
						<div className="relative w-px shrink-0 bg-line">
							<motion.div
								className="absolute left-0 top-0 w-px bg-lime"
								style={{ height: lineHeight }}
							/>
						</div>

						<div className="flex-1">
							{STEPS.map((s, i) => (
								<motion.div
									key={s.title}
									animate={{ opacity: active === i ? 1 : 0.22 }}
									transition={{ duration: 0.4 }}
									className="py-7"
								>
									<p className="kicker">{s.kicker}</p>
									<h3 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
										{s.title}
									</h3>
									<p className="mt-3 max-w-[44ch] text-base leading-relaxed text-muted">
										{s.text}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
