// src/components/Trainers.tsx
// Тренеры под контролем: автоотметка по QR, уведомление тренеру,
// разовые тренировки, история и статистика по каждому тренеру.
// Экраны — настоящие скриншоты из mockups.ts
import { Bell, Dumbbell, UserCheck } from 'lucide-react'
import { M } from '../mockups'
import { Beam, Glow, TopEdge } from './decor'
import {
	Bullet,
	PhoneSwitcher,
	Reveal,
	Section,
	SectionHead
} from './ui'

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
			id="trainers"
			className="noise"
			decor={
				<>
					<TopEdge />
					<Beam className="inset-y-0 right-0 w-2/3" />
					<Glow
						className="-left-24 bottom-0"
						size={560}
						strength={0.13}
					/>
				</>
			}
		>
			<div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
				<div>
					<Reveal>
						<span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
							Новое в 1.2 и 1.3
						</span>
					</Reveal>

					<div className="mt-6">
						<SectionHead
							kicker="Тренеры"
							title="Каждая тренировка — на виду"
							lead="Тренеры приносят клубу большие деньги, и именно здесь они чаще всего проходят мимо кассы. В GoGym Fitness каждая тренировка записана с датой и временем."
						/>
					</div>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								Тренерские абонементы и разовые тренировки продаёт
								администратор — деньги проходят через клуб
							</Bullet>
							<Bullet>
								По каждому тренеру видно клиентов, проведённые тренировки,
								разовые занятия и сумму продаж за любой период
							</Bullet>
							<Bullet>
								У тренера своя история по месяцам и список клиентов, которые
								давно не приходили, — повод позвонить, пока человек не ушёл
							</Bullet>
							<Bullet>
								Приходы тренеров не смешиваются с посещениями клиентов — цифры
								на главном экране честные
							</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<PhoneSwitcher
						items={[
							{
								label: 'Клиент пришёл',
								note: 'уведомление тренеру после входа по QR',
								src: M.trainerPush
							},
							{
								label: 'Тренер в статистике',
								note: 'клиенты, тренировки и деньги — у владельца',
								src: M.trainerStats
							},
							{
								label: 'История',
								note: 'тренировки тренера по месяцам',
								src: M.trainerHistory
							},
							{
								label: 'Давно не приходили',
								note: 'кому позвонить, пока не ушёл',
								src: M.trainerInactive
							},
							{
								label: 'Разовая',
								note: 'продажа одной тренировки на ресепшене',
								src: M.singleTraining
							}
						]}
					/>
				</Reveal>
			</div>

			<div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
				{FEATURES.map((f, i) => (
					<Reveal
						key={f.t}
						delay={i * 0.07}
						className="h-full"
					>
						<div className="h-full rounded-2xl border border-line bg-surface p-6">
							<span className="grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime">
								<f.icon
									size={18}
									aria-hidden
								/>
							</span>
							<h3 className="mt-4 text-lg font-bold tracking-tight text-white">
								{f.t}
							</h3>
							<p className="mt-2 text-[14px] leading-relaxed text-muted">
								{f.d}
							</p>
						</div>
					</Reveal>
				))}
			</div>

			<Reveal delay={0.12}>
				<p className="mt-10 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold leading-snug text-ink md:mt-12 md:px-7 md:py-6 md:text-base">
					Тренер не скажет «я провёл больше», клиент — «я не приходил». Спорить
					не о чем: всё записано с датой и временем.
				</p>
			</Reveal>
		</Section>
	)
}
