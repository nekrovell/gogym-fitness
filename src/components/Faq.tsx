import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo-dark-small.png'
import { RequestForm } from './RequestForm'
import { Beam, DotBg, Glow, TopEdge } from './decor'
import { Reveal, Section, SectionHead } from './ui'

// ── Почему мы ──
const WHY = [
	{
		t: 'Меняете сами, без программиста',
		d: 'Поднять цену, завести новый абонемент, добавить услугу или тренера — это несколько нажатий в приложении. Не нужно ждать, пока кто-то освободится и приедет настраивать'
	},
	{
		t: 'Клиент видит остаток сам',
		d: 'Спорить не о чем: у клиента в телефоне то же число посещений, что у администратора на экране. Списание происходит при сканировании, вручную никто ничего не ставит'
	},
	{
		t: 'Сделано для Казахстана',
		d: 'Тенге, местное время, русский язык. Не переведённая с английского программа, где половина полей не подходит'
	},
	{
		t: 'Клубы не видят друг друга',
		d: 'Разделение данных сделано на уровне базы, а не только на экранах. Администратор одного зала физически не может достать клиентов другого'
	},
	{
		t: 'Запуск за день',
		d: 'Каталоги, цены и персонал владелец заводит сам. Не нужно ждать внедрения и платить за настройку'
	},
	{
		t: 'Поддержка от разработчика',
		d: 'Отвечает человек, который писал систему, а не оператор по скрипту'
	}
]

