// src/components/Club.tsx
// Страница клуба для клиента и акции со скидками.
// Экраны — настоящие скриншоты из mockups.ts
import { motion } from 'framer-motion'
import { BadgePercent, Images } from 'lucide-react'
import { type ReactNode } from 'react'
import { M } from '../mockups'
import { DotBg, Glow, GridBg, TopEdge } from './decor'
import { Bullet, Phone, Reveal, Section, SectionHead } from './ui'

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
					<SectionHead
						kicker="Страница клуба"
						title="У зала своя витрина прямо в приложении"
						lead="Владелец загружает логотип, баннер и фото, пишет описание. Клиент видит клуб, цены и акции ещё до первого визита."
					/>

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
					<div className="relative mx-auto max-w-[560px] py-6">
						<div className="grid grid-cols-2 gap-6 md:gap-8">
							<Phone
								src={M.clubPage}
								label="Страница клуба"
								note="баннер, контакты, акции"
							/>
							<Phone
								src={M.clubPage2}
								label="Фото и абонементы"
								note="удобства и цены"
								className="mt-10"
							/>
						</div>

						<FloatTag
							icon={<Images size={17} />}
							title="До 10 фото"
							text="Зал, раздевалки, кардиозона"
							className="-left-14 bottom-[12%]"
							delay={0.3}
						/>
						<FloatTag
							icon={<BadgePercent size={17} />}
							title="Акция видна сразу"
							text="Старая цена зачёркнута, дата окончания рядом"
							className="-right-14 top-[18%]"
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

			<Reveal delay={0.1}>
				<div className="mx-auto mt-12 grid max-w-[880px] grid-cols-2 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
					<Phone
						src={M.promoEditor}
						label="Владелец"
						note="включает акцию: процент и срок"
					/>
					<Phone
						src={M.promoSale}
						label="Ресепшн"
						note="продаёт уже по акции"
						className="mt-10"
					/>
					<Phone
						src={M.promoClient}
						label="Клиент"
						note="видит новую цену и дату окончания"
						className="col-span-2 mx-auto w-1/2 md:col-span-1 md:mt-5 md:w-full"
					/>
				</div>
			</Reveal>

			<Reveal delay={0.1}>
				<ul className="mt-14 grid gap-x-16 gap-y-4 md:mt-16 md:grid-cols-2">
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
