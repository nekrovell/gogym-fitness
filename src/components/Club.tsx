// src/components/Club.tsx
// Новое в приложении: страница клуба для клиента и акции со скидками.
// Экраны нарисованы вёрсткой — скриншоты не нужны и не устаревают
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
	BadgePercent,
	Camera,
	Car,
	ChevronLeft,
	Clock,
	Droplets,
	Flame,
	Images,
	Navigation,
	Phone as PhoneIcon,
	Wifi
} from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { DotBg, Glow, GridBg, TopEdge } from './decor'
import { Bullet, Reveal, Section, SectionHead } from './ui'

// ─────────────────────────────────────────────────────────────
// Рамка телефона
// ─────────────────────────────────────────────────────────────
function PhoneFrame({
	children,
	className = ''
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div className={`mock-glow mx-auto w-full max-w-[310px] ${className}`}>
			<div className="relative rounded-[46px] border border-white/10 bg-[#19191c] p-[9px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]">
				<div className="relative aspect-[9/19.5] overflow-hidden rounded-[38px] bg-ink">
					{/* Вырез камеры */}
					<div
						aria-hidden
						className="absolute left-1/2 top-2.5 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black"
					/>
					{children}
				</div>
			</div>
		</div>
	)
}

// ─────────────────────────────────────────────────────────────
// Баннер вымышленного клуба
// ─────────────────────────────────────────────────────────────
function DemoBanner({ className = '' }: { className?: string }) {
	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{
				background:
					'radial-gradient(circle at 26% 50%, rgba(184,242,41,0.55) 0%, rgba(184,242,41,0.12) 28%, transparent 52%), linear-gradient(135deg, #141417 0%, #0b0b0d 100%)'
			}}
		>
			{/* Световые полосы */}
			<span
				aria-hidden
				className="absolute -top-4 left-[52%] h-[140%] w-[3px] rotate-[24deg] bg-lime/40 blur-[1px]"
			/>
			<span
				aria-hidden
				className="absolute -top-4 left-[60%] h-[140%] w-px rotate-[24deg] bg-lime/25"
			/>

			{/* Круглый знак */}
			<div className="absolute left-[11%] top-1/2 grid aspect-square w-[30%] -translate-y-1/2 place-items-center rounded-full border-[3px] border-white/85 bg-lime shadow-[0_0_30px_rgba(184,242,41,0.55)]">
				<span className="text-[13px] font-black tracking-tight text-ink">
					ATLAS
				</span>
			</div>

			{/* Текст */}
			<div className="absolute left-[50%] top-1/2 -translate-y-1/2">
				<p className="text-[6px] font-extrabold uppercase tracking-[0.2em] text-lime">
					Тренажёрный зал
				</p>
				<p className="mt-0.5 text-[22px] font-black leading-none tracking-tight text-white">
					ATLAS
				</p>
				<span className="mt-1.5 block h-[2px] w-5 rounded-full bg-lime" />
				<p className="mt-1 text-[6px] text-white/70">Сила начинается здесь</p>
			</div>
		</div>
	)
}

