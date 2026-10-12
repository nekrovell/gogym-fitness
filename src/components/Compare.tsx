// src/components/Compare.tsx
// Сравнение: тетрадь, программа на компьютере и GoGym Fitness.
// Без названий чужих продуктов — сравниваем подходы, а не конкурентов
import { Check, X } from 'lucide-react'
import { Glow, GridBg } from './decor'
import { Reveal, Section, SectionHead } from './ui'

type Cell = { t: string; ok?: boolean; bad?: boolean }

const COLS = ['Тетрадь и WhatsApp', 'Программа на компьютере', 'GoGym Fitness']

const ROWS: { q: string; v: [Cell, Cell, Cell] }[] = [
	{
		q: 'Что нужно на стойке',
		v: [
			{ t: 'Тетрадь и память администратора', bad: true },
			{ t: 'Компьютер и установка', bad: true },
			{ t: 'Телефон или планшет', ok: true }
		]
	},
	{
		q: 'Владелец видит клуб из дома',
		v: [
			{ t: 'Нет', bad: true },
			{ t: 'Обычно только с рабочего компьютера' },
			{ t: 'Да, 24/7 в телефоне', ok: true }
		]
	},
	{
		q: 'Клиент видит свой остаток',
		v: [
			{ t: 'Нет — спрашивает на стойке', bad: true },
			{ t: 'Чаще нет', bad: true },
			{ t: 'Да, в своём приложении', ok: true }
		]
	},
	{
		q: 'Поменять цену или абонемент',
		v: [
			{ t: 'Переписать прайс' },
			{ t: 'Часто через поддержку или настройщика', bad: true },
			{ t: 'Сами, за минуту', ok: true }
		]
	},
	{
		q: 'Напомнить клиенту о продлении',
		v: [
			{ t: 'Вручную, если вспомнят', bad: true },
			{ t: 'Зависит от программы' },
			{ t: 'Уведомление приходит само', ok: true }
		]
	},
	{
		q: 'Учёт тренировок с тренером',
		v: [
			{ t: 'Со слов тренера', bad: true },
			{ t: 'Вручную' },
			{ t: 'Отметка по QR и статистика по тренерам', ok: true }
		]
	},
	{
		q: 'Сколько стоит',
		v: [
			{ t: 'Бесплатно, но деньги утекают' },
			{ t: 'Покупка, внедрение, абонплата', bad: true },
			{ t: 'Бесплатно до 50 абонементов', ok: true }
		]
	}
]

function Mark({ c }: { c: Cell }) {
	if (c.ok)
		return (
			<Check
				size={16}
				className="mt-[3px] shrink-0 text-lime"
				aria-hidden
			/>
		)
	if (c.bad)
		return (
			<X
				size={16}
				className="mt-[3px] shrink-0 text-red-300/80"
				aria-hidden
			/>
		)
	return (
		<span
			aria-hidden
			className="mt-[9px] h-px w-3 shrink-0 bg-faint"
		/>
	)
}

export function Compare() {
	return (
		<Section
			id="compare"
			decor={
				<>
					<GridBg
						step={70}
						fade="radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 78%)"
					/>
					<Glow
						className="right-0 top-1/4"
						size={560}
						strength={0.12}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Сравните"
				title="Чем GoGym Fitness лучше того, что есть сейчас"
				lead="Большинство клубов работает на тетради или на программе, привязанной к компьютеру на стойке. Вот в чём разница."
			/>

			{/* Широкий экран: таблица */}
			<Reveal delay={0.1}>
				<div className="mt-12 hidden overflow-hidden rounded-2xl border border-line md:mt-14 md:block">
					<div className="grid grid-cols-[1.1fr_1fr_1fr_1.1fr] bg-surface">
						<div className="px-5 py-4" />
						{COLS.map((c, i) => (
							<div
								key={c}
								className={`px-5 py-4 text-[14px] font-extrabold ${
									i === 2 ? 'bg-lime text-ink' : 'text-muted'
								}`}
							>
								{c}
							</div>
						))}
					</div>

					{ROWS.map(r => (
						<div
							key={r.q}
							className="grid grid-cols-[1.1fr_1fr_1fr_1.1fr] border-t border-line"
						>
							<div className="px-5 py-4 text-[14px] font-bold text-white">
								{r.q}
							</div>
							{r.v.map((c, i) => (
								<div
									key={i}
									className={`flex gap-2.5 px-5 py-4 text-[14px] leading-snug ${
										i === 2
											? 'bg-lime/[0.07] font-semibold text-white'
											: 'text-muted'
									}`}
								>
									<Mark c={c} />
									<span>{c.t}</span>
								</div>
							))}
						</div>
					))}
				</div>
			</Reveal>

			{/* Телефон: карточка на каждый вопрос */}
			<div className="mt-10 space-y-3 md:hidden">
				{ROWS.map((r, ri) => (
					<Reveal
						key={r.q}
						delay={Math.min(ri, 3) * 0.05}
					>
						<div className="rounded-2xl border border-line bg-surface p-5">
							<p className="text-[15px] font-bold text-white">{r.q}</p>

							<div className="mt-3 flex gap-2.5 rounded-xl bg-lime/[0.09] px-3.5 py-3 text-[14px] font-semibold text-white">
								<Mark c={r.v[2]} />
								<span>
									<span className="text-lime">GoGym Fitness: </span>
									{r.v[2].t}
								</span>
							</div>

							<div className="mt-3 space-y-2">
								{r.v.slice(0, 2).map((c, i) => (
									<div
										key={i}
										className="flex gap-2.5 text-[13px] leading-snug text-muted"
									>
										<Mark c={c} />
										<span>
											<span className="text-faint">{COLS[i]}: </span>
											{c.t}
										</span>
									</div>
								))}
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	)
}
