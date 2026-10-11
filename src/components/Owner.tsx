// src/components/Owner.tsx
// Секции для владельца клуба: статистика, отчёты, настройка, контроль.
// И секция персонала (тренер и специалист)
import { motion } from 'framer-motion'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { M } from '../mockups'
import { DotBg, Glow, GridBg, LogoMark, TopEdge } from './decor'
import { Bullet, Phone, Reveal, Section, SectionHead } from './ui'

// ── Тренеры и специалисты ──
export function Staff() {
	return (
		<Section
			decor={
				<>
					<TopEdge />
					<Glow
						className='left-1/2 top-0 -translate-x-1/2'
						size={700}
						strength={0.1}
					/>
				</>
			}
		>
			<SectionHead
				kicker='Персонал'
				title='Каждый ведёт свою работу сам'
				lead='Тренеру и мастеру не нужно спрашивать на стойке, кто к ним записан.'
			/>

			<div className='mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16'>
				<Reveal>
					<div className='card-grad p-7 md:p-9'>
						<h3 className='text-2xl font-extrabold tracking-tight text-white md:text-3xl'>
							Тренер
						</h3>
						<ul className='mt-6 space-y-3.5'>
							<Bullet>Расписание на две недели вперёд</Bullet>
							<Bullet>Клиент прошёл по QR — тренировка отмечена, тренеру пришло уведомление</Bullet>
							<Bullet>Свои клиенты и остаток тренировок у каждого</Bullet>
							<Bullet>Клиенты, которые давно не приходили, — отдельным списком</Bullet>
							<Bullet>Замеры после занятия — вес, обхваты, динамика</Bullet>
							<Bullet>История и статистика по месяцам</Bullet>
						</ul>

						<div className='mt-9 grid grid-cols-2 gap-6'>
							<Phone
								src={M.trainerSchedule}
								label='Расписание'
							/>
							<Phone
								src={M.trainerClient}
								label='Карточка клиента'
							/>
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<div className='card-grad p-7 md:p-9'>
						<h3 className='text-2xl font-extrabold tracking-tight text-white md:text-3xl'>
							Специалист
						</h3>
						<p className='mt-2 text-sm text-faint'>Массажист, косметолог, диетолог</p>
						<ul className='mt-6 space-y-3.5'>
							<Bullet>Записи по дням, ближайший клиент крупно на экране</Bullet>
							<Bullet>Отметка прихода одним нажатием</Bullet>
							<Bullet>Заработок за неделю и месяц</Bullet>
							<Bullet>Разбивка по услугам и средний чек за сеанс</Bullet>
							<Bullet>Считаются только сеансы, где отмечен приход клиента</Bullet>
						</ul>

						<div className='mt-9 grid grid-cols-2 gap-6'>
							<Phone
								src={M.staffDay}
								label='Записи на день'
							/>
							<Phone
								src={M.staffEarnings}
								label='Заработок'
							/>
						</div>
					</div>
				</Reveal>
			</div>

			<Reveal delay={0.15}>
				<p className='mt-8 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold text-ink md:mt-10 md:px-7 md:py-6 md:text-base'>
					Специалистов можно заводить сколько угодно на любом тарифе — лимиты касаются только
					абонементов, администраторов и тренеров.
				</p>
			</Reveal>
		</Section>
	)
}

// ── Деньги и загрузка зала ──
const SOURCES = [
	{ t: 'Абонементы клуба', w: 100 },
	{ t: 'Тренерские абонементы', w: 72 },
	{ t: 'Разовые тренировки', w: 30 },
	{ t: 'Услуги и пакеты', w: 46 },
	{ t: 'Бар', w: 22 }
]

// Сколько человек одновременно было в зале по часам — пример
const HOURS = [6, 9, 7, 5, 4, 5, 6, 5, 7, 11, 16, 23, 21, 15, 9, 4].map((v, i) => ({ h: 7 + i, v }))
const PEAK = Math.max(...HOURS.map(h => h.v))

const TOP = [
	{ t: 'Протеиновый коктейль', n: 64 },
	{ t: 'Безлимит на месяц', n: 38 },
	{ t: '12 посещений', n: 27 }
]