// ─────────────────────────────────────────────────────────────
// Экран «О клубе» — как в приложении
// ─────────────────────────────────────────────────────────────
function GymScreen() {
	const ref = useRef<HTMLDivElement>(null)
	const inView = useInView(ref, { amount: 0.3 })
	const reduce = useReducedMotion()

	// Экран сам медленно прокручивается вниз и обратно
	const scroll = inView && !reduce

	return (
		<div
			ref={ref}
			className="absolute inset-0"
		>
			{/* Размытый баннер под статус-баром */}
			<div
				aria-hidden
				className="absolute inset-x-0 top-0 h-[34%] opacity-70 blur-xl"
				style={{
					background:
						'radial-gradient(circle at 30% 60%, rgba(184,242,41,0.45), transparent 60%), #111113'
				}}
			/>
			<div
				aria-hidden
				className="absolute inset-x-0 top-[18%] h-[18%] bg-gradient-to-b from-transparent to-ink"
			/>

			<motion.div
				className="relative px-3 pb-10 pt-9"
				animate={scroll ? { y: [0, 0, -250, -250, 0] } : { y: 0 }}
				transition={
					scroll
						? {
								duration: 11,
								times: [0, 0.18, 0.5, 0.72, 1],
								ease: 'easeInOut',
								repeat: Infinity
							}
						: { duration: 0.4 }
				}
			>
				{/* Кнопка назад */}
				<span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-white">
					<ChevronLeft size={15} />
				</span>

				{/* Баннер */}
				<DemoBanner className="mt-2.5 aspect-video rounded-2xl" />

				{/* Логотип и название */}
				<div className="mt-3.5 flex items-center gap-2.5">
					<span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-[11px] font-black text-ink">
						AG
					</span>
					<div className="min-w-0">
						<p className="text-[17px] font-extrabold leading-tight tracking-tight text-white">
							Atlas Gym
						</p>
						<p className="truncate text-[10px] text-muted">
							Тараз, ул. Толе би, 45
						</p>
					</div>
				</div>

				{/* Быстрые действия */}
				<div className="mt-3 grid grid-cols-3 gap-1.5">
					<span className="flex h-8 items-center justify-center gap-1 rounded-full bg-lime text-[9px] font-bold text-ink">
						<PhoneIcon size={10} /> Позвонить
					</span>
					<span className="flex h-8 items-center justify-center gap-1 rounded-full border border-line bg-surface text-[9px] font-bold text-white">
						<Navigation
							size={10}
							className="text-lime"
						/>{' '}
						Маршрут
					</span>
					<span className="flex h-8 items-center justify-center gap-1 rounded-full border border-line bg-surface text-[9px] font-bold text-white">
						<Camera
							size={10}
							className="text-lime"
						/>{' '}
						Instagram
					</span>
				</div>

				{/* Плашка акций */}
				<div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-lime p-2.5">
					<span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 text-ink">
						<Flame size={14} />
					</span>
					<div className="flex-1">
						<p className="text-[12px] font-extrabold leading-tight text-ink">
							Скидки до −20%
						</p>
						<p className="text-[9px] font-semibold text-ink/60">
							3 предложения по акции
						</p>
					</div>
					<span className="text-[13px] font-bold text-ink">→</span>
				</div>

				{/* Информация */}
				<div className="mt-2.5 rounded-2xl border border-line bg-surface">
					<div className="flex items-center gap-2 px-2.5 py-2">
						<span className="grid h-6 w-6 place-items-center rounded-full bg-lime/15 text-lime">
							<Clock size={11} />
						</span>
						<div>
							<p className="text-[8px] text-faint">Часы работы</p>
							<p className="text-[10px] font-semibold text-white">
								Пн–Вс 07:00–23:00
							</p>
						</div>
					</div>
				</div>

				{/* Удобства */}
				<p className="mt-4 text-[13px] font-extrabold tracking-tight text-white">
					Удобства
				</p>
				<div className="mt-2 flex flex-wrap gap-1">
					{[
						{ i: Droplets, t: 'Душ' },
						{ i: Flame, t: 'Сауна' },
						{ i: Car, t: 'Парковка' },
						{ i: Wifi, t: 'Wi-Fi' }
					].map(a => (
						<span
							key={a.t}
							className="flex items-center gap-1 rounded-full border border-line bg-surface py-1 pl-1 pr-2 text-[9px] font-semibold text-white"
						>
							<span className="grid h-4 w-4 place-items-center rounded-full bg-lime/15 text-lime">
								<a.i size={8} />
							</span>
							{a.t}
						</span>
					))}
				</div>

				{/* Фото */}
				<p className="mt-4 text-[13px] font-extrabold tracking-tight text-white">
					Фото
				</p>
				<div className="mt-2 grid h-24 grid-cols-[1.6fr_1fr] gap-1">
					<span className="rounded-xl bg-gradient-to-br from-[#2a2a2f] to-[#121214]" />
					<div className="grid gap-1">
						<span className="rounded-xl bg-gradient-to-br from-[#26262b] to-[#131315]" />
						<span className="grid place-items-center rounded-xl bg-[#1d1d21] text-[12px] font-extrabold text-white">
							+6
						</span>
					</div>
				</div>

				{/* Абонементы */}
				<p className="mt-4 text-[13px] font-extrabold tracking-tight text-white">
					Абонементы
				</p>
				<div className="mt-2 flex gap-2">
					<MiniCard
						kind="Безлимит"
						name="Безлимит на месяц"
						meta="Без ограничений · 30 дней"
						price="16 000 ₸"
						old="20 000 ₸"
						promo={20}
					/>
					<MiniCard
						kind="На месяц"
						name="12 посещений"
						meta="12 посещений · 30 дней"
						price="12 000 ₸"
					/>
				</div>
			</motion.div>
		</div>
	)
}

