import { Check } from 'lucide-react'
import { useState } from 'react'
import { Glow, GridBg, LogoMark, TopEdge } from './decor'
import { CountUp, Reveal, Section, SectionHead, TiltCard } from './ui'

type Plan = {
	name: string
	month: number
	year: number
	kztMonth: string
	kztYear: string
	clients: string
	rows: string[]
	hot?: boolean
}

const PLANS: Plan[] = [
	{
		name: 'Standard',
		month: 0,
		year: 0,
		kztMonth: 'Бесплатно',
		kztYear: 'Бесплатно',
		clients: 'до 50 абонементов',
		rows: ['1 владелец', '2 администратора', '5 тренеров']
	},
	{
		name: 'Plus',
		month: 14,
		year: 126,
		kztMonth: '6 900 ₸',
		kztYear: '62 000 ₸',
		clients: '50–150 абонементов',
		rows: ['2 владельца', '5 администраторов', '10 тренеров']
	},
	{
		name: 'Premium',
		month: 35,
		year: 315,
		kztMonth: '16 900 ₸',
		kztYear: '152 000 ₸',
		clients: '150–300 абонементов',
		rows: ['3 владельца', '8 администраторов', '20 тренеров']
	},
	{
		name: 'Pro',
		month: 60,
		year: 540,
		kztMonth: '28 900 ₸',
		kztYear: '260 000 ₸',
		clients: 'от 300, без ограничений',
		rows: ['5 владельцев', '10 администраторов', '40 тренеров'],
		hot: true
	}
]

const INCLUDED = [
	'Вход по QR-коду',
	'Абонементы и продление',
	'Тренеры и расписание',
	'Услуги, пакеты, записи',
	'Бар со складом и счетами',
	'Статистика и печать отчётов',
	'Замеры клиентов',
	'Push-уведомления',
	'Парные абонементы',
	'Журнал правок',
	'Обращения клиентов',
	'Выгрузка в таблицы'
]

export function Pricing() {
	const [year, setYear] = useState(false)

	return (
		<Section
			id="pricing"
			className="noise"
			decor={
				<>
					<TopEdge />
					<GridBg
						step={64}
						fade="radial-gradient(ellipse 75% 65% at 50% 25%, black 10%, transparent 78%)"
					/>
					<Glow
						className="right-0 top-1/3"
						size={640}
						strength={0.16}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Тарифы"
				title="Платите за размер клуба, а не за функции"
				lead="Во всех планах одно и то же приложение. Отличается только предел по числу действующих абонементов и персонала."
				center
			/>

			{/* Переключатель периода */}
			<Reveal delay={0.08}>
				<div className="mt-10 flex justify-center md:mt-12">
					<div className="inline-flex rounded-full border border-line bg-surface p-1">
						<button
							type="button"
							onClick={() => setYear(false)}
							className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
								!year ? 'bg-lime text-ink' : 'text-muted hover:text-white'
							}`}
						>
							На месяц
						</button>
						<button
							type="button"
							onClick={() => setYear(true)}
							className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
								year ? 'bg-lime text-ink' : 'text-muted hover:text-white'
							}`}
						>
							На год
							<span
								className={`rounded-full px-2 py-0.5 text-[11px] ${
									year ? 'bg-ink/15 text-ink' : 'bg-lime/15 text-lime'
								}`}
							>
								−25%
							</span>
						</button>
					</div>
				</div>
			</Reveal>

			{/* Карточки */}
			<div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
				{PLANS.map((p, i) => (
					<Reveal
						key={p.name}
						delay={i * 0.07}
						className="h-full"
					>
						<TiltCard className="h-full">
							<div
								className={`flex h-full flex-col rounded-2xl p-7 transition ${
									p.hot ? 'bg-lime text-ink' : 'card-grad text-white'
								}`}
							>
								{p.hot && (
									<span className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">
										Без ограничений
									</span>
								)}

								<h3
									className={`text-xl font-extrabold tracking-tight ${
										p.hot ? 'text-ink' : 'text-white'
									}`}
								>
									{p.name}
								</h3>

								<p
									className={`mt-4 text-3xl font-extrabold tracking-tight ${
										p.hot ? 'text-ink' : 'text-white'
									}`}
								>
									{year ? p.kztYear : p.kztMonth}
								</p>
								<p
									className={`mt-1 text-xs ${p.hot ? 'text-ink/60' : 'text-faint'}`}
								>
									{p.month === 0
										? 'навсегда'
										: `${year ? p.year : p.month} $ · ${year ? 'в год' : 'в месяц'}`}
								</p>

								<span
									aria-hidden
									className={`my-6 block h-px w-full ${
										p.hot ? 'bg-ink/15' : 'bg-line'
									}`}
								/>

								<p
									className={`text-[15px] font-bold ${
										p.hot ? 'text-ink' : 'text-white'
									}`}
								>
									{p.clients}
								</p>

								<ul
									className={`mt-4 space-y-2 text-sm ${
										p.hot ? 'text-ink/70' : 'text-muted'
									}`}
								>
									{p.rows.map(r => (
										<li key={r}>{r}</li>
									))}
								</ul>
							</div>
						</TiltCard>
					</Reveal>
				))}
			</div>

			<Reveal delay={0.1}>
				<p className="mt-6 text-center text-sm text-faint">
					Год стоит как девять месяцев. Сумма в тенге может отличаться из-за
					курса.
				</p>
			</Reveal>

			{/* Что входит */}
			<Reveal delay={0.1}>
				<div className="card-grad mt-16 p-7 md:mt-20 md:p-10">
					<h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
						Всё это есть даже на бесплатном плане
					</h3>

					<ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
						{INCLUDED.map(f => (
							<li
								key={f}
								className="flex items-center gap-3"
							>
								<Check
									size={16}
									className="shrink-0 text-lime"
									aria-hidden
								/>
								<span className="text-[15px] text-white/90">{f}</span>
							</li>
						))}
					</ul>

					<p className="mt-8 text-sm leading-relaxed text-muted">
						Тариф считается только по действующим абонементам. Сотрудники,
						услуги, товары бара и посещения на цену не влияют. Парный абонемент
						считается за один.
					</p>
				</div>
			</Reveal>
		</Section>
	)
}

