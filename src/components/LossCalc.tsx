// src/components/LossCalc.tsx
// Калькулятор потерь: владелец двигает ползунки со своими цифрами
// и видит, сколько клуб теряет на клиентах, которым никто не напомнил продлить.
// Никаких выдуманных процентов — считаем только то, что ввёл сам владелец
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Glow, GridBg, TopEdge } from './decor'
import { Reveal, Section, SectionHead } from './ui'

// Тариф по числу действующих абонементов — те же границы, что в разделе «Тарифы»
function tariffFor(active: number) {
	if (active <= 50) return { name: 'Standard', price: 0 }
	if (active <= 150) return { name: 'Plus', price: 6900 }
	if (active <= 300) return { name: 'Premium', price: 16900 }
	return { name: 'Pro', price: 28900 }
}

// Деньги в тенге с пробелами между разрядами
function kzt(n: number) {
	return `${Math.round(n).toLocaleString('ru-RU')} ₸`
}

// «вернуть 1 клиента», «вернуть 3 клиентов»
function clientsWord(n: number) {
	return n % 10 === 1 && n % 100 !== 11 ? 'клиента' : 'клиентов'
}

function Slider({
	label,
	value,
	min,
	max,
	step,
	onChange,
	shown
}: {
	label: string
	value: number
	min: number
	max: number
	step: number
	onChange: (v: number) => void
	shown: string
}) {
	return (
		<div>
			<div className='flex items-baseline justify-between gap-4'>
				<span className='text-[14px] font-semibold text-white/85'>{label}</span>
				<span className='text-xl font-extrabold tracking-tight text-white'>{shown}</span>
			</div>
			<input
				type='range'
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={e => onChange(Number(e.target.value))}
				aria-label={label}
				className='mt-3 w-full cursor-pointer'
				style={{ accentColor: '#b8f229' }}
			/>
			<div className='mt-1 flex justify-between text-[11px] text-faint'>
				<span>{min.toLocaleString('ru-RU')}</span>
				<span>{max.toLocaleString('ru-RU')}</span>
			</div>
		</div>
	)
}

// Число, которое мягко сменяется при изменении
function Num({ value, className = '' }: { value: string; className?: string }) {
	return (
		<span className={`relative inline-block ${className}`}>
			<AnimatePresence
				mode='popLayout'
				initial={false}
			>
				<motion.span
					key={value}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.22 }}
					className='inline-block'
				>
					{value}
				</motion.span>
			</AnimatePresence>
		</span>
	)
}

export function LossCalc() {
	const [active, setActive] = useState(120)
	const [price, setPrice] = useState(15000)
	const [lost, setLost] = useState(5)

	// Ушедших не может быть больше четверти клиентов
	const lostMax = Math.max(2, Math.min(40, Math.round(active * 0.25)))
	const lostSafe = Math.min(lost, lostMax)

	const month = lostSafe * price
	const year = month * 12
	const tariff = tariffFor(active)
	const need = tariff.price > 0 ? Math.ceil(tariff.price / price) : 0

	return (
		<Section
			id='loss'
			className='noise'
			decor={
				<>
					<TopEdge />
					<GridBg fade='radial-gradient(ellipse 70% 60% at 70% 50%, black 10%, transparent 78%)' />
					<Glow
						className='-left-32 top-1/3'
						size={620}
						strength={0.14}
					/>
				</>
			}
		>
			<div className='grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20'>
				<div>
					<SectionHead
						kicker='Посчитайте сами'
						title='Во сколько обходится клиент, которому не напомнили'
						lead='Подставьте цифры своего клуба. Считаем только одну потерю — тех, кто молча не продлил абонемент. Наличные мимо тетради и тренировки мимо кассы сюда даже не входят.'
					/>

					<Reveal delay={0.1}>
						<div className='mt-10 space-y-8'>
							<Slider
								label='Действующих абонементов'
								value={active}
								min={20}
								max={500}
								step={10}
								onChange={setActive}
								shown={String(active)}
							/>
							<Slider
								label='Средняя цена абонемента'
								value={price}
								min={5000}
								max={40000}
								step={1000}
								onChange={setPrice}
								shown={kzt(price)}
							/>
							<Slider
								label='Сколько человек в месяц уходят молча'
								value={lostSafe}
								min={0}
								max={lostMax}
								step={1}
								onChange={setLost}
								shown={String(lostSafe)}
							/>
						</div>
					</Reveal>
				</div>

				<Reveal delay={0.15}>
					<div className='card-grad p-7 md:p-9'>
						<p className='text-[12px] font-bold uppercase tracking-[0.16em] text-faint'>
							Клуб недополучает
						</p>

						<p className='mt-4 text-[13px] text-muted'>в месяц</p>
						<p className='text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
							<Num value={kzt(month)} />
						</p>

						<p className='mt-6 text-[13px] text-muted'>за год</p>
						<p className='text-5xl font-extrabold tracking-tight text-lime md:text-6xl'>
							<Num value={kzt(year)} />
						</p>

						<span
							aria-hidden
							className='my-7 block h-px w-full bg-line'
						/>

						{tariff.price === 0 ? (
							<p className='text-[15px] leading-relaxed text-white/90'>
								<span className='font-bold text-lime'>
									Для клуба вашего размера GoGym бесплатен.
								</span>{' '}
								Терять эти деньги просто незачем.
							</p>
						) : (
							<p className='text-[15px] leading-relaxed text-white/90'>
								Тариф {tariff.name} — {kzt(tariff.price)} в месяц.{' '}
								<span className='font-bold text-lime'>
									Он окупится, если вернуть хотя бы {need} {clientsWord(need)} в месяц.
								</span>
							</p>
						)}

						<a
							href='#start'
							className='btn-lime mt-7 w-full text-center'
						>
							Перестать терять — подключить зал
						</a>

						<p className='mt-5 text-[12px] leading-relaxed text-faint'>
							Это прикидка на ваших цифрах. Мы не обещаем вернуть всех — но каждый клиент, который
							продлил, потому что ему напомнили, уже окупает приложение.
						</p>
					</div>
				</Reveal>
			</div>
		</Section>
	)
}