function MiniCard({
	kind,
	name,
	meta,
	price,
	old,
	promo
}: {
	kind: string
	name: string
	meta: string
	price: string
	old?: string
	promo?: number
}) {
	return (
		<div
			className={`w-[72%] shrink-0 rounded-2xl bg-surface p-2.5 ${
				promo ? 'border-[1.5px] border-lime' : 'border border-line'
			}`}
		>
			<div className="flex items-center justify-between">
				<span className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-faint">
					{kind}
				</span>
				{promo && (
					<span className="flex items-center gap-0.5 rounded-full bg-lime px-1.5 py-0.5 text-[8px] font-extrabold text-ink">
						<Flame size={7} />−{promo}%
					</span>
				)}
			</div>
			<p className="mt-1 text-[11px] font-extrabold leading-tight text-white">
				{name}
			</p>
			<p className="mt-0.5 text-[8px] font-semibold text-muted">{meta}</p>
			<div className="mt-3 flex items-baseline gap-1.5">
				<span className="text-[14px] font-extrabold tracking-tight text-white">
					{price}
				</span>
				{old && (
					<span className="text-[8px] text-faint line-through">{old}</span>
				)}
			</div>
			{promo && (
				<p className="text-[8px] font-bold text-lime">Акция до 14 окт.</p>
			)}
		</div>
	)
}

// Плавающая подпись рядом с телефоном
function FloatTag({
	icon,
	title,
	text,
	className = '',
	delay = 0
}: {
	icon: ReactNode
	title: string
	text: string
	className?: string
	delay?: number
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16, scale: 0.96 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
			className={`absolute z-10 hidden w-[210px] items-start gap-3 rounded-2xl border border-line bg-surface/90 p-3.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md lg:flex ${className}`}
		>
			<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
				{icon}
			</span>
			<div>
				<p className="text-[13px] font-bold leading-tight text-white">
					{title}
				</p>
				<p className="mt-1 text-[12px] leading-snug text-muted">{text}</p>
			</div>
		</motion.div>
	)
}

