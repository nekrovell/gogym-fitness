import { motion } from 'framer-motion'
import { M } from '../mockups'
import { DotBg, Glow, GridBg, LogoMark, TopEdge } from './decor'
import { Bullet, Phone, Reveal, Section, SectionHead, Shot } from './ui'

// ── Тренеры и специалисты ──
export function Staff() {
	return (
		<Section
			decor={
				<>
					<TopEdge />
					<Glow
						className="left-1/2 top-0 -translate-x-1/2"
						size={700}
						strength={0.1}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Персонал"
				title="Каждый ведёт свою работу сам"
				lead="Тренеру и мастеру не нужно спрашивать на стойке, кто к ним записан."
			/>

			<div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
				<Reveal>
					<div className="card-grad p-7 md:p-9">
						<h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
							Тренер
						</h3>
						<ul className="mt-6 space-y-3.5">
							<Bullet>Расписание на две недели вперёд</Bullet>
							<Bullet>Отметка прихода клиента одним нажатием</Bullet>
							<Bullet>Свои клиенты и остаток тренировок у каждого</Bullet>
							<Bullet>Замеры после занятия — вес, обхваты, динамика</Bullet>
							<Bullet>
								Своя статистика: сколько провёл, сколько пропустили
							</Bullet>
							<Bullet>Выгрузка в таблицу за любой период</Bullet>
						</ul>

						<div className="mt-8 grid grid-cols-2 gap-5">
							<Phone
								src={M.trainerSchedule}
								label="Расписание"
							/>
							<Phone
								src={M.trainerClient}
								label="Карточка клиента"
							/>
						</div>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<div className="card-grad p-7 md:p-9">
						<h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
							Специалист
						</h3>
						<p className="mt-2 text-sm text-faint">
							Массажист, косметолог, диетолог
						</p>
						<ul className="mt-6 space-y-3.5">
							<Bullet>Записи по дням, ближайший клиент крупно на экране</Bullet>
							<Bullet>Отметка прихода одним нажатием</Bullet>
							<Bullet>Заработок за неделю и месяц</Bullet>
							<Bullet>Разбивка по услугам и средний чек за сеанс</Bullet>
							<Bullet>
								Считаются только сеансы, где отмечен приход клиента
							</Bullet>
						</ul>

						<div className="mt-8 grid grid-cols-2 gap-5">
							<Phone
								src={M.staffDay}
								label="Записи на день"
							/>
							<Phone
								src={M.staffEarnings}
								label="Заработок"
							/>
						</div>
					</div>
				</Reveal>
			</div>

			<Reveal delay={0.15}>
				<p className="mt-8 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold text-ink md:mt-10 md:px-7 md:py-6 md:text-base">
					Специалистов можно заводить сколько угодно на любом тарифе — лимиты
					касаются только абонементов, администраторов и тренеров.
				</p>
			</Reveal>
		</Section>
	)
}

// ── Деньги ──
const SOURCES = [
	{ t: 'Абонементы клуба', w: 100 },
	{ t: 'Тренерские абонементы', w: 72 },
	{ t: 'Разовые визиты на услуги', w: 48 },
	{ t: 'Пакеты услуг', w: 34 },
	{ t: 'Бар', w: 22 }
]

export function Money() {
	return (
		<Section
			id="money"
			className="noise"
			decor={
				<>
					<GridBg step={56} />
					<Glow
						className="-right-24 top-1/4"
						size={560}
						strength={0.15}
					/>
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<div>
					<SectionHead
						kicker="Владелец клуба"
						title="Видно, откуда пришли деньги"
						lead="Не общая сумма в кассе, а разбивка по источникам за любой период."
					/>

					<Reveal delay={0.1}>
						<div className="mt-9 space-y-4 md:mt-11">
							{SOURCES.map(s => (
								<div
									key={s.t}
									className="flex items-center gap-5"
								>
									<span className="w-[52%] shrink-0 text-[15px] text-white/90">
										{s.t}
									</span>
									<span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface2">
										<motion.span
											className="block h-full rounded-full bg-lime"
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

					<Reveal delay={0.2}>
						<ul className="mt-9 space-y-4 md:mt-11">
							<Bullet>День, неделя, месяц, три месяца — календарные</Bullet>
							<Bullet>Наличные и безналичные считаются отдельно</Bullet>
							<Bullet>Топ проданных позиций и средний чек</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className="space-y-4">
						<Shot
							src={M.stats}
							label="Статистика владельца"
							note="общий доход и периоды"
							className="h-[240px] md:h-[300px]"
						/>
						<Shot
							src={M.revenue}
							label="Разбивка по источникам"
							note="доли и суммы"
							className="h-[200px] md:h-[240px]"
						/>
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
				<DotBg fade="radial-gradient(ellipse 55% 70% at 22% 50%, black 5%, transparent 70%)" />
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<Reveal className="order-2 lg:order-1">
					<div className="grid grid-cols-2 gap-5">
						<Phone
							src={M.reportSetup}
							label="Настройка отчёта"
							note="период и вид"
						/>
						<Shot
							src={M.reportPrint}
							label="Печатная форма"
							note="PDF или принтер"
							className="h-full min-h-[320px]"
						/>
					</div>
				</Reveal>

				<div className="order-1 lg:order-2">
					<SectionHead
						kicker="Отчётность"
						title="Отчёт, который можно распечатать"
						lead="Выбираете период и вид — получаете документ. Печать на принтер или сохранение в PDF прямо из приложения."
					/>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>Сегодня, неделя или конкретный месяц</Bullet>
							<Bullet>
								Свод по типам или подробно: каждая продажа с датой и клиентом
							</Bullet>
							<Bullet>
								Абонементы, тренеры, услуги и бар — отдельными разделами
							</Bullet>
							<Bullet>
								Итоги по наличным и безналичным, место для подписи
							</Bullet>
						</ul>
					</Reveal>
				</div>
			</div>
		</Section>
	)
}

// ── Настройка клуба ──
const SETUP = [
	{ t: 'Абонементы', d: 'Сроки, посещения, цены, VIP, парные' },
	{ t: 'Тренеры', d: 'Карточки, цены, количество тренировок' },
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
						fade="radial-gradient(ellipse 80% 70% at 50% 30%, black 10%, transparent 80%)"
					/>
				</>
			}
		>
			<SectionHead
				kicker="Настройка"
				title="Клуб настраивает себя сам"
				lead="Каталоги, цены и персонал заводит владелец — без звонков в поддержку."
			/>

			<div className="mt-12 grid gap-x-10 gap-y-0 md:mt-16 md:grid-cols-3 md:gap-x-12">
				{SETUP.map((s, i) => (
					<Reveal
						key={s.t}
						delay={(i % 3) * 0.07}
					>
						<div className="border-t border-line py-6 md:py-7">
							<span
								aria-hidden
								className="block h-[3px] w-10 bg-lime"
							/>
							<h3 className="mt-4 text-xl font-bold tracking-tight text-white md:text-2xl">
								{s.t}
							</h3>
							<p className="mt-2 text-[15px] leading-relaxed text-muted">
								{s.d}
							</p>
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
						className="-right-32 bottom-0"
						width={720}
						opacity={0.03}
					/>
					<Glow
						className="left-0 top-1/3"
						size={520}
						strength={0.12}
					/>
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<div>
					<SectionHead
						kicker="Прозрачность"
						title="Ничего не пройдёт мимо"
						lead="Любая правка остаётся в журнале — с именем того, кто её сделал, и причиной."
					/>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								Журнал правок: что изменили в абонементе, было и стало
							</Bullet>
							<Bullet>
								Абонементы без даты продажи подсвечиваются отдельно
							</Bullet>
							<Bullet>Обращения клиентов и жалобы на персонал — лентой</Bullet>
							<Bullet>Кто сейчас в зале — список в реальном времени</Bullet>
							<Bullet>Неоплаченные счета и движения по складу</Bullet>
						</ul>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className="mx-auto grid max-w-[540px] grid-cols-2 gap-5">
						<Phone
							src={M.auditLog}
							label="Журнал правок"
						/>
						<Phone
							src={M.feedback}
							label="Обращения"
							className="mt-10"
						/>
					</div>
				</Reveal>
			</div>
		</Section>
	)
}