// ── Пробный месяц ──
const TIMELINE = [
	{ d: 'День 1', t: 'Создаём клуб, открываем полный доступ', on: true },
	{ d: 'День 23', t: 'Напоминаем и показываем подходящий тариф', on: true },
	{ d: 'День 30', t: 'Пробный месяц закончился — даём ещё неделю', on: true },
	{
		d: 'День 37',
		t: 'Переход на бесплатный Standard, если не выбрали',
		on: false
	}
]

export function Trial() {
	return (
		<Section
			decor={
				<>
					<LogoMark
						className="-left-20 bottom-0"
						width={820}
						opacity={0.04}
					/>
					<Glow
						className="left-1/3 top-0"
						size={600}
						strength={0.14}
					/>
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<Reveal>
					<p className="kicker">Начало работы</p>
					<p className="mt-5 text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-lime md:text-[10rem]">
						<CountUp
							to={30}
							duration={1.4}
						/>
					</p>
					<h2 className="h2 mt-2">дней полного доступа</h2>
					<p className="mt-5 max-w-[44ch] text-base leading-relaxed text-muted">
						Без карты и предоплаты. Заводите клиентов, продаёте абонементы,
						настраиваете каталоги — ограничений нет.
					</p>
				</Reveal>

				<div>
					{TIMELINE.map((t, i) => (
						<Reveal
							key={t.d}
							delay={i * 0.08}
						>
							<div className="flex gap-5 border-b border-line py-5 last:border-0 md:gap-7 md:py-6">
								<span
									aria-hidden
									className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
										t.on ? 'bg-lime' : 'bg-line'
									}`}
								/>
								<div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
									<span
										className={`min-w-[5.5rem] font-bold tracking-tight ${
											t.on ? 'text-lime' : 'text-faint'
										}`}
									>
										{t.d}
									</span>
									<span
										className={`text-[15px] ${t.on ? 'text-white/90' : 'text-faint'}`}
									>
										{t.t}
									</span>
								</div>
							</div>
						</Reveal>
					))}

					<Reveal delay={0.3}>
						<p className="mt-7 rounded-2xl border border-line bg-surface px-6 py-5 text-[15px] leading-relaxed text-muted">
							Абонементы клиентов продолжат работать в любом случае — даже если
							их больше предела бесплатного плана. Блокируется только продажа
							новых.
						</p>
					</Reveal>
				</div>
			</div>
		</Section>
	)
}