// ─────────────────────────────────────────────────────────────
// Секция: страница клуба
// ─────────────────────────────────────────────────────────────
export function ClubPage() {
	return (
		<Section
			id="club"
			className="noise"
			decor={
				<>
					<TopEdge />
					<GridBg fade="radial-gradient(ellipse 60% 70% at 72% 45%, black 10%, transparent 75%)" />
					<Glow
						className="right-[8%] top-1/4"
						size={620}
						strength={0.18}
					/>
				</>
			}
		>
			<div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
				<div>
					<Reveal>
						<span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
							Новое
						</span>
					</Reveal>

					<div className="mt-6">
						<SectionHead
							kicker="Страница клуба"
							title="У зала своя витрина прямо в приложении"
							lead="Владелец загружает логотип, баннер и фото, пишет описание. Клиент видит клуб, цены и акции ещё до первого визита."
						/>
					</div>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								Логотип, баннер и до 10 фотографий зала — загружаются с
								телефона, приложение само подгоняет размер
							</Bullet>
							<Bullet>
								Часы работы, телефон, адрес и Instagram: клиент звонит и строит
								маршрут одним нажатием
							</Bullet>
							<Bullet>
								Удобства значками — душ, сауна, парковка, кардиозона и ещё
								восемь
							</Bullet>
							<Bullet>
								При регистрации клиент выбирает зал по карточкам с фото, а не из
								списка названий
							</Bullet>
							<Bullet>
								Абонементы и пакеты услуг с ценами видны заранее — оформление
								остаётся на ресепшене
							</Bullet>
						</ul>
					</Reveal>

					<Reveal delay={0.2}>
						<p className="mt-9 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold leading-snug text-ink md:mt-11 md:px-7 md:py-6 md:text-base">
							Новичок приходит уже зная, сколько стоит абонемент и как выглядит
							зал. Администратору не нужно рассказывать одно и то же каждый
							день.
						</p>
					</Reveal>
				</div>

				<Reveal delay={0.1}>
					<div className="relative mx-auto max-w-[520px] py-6">
						<PhoneFrame>
							<GymScreen />
						</PhoneFrame>

						<FloatTag
							icon={<Images size={17} />}
							title="До 10 фото"
							text="Зал, раздевалки, кардиозона"
							className="-left-10 bottom-[10%]"
							delay={0.3}
						/>
						<FloatTag
							icon={<BadgePercent size={17} />}
							title="Акция видна сразу"
							text="Старая цена зачёркнута, дата окончания рядом"
							className="-right-12 top-[40%]"
							delay={0.45}
						/>
					</div>
				</Reveal>
			</div>
		</Section>
	)
}

// ─────────────────────────────────────────────────────────────
// Секция: акции и скидки
// ─────────────────────────────────────────────────────────────
function Chip({ children, on }: { children: ReactNode; on?: boolean }) {
	return (
		<span
			className={`rounded-full px-3 py-1.5 text-[12px] font-bold ${
				on ? 'bg-lime text-ink' : 'border border-line bg-surface2 text-muted'
			}`}
		>
			{children}
		</span>
	)
}

// Владелец включает акцию на тип абонемента
function PromoEditorMock() {
	return (
		<div className="card-grad h-full p-6 md:p-7">
			<p className="kicker">Владелец</p>
			<h3 className="mt-3 text-xl font-extrabold tracking-tight text-white md:text-2xl">
				Включает акцию на абонемент
			</h3>

			<div className="mt-6 rounded-2xl border border-line bg-ink/60 p-4 md:p-5">
				<div className="flex items-center justify-between gap-4">
					<div>
						<p className="text-[14px] font-bold text-white">
							Безлимит на месяц
						</p>
						<p className="mt-0.5 text-[12px] text-faint">20 000 ₸ · 30 дней</p>
					</div>
					{/* Переключатель */}
					<span className="relative h-7 w-12 shrink-0 rounded-full bg-lime">
						<span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-ink" />
					</span>
				</div>

				<p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
					Скидка
				</p>
				<div className="mt-2.5 flex flex-wrap gap-2">
					<Chip>10%</Chip>
					<Chip>15%</Chip>
					<Chip on>20%</Chip>
					<Chip>30%</Chip>
					<Chip>Своя</Chip>
				</div>

				<p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
					Срок
				</p>
				<div className="mt-2.5 flex flex-wrap gap-2">
					<Chip>Неделя</Chip>
					<Chip on>2 недели</Chip>
					<Chip>До конца месяца</Chip>
					<Chip>Без срока</Chip>
				</div>

				<div className="mt-5 flex items-center justify-between rounded-xl bg-surface px-4 py-3">
					<span className="text-[12px] text-muted">Клиент увидит</span>
					<span className="flex items-baseline gap-2">
						<span className="text-[12px] text-faint line-through">
							20 000 ₸
						</span>
						<span className="text-lg font-extrabold tracking-tight text-lime">
							16 000 ₸
						</span>
					</span>
				</div>
			</div>
		</div>
	)
}

