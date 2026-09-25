import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StoreButtons } from './StoreButtons'
import { Marquee, MaskLines } from './ui'

const FACTS = [
	'Сканер вместо карт',
	'Счета в баре',
	'Печать отчётов',
	'Цены в тенге'
]

const TICKER = [
	'Абонементы',
	'QR на вход',
	'Тренеры',
	'Замеры',
	'Бар',
	'Услуги',
	'Пакеты',
	'Отчёты',
	'Склад',
	'Статистика'
]

// Широкий экран (как брейкпоинт md в Tailwind)
const DESKTOP_QUERY = '(min-width: 768px)'

function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(
		() =>
			typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
	)

	useEffect(() => {
		const mq = window.matchMedia(DESKTOP_QUERY)

		const onChange = () => setIsDesktop(mq.matches)

		mq.addEventListener('change', onChange)

		return () => mq.removeEventListener('change', onChange)
	}, [])

	return isDesktop
}

export function Hero() {
	const { scrollY } = useScroll()
	const isDesktop = useIsDesktop()

	// Заголовок медленно уезжает и растворяется при прокрутке
	const y = useTransform(scrollY, [0, 600], [0, 90])
	const opacity = useTransform(scrollY, [0, 480], [1, 0])
	const glowScale = useTransform(scrollY, [0, 600], [1, 1.35])

	// На телефоне блок выше экрана: растворение спрятало бы кнопки магазинов раньше,
	// чем до них долистают. Поэтому эффект только на широком экране
	const parallax = isDesktop ? { y, opacity } : undefined

	return (
		<section
			id="top"
			className="relative overflow-hidden pt-[72px]"
		>
			{/* Свечение за заголовком */}
			<motion.div
				aria-hidden
				style={{ scale: glowScale }}
				className="pointer-events-none absolute left-1/2 top-[16%] h-[900px] w-[900px] -translate-x-1/2 animate-breathe rounded-full opacity-60 blur-[130px]"
			>
				<div
					className="h-full w-full rounded-full"
					style={{
						background:
							'radial-gradient(circle, rgba(184,242,41,0.32) 0%, rgba(184,242,41,0.10) 42%, transparent 70%)'
					}}
				/>
			</motion.div>

			{/* Слабая сетка поверх фона */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[0.16]"
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
					backgroundSize: '72px 72px',
					maskImage:
						'radial-gradient(ellipse 80% 60% at 50% 35%, black 20%, transparent 75%)'
				}}
			/>

			<motion.div
				style={parallax}
				className="relative mx-auto max-w-page px-5 pb-16 pt-16 text-center md:px-8 md:pb-20 md:pt-24"
			>
				<h1 className="display">
					<MaskLines
						delay={0.15}
						lines={[
							{
								text: 'Весь клуб — с телефона',
								className: 'text-lime-soft'
							},
							{
								text: 'Ни журналов, ни компьютера',
								className: 'text-white'
							}
						]}
					/>
				</h1>

				<motion.p
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.7,
						delay: 0.55,
						ease: [0.22, 1, 0.36, 1]
					}}
					className="mx-auto mt-9 max-w-[48ch] text-lg font-semibold leading-snug text-muted md:mt-11 md:text-[26px]"
				>
					Продать абонемент, отметить приход, открыть счёт в баре, записать на
					массаж, посмотреть выручку и распечатать отчёт — всё это делается
					прямо со стойки.
				</motion.p>

				<motion.ul
					initial="hidden"
					animate="show"
					variants={{
						hidden: {},
						show: {
							transition: {
								staggerChildren: 0.07,
								delayChildren: 0.7
							}
						}
					}}
					className="mt-10 flex flex-wrap justify-center gap-2.5 md:mt-12 md:gap-3"
				>
					{FACTS.map(f => (
						<motion.li
							key={f}
							variants={{
								hidden: {
									opacity: 0,
									y: 14,
									scale: 0.94
								},
								show: {
									opacity: 1,
									y: 0,
									scale: 1
								}
							}}
							transition={{
								duration: 0.5,
								ease: [0.22, 1, 0.36, 1]
							}}
							className="pill"
						>
							{f}
						</motion.li>
					))}
				</motion.ul>

				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.7,
						delay: 1,
						ease: [0.22, 1, 0.36, 1]
					}}
					className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-14"
				>
					<a
						href="#start"
						className="btn-lime w-full sm:w-auto"
					>
						Подключить зал
					</a>

					<a
						href="#features"
						className="btn-ghost w-full sm:w-auto"
					>
						Что внутри
					</a>
				</motion.div>

				{/* Для клиентов — скачать приложение. Без ссылок блок не показывается */}
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.7,
						delay: 1.15,
						ease: [0.22, 1, 0.36, 1]
					}}
				>
					<StoreButtons
						label="Для клиентов клуба"
						className="mt-8 md:mt-10"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: 1.4,
						duration: 0.8
					}}
					className="mt-14 flex justify-center md:mt-16"
				>
					<ChevronDown
						className="animate-nudge text-muted"
						size={26}
						aria-hidden
					/>
				</motion.div>
			</motion.div>

			{/* Бегущая строка возможностей */}
			<div className="relative border-y border-line bg-surface/40">
				<Marquee items={TICKER} />
			</div>
		</section>
	)
}