// Экран статистики, нарисованный вёрсткой — не устаревает вместе с приложением
function StatsMock() {
	return (
		<div className='card-grad p-5 md:p-7'>
			{/* Период по календарю */}
			<div className='flex items-center justify-between gap-3'>
				<p className='text-lg font-extrabold tracking-tight text-white'>Статистика</p>
				<span className='flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-bold text-white'>
					<CalendarDays
						size={13}
						className='text-lime'
						aria-hidden
					/>
					1–31 октября
				</span>
			</div>

			{/* Главные числа */}
			<div className='mt-5 grid grid-cols-3 gap-2'>
				{[
					{ l: 'Выручка', v: '1,25 млн ₸' },
					{ l: 'Посещений', v: '1 312' },
					{ l: 'Пик в зале', v: `${PEAK} чел.` }
				].map(k => (
					<div
						key={k.l}
						className='rounded-xl border border-line bg-ink/60 px-3 py-3'
					>
						<p className='text-[11px] text-faint'>{k.l}</p>
						<p className='mt-1 text-[15px] font-extrabold tracking-tight text-white md:text-lg'>
							{k.v}
						</p>
					</div>
				))}
			</div>

			{/* Загрузка по часам */}
			<div className='mt-5 rounded-xl border border-line bg-ink/60 p-4'>
				<div className='flex items-baseline justify-between gap-3'>
					<p className='text-[13px] font-bold text-white'>Сколько людей одновременно</p>
					<p className='text-[11px] text-faint'>по часам</p>
				</div>

				<div className='mt-4 flex h-28 items-end gap-[3px]'>
					{HOURS.map(h => (
						<div
							key={h.h}
							className='flex h-full flex-1 flex-col justify-end'
						>
							<motion.span
								className={`block w-full rounded-t-[3px] ${
									h.v === PEAK ? 'bg-lime' : 'bg-lime/35'
								}`}
								initial={{ height: 0 }}
								whileInView={{ height: `${(h.v / PEAK) * 100}%` }}
								viewport={{ once: true, margin: '-60px' }}
								transition={{
									duration: 0.8,
									delay: 0.1 + h.h * 0.015,
									ease: [0.22, 1, 0.36, 1]
								}}
							/>
						</div>
					))}
				</div>

				<div className='mt-1.5 flex justify-between text-[10px] text-faint'>
					<span>07:00</span>
					<span>12:00</span>
					<span>17:00</span>
					<span>22:00</span>
				</div>
				<p className='mt-3 text-[12px] text-muted'>
					Пик — <span className='font-bold text-lime'>{PEAK} человек</span> в 18:00
				</p>
			</div>

			{/* Что покупают чаще */}
			<div className='mt-4 rounded-xl border border-line bg-ink/60'>
				<p className='px-4 pt-3.5 text-[13px] font-bold text-white'>Что покупают чаще</p>
				{TOP.map((t, i) => (
					<div
						key={t.t}
						className={`flex items-center gap-3 px-4 py-2.5 ${
							i > 0 ? 'border-t border-line' : 'mt-2 border-t border-line'
						}`}
					>
						<span className='w-4 text-[12px] font-extrabold text-faint'>{i + 1}</span>
						<span className='flex-1 text-[13px] text-white/90'>{t.t}</span>
						<span className='text-[13px] font-bold text-white'>{t.n}</span>
						<ChevronRight
							size={14}
							className='text-faint'
							aria-hidden
						/>
					</div>
				))}
			</div>

			<p className='mt-4 text-[11px] text-faint'>Пример с вымышленными данными</p>
		</div>
	)
}

export function Money() {
	return (
		<Section
			id='money'
			className='noise'
			decor={
				<>
					<GridBg step={56} />
					<Glow
						className='-right-24 top-1/4'
						size={560}
						strength={0.15}
					/>
				</>
			}
		>
			<div className='grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20'>
				<div>
					<SectionHead
						kicker='Владелец клуба'
						title='Клуб как на ладони — из любой точки'
						lead='Не нужно ехать в зал и расспрашивать администратора. Откройте телефон — и увидите, сколько заработали, откуда пришли деньги и когда в зале тесно.'
					/>

					{/* Доли источников */}
					<Reveal delay={0.1}>
						<div className='mt-10 space-y-4'>
							{SOURCES.map(s => (
								<div
									key={s.t}
									className='flex items-center gap-5'
								>
									<span className='w-[48%] shrink-0 text-[15px] text-white/90'>{s.t}</span>
									<span className='h-1.5 flex-1 overflow-hidden rounded-full bg-surface2'>
										<motion.span
											className='block h-full rounded-full bg-lime'
											initial={{ width: 0 }}
											whileInView={{ width: `${s.w}%` }}
											viewport={{ once: true, margin: '-80px' }}
											transition={{
												duration: 1,
												delay: 0.15,
												ease: [0.22, 1, 0.36, 1]
											}}
										/>
									</span>
								</div>
							))}
						</div>
					</Reveal>

					<Reveal delay={0.15}>
						<ul className='mt-10 space-y-4'>
							<Bullet>Любой период по календарю: день, неделя, месяц или свои даты</Bullet>
							<Bullet>
								Пиковая загрузка — сколько человек было в зале одновременно и в какие часы
							</Bullet>
							<Bullet>
								«Что покупают чаще» — какие абонементы, услуги и товары приносят деньги
							</Bullet>
							<Bullet>
								Нажали на цифру — увидели, из чего она сложилась: каждая продажа и каждый клиент
							</Bullet>
							<Bullet>Наличные и безналичные отдельно</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className='mx-auto max-w-[480px]'>
						<StatsMock />
					</div>
				</Reveal>
			</div>
		</Section>
	)
}