// Администратор продаёт со скидкой
function SaleMock() {
	const rows = [
		{ l: 'Клиент', v: 'Айгерим Нурлан' },
		{ l: 'Абонемент', v: 'Безлимит на месяц' },
		{ l: 'Оплата', v: 'Безналичные' },
		{ l: 'Скидка', v: '−20% · акция', accent: true }
	]

	return (
		<div className="card-grad h-full p-6 md:p-7">
			<p className="kicker">Ресепшн</p>
			<h3 className="mt-3 text-xl font-extrabold tracking-tight text-white md:text-2xl">
				Продаёт уже по акции
			</h3>

			<div className="mt-6 rounded-2xl border border-line bg-ink/60 p-4 md:p-5">
				<span
					aria-hidden
					className="mx-auto mb-4 block h-1 w-10 rounded-full bg-line"
				/>
				<p className="text-[15px] font-extrabold tracking-tight text-white">
					Продажа абонемента
				</p>

				<div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface">
					{rows.map((r, i) => (
						<div
							key={r.l}
							className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
								i > 0 ? 'border-t border-line' : ''
							}`}
						>
							<span className="text-[12px] text-muted">{r.l}</span>
							<span
								className={`text-right text-[13px] font-bold ${
									r.accent ? 'text-lime' : 'text-white'
								}`}
							>
								{r.v}
							</span>
						</div>
					))}
				</div>

				{/* Кнопка с ценой */}
				<div className="mt-4 flex items-center rounded-xl bg-lime px-4 py-3.5">
					<span className="flex-1 text-[14px] font-extrabold text-ink">
						Продать
					</span>
					<span className="mr-2 text-[12px] text-ink/55 line-through">
						20 000
					</span>
					<span className="text-[16px] font-extrabold text-ink">16 000 ₸</span>
				</div>
			</div>
		</div>
	)
}

export function Promo() {
	return (
		<Section
			id="promo"
			decor={
				<>
					<DotBg fade="radial-gradient(ellipse 55% 65% at 20% 40%, black 5%, transparent 72%)" />
					<Glow
						className="-right-24 bottom-0"
						size={560}
						strength={0.13}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Акции и скидки"
				title="Скидку ставит владелец — клиент видит её сам"
				lead="Акция на абонемент или пакет услуг включается за минуту. Цена в приложении клиента меняется сразу, а когда срок выходит — возвращается обратно."
			/>

			<div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
				<Reveal className="h-full">
					<PromoEditorMock />
				</Reveal>
				<Reveal
					delay={0.1}
					className="h-full"
				>
					<SaleMock />
				</Reveal>
			</div>

			<Reveal delay={0.1}>
				<ul className="mt-12 grid gap-x-16 gap-y-4 md:mt-14 md:grid-cols-2">
					<Bullet>
						Процент и срок: неделя, две недели, до конца месяца или без срока
					</Bullet>
					<Bullet>
						Клиент видит старую цену зачёркнутой и дату, до которой действует
						акция
					</Bullet>
					<Bullet>
						Администратор может дать и разовую скидку при продаже — постоянному
						клиенту или по договорённости
					</Bullet>
					<Bullet>
						В каждой продаже сохраняются полная цена и скидка — видно, кому и
						сколько уступили
					</Bullet>
				</ul>
			</Reveal>

			<Reveal delay={0.15}>
				<p className="mt-12 rounded-2xl border border-line bg-surface px-6 py-5 text-[15px] leading-relaxed text-muted md:mt-14 md:px-7 md:py-6">
					<span className="font-bold text-white">
						Акция закончилась — цена вернулась сама.
					</span>{' '}
					Не нужно помнить, что скидку пора снять, и объяснять клиенту, почему
					вчера было дешевле.
				</p>
			</Reveal>
		</Section>
	)
}
