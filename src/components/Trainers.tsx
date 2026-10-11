// src/components/Trainers.tsx
// Тренеры под контролем: автоотметка по QR, уведомление тренеру,
// разовые тренировки, история и статистика по каждому тренеру.
// Экраны нарисованы вёрсткой, имена вымышленные
import { Bell, Dumbbell, UserCheck, UserX } from 'lucide-react'
import logo from '../assets/logo-dark-small.png'
import { Beam, Glow, TopEdge } from './decor'
import { Bullet, Reveal, Section, SectionHead } from './ui'

// Уведомление тренеру, когда клиент прошёл по QR
function TrainerPush() {
	return (
		<div className='flex gap-3.5 rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md'>
			<img
				src={logo}
				alt=''
				aria-hidden
				className='mt-0.5 h-9 w-9 shrink-0 rounded-[10px] bg-ink object-contain p-1.5'
			/>
			<div className='min-w-0 flex-1'>
				<div className='flex items-baseline gap-3'>
					<p className='flex-1 text-[14px] font-bold leading-tight text-white'>Клиент пришёл</p>
					<span className='shrink-0 text-[11px] text-faint'>сейчас</span>
				</div>
				<p className='mt-1 text-[13px] leading-snug text-muted'>
					Айгерим Нурлан отметилась на входе. Тренировка засчитана, осталось 8 из 12
				</p>
			</div>
		</div>
	)
}

// Месяц тренера — как видит владелец в статистике
function TrainerMonth() {
	const rows = [
		{ l: 'Клиентов с абонементом', v: '14' },
		{ l: 'Проведено тренировок', v: '86' },
		{ l: 'Разовых тренировок', v: '9' },
		{ l: 'Продано на сумму', v: '312 000 ₸', accent: true }
	]

	return (
		<div className='card-grad p-6 md:p-7'>
			<div className='flex items-center gap-3'>
				<span className='grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-[13px] font-black text-ink'>
					ДС
				</span>
				<div>
					<p className='text-[16px] font-extrabold leading-tight text-white'>Данияр Сейткали</p>
					<p className='mt-0.5 text-[12px] text-faint'>Тренер · октябрь</p>
				</div>
			</div>

			<div className='mt-5 overflow-hidden rounded-xl border border-line bg-ink/60'>
				{rows.map((r, i) => (
					<div
						key={r.l}
						className={`flex items-center justify-between gap-4 px-4 py-3 ${
							i > 0 ? 'border-t border-line' : ''
						}`}
					>
						<span className='text-[13px] text-muted'>{r.l}</span>
						<span
							className={`text-[15px] font-extrabold tracking-tight ${
								r.accent ? 'text-lime' : 'text-white'
							}`}
						>
							{r.v}
						</span>
					</div>
				))}
			</div>

			<div className='mt-4 flex items-center gap-3 rounded-xl border border-red-400/25 bg-red-400/[0.06] px-4 py-3'>
				<UserX
					size={16}
					className='shrink-0 text-red-300'
					aria-hidden
				/>
				<p className='text-[13px] leading-snug text-white/85'>3 клиента давно не приходили</p>
			</div>

			<p className='mt-4 text-[11px] text-faint'>Пример с вымышленными данными</p>
		</div>
	)
}

const FEATURES = [
	{
		icon: UserCheck,
		t: 'Отметка без участия людей',
		d: 'Клиент с тренерским абонементом проходит по QR — тренировка списывается сама'
	},
	{
		icon: Bell,
		t: 'Тренер узнаёт сразу',
		d: 'Уведомление «клиент пришёл» приходит тренеру на телефон'
	},
	{
		icon: Dumbbell,
		t: 'Разовая тренировка',
		d: 'Одно занятие с тренером по его цене — продаётся на ресепшене за пару нажатий'
	}
]

export function Trainers() {
	return (
		<Section
			id='trainers'
			className='noise'
			decor={
				<>
					<TopEdge />
					<Beam className='inset-y-0 right-0 w-2/3' />
					<Glow
						className='-left-24 bottom-0'
						size={560}
						strength={0.13}
					/>
				</>
			}
		>
			<div className='grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20'>
				<div>
					<Reveal>
						<span className='inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink'>
							Новое в 1.2 и 1.3
						</span>
					</Reveal>

					<div className='mt-6'>
						<SectionHead
							kicker='Тренеры'
							title='Каждая тренировка — на виду'
							lead='Тренеры приносят клубу большие деньги, и именно здесь они чаще всего проходят мимо кассы. В GoGym каждая тренировка записана с датой и временем.'
						/>
					</div>

					<Reveal delay={0.1}>
						<ul className='mt-8 space-y-4 md:mt-10'>
							<Bullet>
								Тренерские абонементы и разовые тренировки продаёт администратор — деньги проходят
								через клуб
							</Bullet>
							<Bullet>
								По каждому тренеру видно клиентов, проведённые тренировки, разовые занятия и сумму
								продаж за любой период
							</Bullet>
							<Bullet>
								У тренера своя история по месяцам и список клиентов, которые давно не приходили, —
								повод позвонить, пока человек не ушёл
							</Bullet>
							<Bullet>
								Приходы тренеров не смешиваются с посещениями клиентов — цифры на главном экране
								честные
							</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className='relative mx-auto max-w-[460px]'>
						<TrainerMonth />
						<div className='relative -mt-4 ml-6 mr-[-8px] md:ml-12 md:mr-[-28px]'>
							<TrainerPush />
						</div>
					</div>
				</Reveal>
			</div>

			<div className='mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5'>
				{FEATURES.map((f, i) => (
					<Reveal
						key={f.t}
						delay={i * 0.07}
						className='h-full'
					>
						<div className='h-full rounded-2xl border border-line bg-surface p-6'>
							<span className='grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime'>
								<f.icon
									size={18}
									aria-hidden
								/>
							</span>
							<h3 className='mt-4 text-lg font-bold tracking-tight text-white'>{f.t}</h3>
							<p className='mt-2 text-[14px] leading-relaxed text-muted'>{f.d}</p>
						</div>
					</Reveal>
				))}
			</div>

			<Reveal delay={0.12}>
				<p className='mt-10 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold leading-snug text-ink md:mt-12 md:px-7 md:py-6 md:text-base'>
					Тренер не скажет «я провёл больше», клиент — «я не приходил». Спорить не о чем: всё
					записано с датой и временем.
				</p>
			</Reveal>
		</Section>
	)
}