export function Why() {
	return (
		<Section
			className="noise"
			decor={
				<>
					<TopEdge />
					<Beam className="inset-y-0 left-0 w-3/4" />
					<Glow
						className="-right-32 bottom-0"
						size={560}
						strength={0.13}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Почему мы"
				title="Что меняется в первый же день"
			/>

			<div className="mt-12 grid gap-x-16 md:mt-16 md:grid-cols-2">
				{WHY.map((w, i) => (
					<Reveal
						key={w.t}
						delay={(i % 2) * 0.08}
					>
						<div className="border-b border-line py-7 md:py-8">
							<h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
								{w.t}
							</h3>

							<p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted">
								{w.d}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	)
}

// ── Вопросы ──
const FAQ = [
	{
		q: 'Нужен ли компьютер на ресепшене?',
		a: 'Нет. Администратор работает с телефона или планшета. Всё, что нужно за смену — продажа, сканер, счета — есть в приложении.'
	},
	{
		q: 'Что будет со старыми клиентами и их абонементами?',
		a: 'Заводим их в систему с текущими остатками и сроками. Ничего не теряется, клиент просто скачивает приложение и видит свой абонемент.'
	},
	{
		q: 'У нас уже стоит программа для клуба. Зачем менять?',
		a: 'Посмотрите, сколько времени уходит на простые вещи: поменять цену абонемента, завести новый вид, добавить тренера. Если для этого нужно кого-то звать — вы платите не только за программу, но и за каждое изменение. У нас это делает сам владелец за минуту, с телефона.'
	},
	{
		q: 'А если клиент говорит, что посещений больше, чем показывает система?',
		a: 'Такого разговора не возникает: клиент смотрит на тот же остаток в своём телефоне. Посещение списывается при сканировании кода, вручную его никто не проставляет. Вся история с датами и временем открыта обеим сторонам.'
	},
	{
		q: 'А если интернет пропал?',
		a: 'Приложению нужен интернет на стойке. Мобильного хватает. У клиента интернет для показа QR-кода не обязателен.'
	},
	{
		q: 'Сколько занимает подключение?',
		a: 'День. Мы создаём клуб и выдаём доступ владельцу, дальше он заводит каталоги и персонал сам — это занимает пару часов.'
	},
	{
		q: 'Как считается тариф?',
		a: 'По числу действующих абонементов — тех, что активны и не истекли. Истёкшие не считаются. Парный абонемент считается за один.'
	},
	{
		q: 'Что будет, если превысить лимит тарифа?',
		a: 'Действующие абонементы продолжат работать. Заблокируется только продажа новых, пока не перейдёте на следующий план.'
	},
	{
		q: 'Можно ли перейти на другой тариф?',
		a: 'Да, в любой момент. Данные при этом остаются на месте.'
	},
	{
		q: 'Видит ли администратор выручку клуба?',
		a: 'Нет. Ему доступны продажи и посещения, но не общие деньги, не себестоимость и не настройки цен.'
	}
]

export function Faq() {
	const [open, setOpen] = useState<number | null>(0)

	return (
		<Section
			id="faq"
			decor={
				<DotBg
					step={30}
					fade="radial-gradient(ellipse 50% 60% at 85% 30%, black 5%, transparent 70%)"
				/>
			}
		>
			<SectionHead
				kicker="Вопросы"
				title="То, о чём спрашивают чаще всего"
			/>

			<div className="mt-12 md:mt-14">
				{FAQ.map((f, i) => {
					const isOpen = open === i

					return (
						<Reveal
							key={f.q}
							delay={Math.min(i, 4) * 0.05}
						>
							<div className="border-b border-line">
								<button
									type="button"
									onClick={() => setOpen(isOpen ? null : i)}
									className="flex w-full items-start gap-5 py-6 text-left md:py-7"
									aria-expanded={isOpen}
								>
									<span className="flex-1 text-lg font-bold tracking-tight text-white md:text-xl">
										{f.q}
									</span>

									<span
										className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${
											isOpen ? 'bg-lime text-ink' : 'bg-surface2 text-muted'
										}`}
										aria-hidden
									>
										{isOpen ? <Minus size={15} /> : <Plus size={15} />}
									</span>
								</button>

								<div
									className="grid transition-all duration-300"
									style={{
										gridTemplateRows: isOpen ? '1fr' : '0fr'
									}}
								>
									<div className="overflow-hidden">
										<p className="max-w-[62ch] pb-7 text-[15px] leading-relaxed text-muted">
											{f.a}
										</p>
									</div>
								</div>
							</div>
						</Reveal>
					)
				})}
			</div>
		</Section>
	)
}

// ── Как начать ──
const STEPS = [
	{
		t: 'Заявка',
		d: 'Оставляете заявку здесь или пишете нам'
	},
	{
		t: 'Разговор',
		d: 'Созваниваемся, смотрим, подходит ли вам'
	},
	{
		t: 'Клуб готов',
		d: 'Создаём зал и выдаём доступ владельцу'
	},
	{
		t: 'Настройка',
		d: 'Заводите каталоги, цены и персонал под себя'
	}
]

export function Start() {
	return (
		<Section
			id="start"
			decor={
				<Glow
					className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					size={820}
					strength={0.1}
				/>
			}
		>
			<div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
				{/* Зелёная карточка — только приглашение и шаги */}
				<div className="relative overflow-hidden rounded-3xl bg-lime p-8 md:p-10">
					{/* Узор поверх зелёного */}
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 opacity-[0.07]"
						style={{
							backgroundImage:
								'linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)',
							backgroundSize: '46px 46px'
						}}
					/>

					<img
						src={logo}
						alt=""
						aria-hidden
						className="pointer-events-none absolute -bottom-12 -right-12 w-[320px] select-none opacity-[0.07] md:w-[400px]"
					/>

					<Reveal className="relative">
						<h2 className="h2 max-w-[16ch] text-ink">
							Попробуйте месяц на своём клубе
						</h2>

						<p className="mt-5 max-w-[42ch] text-base leading-relaxed text-ink/70">
							Без карты и предоплаты. Если не подойдёт — просто перестанете
							пользоваться, данные никуда не денутся.
						</p>
					</Reveal>

					<div className="relative mt-9 grid gap-6 sm:grid-cols-2">
						{STEPS.map((s, i) => (
							<Reveal
								key={s.t}
								delay={i * 0.08}
							>
								<div className="border-t border-ink/20 pt-4">
									<span className="text-3xl font-extrabold tracking-tight text-ink/25 md:text-4xl">
										{String(i + 1).padStart(2, '0')}
									</span>

									<h3 className="mt-2 text-base font-bold tracking-tight text-ink">
										{s.t}
									</h3>

									<p className="mt-1.5 text-sm leading-relaxed text-ink/65">
										{s.d}
									</p>
								</div>
							</Reveal>
						))}
					</div>

					<Reveal
						delay={0.2}
						className="relative"
					>
						<div className="mt-9 border-t border-ink/20 pt-7">
							<p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink/50">
								Или напишите напрямую
							</p>

							<div className="mt-4 flex flex-col gap-3 sm:flex-row">
								<a
									href="https://wa.me/77074108415"
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-bold text-white transition hover:bg-ink/85"
								>
									WhatsApp
								</a>

								<a
									href="mailto:gogym.fitness.kz@gmail.com"
									className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 text-[15px] font-bold text-ink transition hover:border-ink/60"
								>
									Почта
								</a>
							</div>
						</div>
					</Reveal>
				</div>

				{/* Заявка уходит прямо в приложение */}
				<Reveal delay={0.12}>
					<RequestForm />
				</Reveal>
			</div>
		</Section>
	)
}

// ── Подвал ──
export function Footer() {
	return (
		<footer className="border-t border-line">
			<div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-16">
				<div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
					<div>
						<img
							src={logo}
							alt="GoGym Fitness"
							className="h-9 w-auto"
						/>

						<p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-muted">
							Система управления фитнес-клубом. Работает на iPhone и Android.
						</p>
					</div>

					<nav className="flex flex-wrap gap-x-8 gap-y-3">
						{[
							['Возможности', '#features'],
							['Роли', '#roles'],
							['Тарифы', '#pricing'],
							['Вопросы', '#faq'],
							['Подключить', '#start'],
							['Конфиденциальность', '/privacy']
						].map(([label, href]) => (
							<a
								key={href}
								href={href}
								className="text-sm text-muted transition-colors hover:text-white"
							>
								{label}
							</a>
						))}
					</nav>

					<div className="text-sm">
						<p className="text-faint">Связаться</p>

						<a
							href="https://wa.me/77074108415"
							target="_blank"
							rel="noreferrer"
							className="mt-2 block font-bold text-white transition hover:text-lime"
						>
							+7 707 410 84 15
						</a>

						<a
							href="mailto:gogym.fitness.kz@gmail.com"
							className="mt-1 block text-muted transition hover:text-white"
						>
							gogym.fitness.kz@gmail.com
						</a>
					</div>
				</div>

				<p className="mt-12 border-t border-line pt-6 text-xs text-faint md:mt-16">
					© {new Date().getFullYear()} GoGym Fitness
				</p>
			</div>
		</footer>
	)
}
