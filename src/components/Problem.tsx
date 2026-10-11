// src/components/Problem.tsx
// Боль владельца: каждая проблема сразу с ответом, как это закрывает GoGym.
// Ниже — роли в приложении
import { ArrowRight } from 'lucide-react'
import { DotBg, Glow, LogoMark, TopEdge } from './decor'
import { CountUp, MaskLinesOnView, Reveal, Section, SectionHead } from './ui'

const PAIN = [
	{
		t: 'Клиент не продлил — никто не заметил',
		d: 'Абонемент закончился, человек просто перестал ходить. Ему никто не напомнил, а вы даже не узнали, что потеряли клиента.',
		fix: 'Приложение само напоминает клиенту, что абонемент заканчивается'
	},
	{
		t: 'Наличные без следа',
		d: 'Абонемент продали за наличные, в тетрадь не записали. Были деньги или нет — проверить нечем.',
		fix: 'Каждая продажа с суммой, способом оплаты, временем и именем администратора. Любая правка — в журнале'
	},
	{
		t: 'Тренировки мимо кассы',
		d: 'Тренер договаривается с клиентом напрямую. Клуб даёт зал и железо, а сколько на этом заработано — не видит.',
		fix: 'Тренерские абонементы и разовые тренировки идут через ресепшн, приход клиента отмечается сам по QR'
	},
	{
		t: 'Спор на входе',
		d: 'Клиент уверен, что осталось четыре посещения, администратор видит два. Прав обычно тот, кто громче.',
		fix: 'У клиента в телефоне тот же остаток, что у администратора на экране'
	},
	{
		t: 'Поменять цену — целое дело',
		d: 'Поднять стоимость или завести новый абонемент нельзя без человека, который настраивал программу.',
		fix: 'Цены, абонементы, услуги и тренеров владелец меняет сам, с телефона, за минуту'
	},
	{
		t: 'Владелец вслепую',
		d: 'Чтобы понять, как идут дела, нужно ехать в зал и расспрашивать администратора.',
		fix: 'Выручка, посещения и загрузка зала — в телефоне в любой момент'
	}
]

export function Problem() {
	return (
		<Section
			id='problem'
			className='noise'
			decor={
				<>
					<TopEdge />
					<DotBg />
					<Glow
						className='-right-40 top-10'
						size={520}
						strength={0.14}
					/>
				</>
			}
		>
			<div className='grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20'>
				<div className='lg:sticky lg:top-28 lg:self-start'>
					<SectionHead
						kicker='Узнаёте свой клуб?'
						title='Деньги уходят тихо — и вы узнаёте последним'
						lead='Дело не в плохих сотрудниках. Пока учёт держится на тетради и памяти администратора, клуб теряет клиентов и выручку, которых никто не видит.'
					/>

					<Reveal delay={0.15}>
						<a
							href='#loss'
							className='btn-ghost mt-9 hidden lg:inline-flex'
						>
							Посчитать, сколько теряет мой клуб
						</a>
					</Reveal>
				</div>

				<div>
					{PAIN.map((p, i) => (
						<Reveal
							key={p.t}
							delay={Math.min(i, 3) * 0.06}
						>
							<div className='flex gap-6 border-b border-line py-7 last:border-0 md:gap-8 md:py-8'>
								<span className='shrink-0 text-2xl font-extrabold tracking-tight text-line md:text-3xl'>
									{String(i + 1).padStart(2, '0')}
								</span>
								<div>
									<h3 className='text-lg font-bold tracking-tight text-white md:text-xl'>{p.t}</h3>
									<p className='mt-2 text-[15px] leading-relaxed text-muted'>{p.d}</p>
									<p className='mt-4 flex gap-2.5 text-[15px] font-semibold leading-snug text-lime'>
										<ArrowRight
											size={17}
											className='mt-[2px] shrink-0'
											aria-hidden
										/>
										<span>{p.fix}</span>
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
		t: 'Владелец клуба',
		d: 'Выручка, загрузка зала, тренеры, акции, персонал, отчёты',
		accent: true
	},
	{
		t: 'Администратор',
		d: 'Продажи, сканер QR, счета в баре, записи, разовые тренировки',
		accent: true
	},
	{
		t: 'Тренер',
		d: 'Расписание, свои клиенты, замеры, история за месяц'
	},
	{ t: 'Специалист', d: 'Свои записи на услуги и заработок' },
	{ t: 'Клиент', d: 'Абонемент, QR на вход, страница клуба, записи, бар' },
	{ t: 'Владелец платформы', d: 'Залы, заявки, подписки' }
]

export function Roles() {
	return (
		<Section
			id='roles'
			decor={
				<>
					<LogoMark
						className='-left-24 top-1/2 -translate-y-1/2'
						width={900}
						opacity={0.035}
					/>
					<Glow
						className='left-1/4 top-0'
						size={560}
						strength={0.12}
					/>
				</>
			}
		>
			<div className='grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-20'>
				<Reveal className='lg:sticky lg:top-28'>
					<p className='kicker'>Одно приложение на весь клуб</p>
					<p className='mt-6 text-[8rem] font-extrabold leading-none tracking-[-0.06em] text-lime md:text-[11rem]'>
						<CountUp
							to={6}
							duration={1.1}
						/>
					</p>
					<h2 className='h2 mt-3'>
						<MaskLinesOnView
							lines={[{ text: 'ролей — и каждый' }, { text: 'видит только своё' }]}
						/>
					</h2>
					<p className='mt-5 max-w-[42ch] text-base leading-relaxed text-muted'>
						Администратор не увидит выручку клуба. Тренер — чужих клиентов. Клиент — ничего, кроме
						себя. Всё видит только владелец.
					</p>
				</Reveal>

				<div>
					{ROLES.map((r, i) => (
						<Reveal
							key={r.t}
							delay={i * 0.06}
						>
							<div className='flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-5 last:border-0 md:py-6'>
								<h3
									className={`min-w-[9rem] text-lg font-bold tracking-tight md:text-xl ${
										r.accent ? 'text-white' : 'text-white/80'
									}`}
								>
									{r.t}
								</h3>
								<p className='text-[15px] text-muted'>{r.d}</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	)
}
