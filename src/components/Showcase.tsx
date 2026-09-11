import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { M } from '../mockups'
import { Phone } from './ui'

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
	const ref = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(0)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end']
	})

	// Какой шаг показывать сейчас
	useEffect(() => {
		return scrollYProgress.on('change', v => {
			const i = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length + 0.15))
			setActive(i)
		})
	}, [scrollYProgress])

	const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

	return (
		<section
			id="features"
			ref={ref}
			className="relative"
			style={{ height: `${STEPS.length * 90}vh` }}
		>
			<div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
				{/* Мягкое свечение, перетекающее за телефоном */}
				<motion.div
					aria-hidden
					className="pointer-events-none absolute left-[22%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
					style={{
						background:
							'radial-gradient(circle, rgba(184,242,41,0.28) 0%, transparent 68%)'
					}}
				/>

				<div className="relative mx-auto grid w-full max-w-page items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
					{/* Телефон */}
					<div className="mx-auto w-full max-w-[260px] lg:max-w-[300px]">
						<div className="relative aspect-[8/15]">
							{STEPS.map((s, i) => (
								<motion.div
									key={s.shot}
									className="absolute inset-0"
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
					<div className="flex gap-7 md:gap-10">
						{/* Полоска прогресса */}
						<div className="relative hidden w-px shrink-0 bg-line md:block">
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
									className="py-5 md:py-7"
								>
									<p className="kicker">{s.kicker}</p>
									<h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-4xl">
										{s.title}
									</h3>
									<p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted md:text-base">
										{s.text}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
