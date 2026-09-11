import { CountUp, MaskLinesOnView, Reveal, Section, SectionHead } from './ui'

const PAIN = [
	{
		t: 'Тетрадь на стойке',
		d: 'Кто пришёл, кто заплатил, сколько осталось посещений — всё держится на памяти администратора'
	},
	{
		t: 'Карта на бумаге',
		d: 'Потерял — восстанавливай. Забыл дома — спорь на входе. Передал другу — никто не заметил'
	},
	{
		t: 'Выручка без разбора',
		d: 'Деньги в кассе есть, а сколько принесли абонементы, сколько бар и услуги — никто не считает'
	},
	{
		t: 'Владелец вслепую',
		d: 'Чтобы узнать, как идут дела, нужно приехать в зал и расспросить администратора'
	}
]

export function Problem() {
	return (
		<Section id="problem">
			<div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
				<SectionHead
					kicker="Как это устроено сейчас"
					title={
						<>
							Клуб работает, пока
							<br className="hidden md:block" /> администратор помнит
						</>
					}
					lead="Пока клуб маленький, тетради хватает. На двухстах клиентах она начинает стоить денег."
				/>

				<div>
					{PAIN.map((p, i) => (
						<Reveal
							key={p.t}
							delay={i * 0.08}
						>
							<div className="flex gap-6 border-b border-line py-6 last:border-0 md:gap-8 md:py-7">
								<span className="shrink-0 text-2xl font-extrabold tracking-tight text-line md:text-3xl">
									{String(i + 1).padStart(2, '0')}
								</span>
								<div>
									<h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
										{p.t}
									</h3>
									<p className="mt-2 text-[15px] leading-relaxed text-muted">
										{p.d}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	)
}

const ROLES = [
	{
		t: 'Клиент',
		d: 'Абонемент, QR-код на вход, записи, бар, замеры',
		accent: true
	},
	{
		t: 'Администратор',
		d: 'Продажи, сканер, счета, запись на услуги',
		accent: true
	},
	{ t: 'Тренер', d: 'Расписание, отметка прихода, замеры клиентов' },
	{ t: 'Специалист', d: 'Свои записи на услуги и заработок' },
	{ t: 'Владелец клуба', d: 'Деньги, каталоги, персонал, отчёты' },
	{ t: 'Владелец платформы', d: 'Залы, заявки, подписки' }
]

export function Roles() {
	return (
		<Section id="roles">
			<div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
				<Reveal className="lg:sticky lg:top-28">
					<p className="kicker">Кто чем пользуется</p>
					<p className="mt-6 text-[8rem] font-extrabold leading-none tracking-[-0.06em] text-lime md:text-[11rem]">
						<CountUp
							to={6}
							duration={1.1}
						/>
					</p>
					<h2 className="h2 mt-3">
						<MaskLinesOnView
							lines={[
								{ text: 'ролей — и каждый' },
								{ text: 'видит только своё' }
							]}
						/>
					</h2>
					<p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
						Администратор не увидит выручку клуба. Тренер — чужих клиентов.
						Клиент — вообще ничего, кроме себя.
					</p>
				</Reveal>

				<div>
					{ROLES.map((r, i) => (
						<Reveal
							key={r.t}
							delay={i * 0.06}
						>
							<div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-5 last:border-0 md:py-6">
								<h3
									className={`min-w-[9rem] text-lg font-bold tracking-tight md:text-xl ${
										r.accent ? 'text-white' : 'text-white/80'
									}`}
								>
									{r.t}
								</h3>
								<p className="text-[15px] text-muted">{r.d}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	)
}