// ── Отчёты ──
export function Reports() {
	return (
		<Section
			decor={
				<DotBg fade='radial-gradient(ellipse 55% 70% at 22% 50%, black 5%, transparent 70%)' />
			}
		>
			<div className='grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20'>
				<Reveal className='order-2 lg:order-1'>
					<div className='mx-auto grid max-w-[560px] grid-cols-2 gap-6 md:gap-8'>
						<Phone
							src={M.reportSetup}
							label='Настройка отчёта'
							note='период и вид'
						/>
						<Phone
							src={M.reportPrint}
							label='Готовый отчёт'
							note='печать или PDF'
							className='mt-8'
						/>
					</div>
				</Reveal>

				<div className='order-1 lg:order-2'>
					<SectionHead
						kicker='Отчётность'
						title='Отчёт для бухгалтера — за минуту'
						lead='Выбираете период — получаете документ. Печать, PDF или таблица Excel прямо из приложения.'
					/>

					<Reveal delay={0.1}>
						<ul className='mt-8 space-y-4 md:mt-10'>
							<Bullet>Сегодня, неделя, месяц или любые даты</Bullet>
							<Bullet>Свод по типам или подробно: каждая продажа с датой и клиентом</Bullet>
							<Bullet>
								Абонементы, тренеры, разовые тренировки, услуги и бар — отдельными разделами
							</Bullet>
							<Bullet>Экран, отчёт и Excel считаются одинаково — цифры сходятся до тенге</Bullet>
							<Bullet>Итоги по наличным и безналичным, место для подписи</Bullet>
						</ul>
					</Reveal>
				</div>
			</div>
		</Section>
	)
}

// ── Настройка клуба ──
const SETUP = [
	{ t: 'Абонементы', d: 'Сроки, посещения, цены, часы, VIP, парные' },
	{ t: 'Тренеры', d: 'Карточки, цена абонемента и разовой тренировки' },
	{ t: 'Услуги', d: 'Длительность, мастера, часы работы каждого' },
	{ t: 'Пакеты', d: 'Комбо из нескольких услуг со скидкой' },
	{ t: 'Бар', d: 'Товары, разделы, склад, приход и списание' },
	{ t: 'Персонал', d: 'Администраторы, тренеры, специалисты' }
]

export function Setup() {
	return (
		<Section
			decor={
				<>
					<TopEdge />
					<GridBg
						step={90}
						fade='radial-gradient(ellipse 80% 70% at 50% 30%, black 10%, transparent 80%)'
					/>
				</>
			}
		>
			<SectionHead
				kicker='Под ваш клуб'
				title='Есть бар — включаете бар. Нет массажа — не видите массаж'
				lead='Каталоги, цены и персонал заводит владелец сам, с телефона. Без программиста, без звонков в поддержку, без доплат за настройку.'
			/>

			<div className='mt-12 grid gap-x-10 gap-y-0 md:mt-16 md:grid-cols-3 md:gap-x-12'>
				{SETUP.map((s, i) => (
					<Reveal
						key={s.t}
						delay={(i % 3) * 0.07}
					>
						<div className='border-t border-line py-6 md:py-7'>
							<span
								aria-hidden
								className='block h-[3px] w-10 bg-lime'
							/>
							<h3 className='mt-4 text-xl font-bold tracking-tight text-white md:text-2xl'>
								{s.t}
							</h3>
							<p className='mt-2 text-[15px] leading-relaxed text-muted'>{s.d}</p>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	)
}

// ── Контроль ──
export function Control() {
	return (
		<Section
			decor={
				<>
					<LogoMark
						className='-right-32 bottom-0'
						width={720}
						opacity={0.03}
					/>
					<Glow
						className='left-0 top-1/3'
						size={520}
						strength={0.12}
					/>
				</>
			}
		>
			<div className='grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20'>
				<div>
					<SectionHead
						kicker='Прозрачность'
						title='Ничего не пройдёт мимо'
						lead='Любая правка остаётся в журнале — с именем того, кто её сделал, и причиной. Задним числом ничего не подправить незаметно.'
					/>

					<Reveal delay={0.1}>
						<ul className='mt-8 space-y-4 md:mt-10'>
							<Bullet>Журнал правок: что изменили в абонементе, было и стало</Bullet>
							<Bullet>Абонементы без даты продажи подсвечиваются отдельно</Bullet>
							<Bullet>Обращения клиентов и жалобы на персонал — лентой</Bullet>
							<Bullet>Кто сейчас в зале — список в реальном времени</Bullet>
							<Bullet>Неоплаченные счета и движения по складу</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className='mx-auto grid max-w-[640px] grid-cols-2 gap-6 md:gap-8'>
						<Phone
							src={M.auditLog}
							label='Журнал правок'
						/>
						<Phone
							src={M.feedback}
							label='Обращения'
							className='mt-10'
						/>
					</div>
				</Reveal>
			</div>
		</Section>
	)
}
