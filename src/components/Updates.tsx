// src/components/Updates.tsx
// Что вышло в обновлениях — доказательство, что приложение живое и растёт.
// Новый релиз — допишите его первым в RELEASES
import { Sparkles } from 'lucide-react'
import { DotBg, Glow, TopEdge } from './decor'
import { Reveal, Section, SectionHead } from './ui'

type Release = {
	version: string
	title: string
	items: string[]
	latest?: boolean
}

const RELEASES: Release[] = [
	{
		version: '1.3',
		title: 'Статистика заново и разовые тренировки',
		latest: true,
		items: [
			'Пиковая загрузка: сколько людей было в зале одновременно',
			'«Что покупают чаще» и подробности по нажатию на любую цифру',
			'Период по календарю — любые даты, а не только месяц',
			'Разовая тренировка с тренером по его отдельной цене',
			'Экран, печатный отчёт и Excel считаются одинаково'
		]
	},
	{
		version: '1.2',
		title: 'Тренеры под контролем',
		items: [
			'Клиент прошёл по QR — тренировка отмечается сама',
			'Уведомление тренеру «клиент пришёл»',
			'История тренера по месяцам',
			'Список клиентов, которые давно не приходили',
			'Приходы тренеров не смешиваются с посещениями клиентов'
		]
	},
	{
		version: 'Ранее',
		title: 'Страница клуба и акции',
		items: [
			'Витрина клуба с фото, удобствами и ценами',
			'Акции со сроком — цена возвращается сама',
			'Выбор зала по карточкам при регистрации'
		]
	}
]

export function Updates() {
	return (
		<Section
			id="updates"
			className="noise"
			decor={
				<>
					<TopEdge />
					<DotBg fade="radial-gradient(ellipse 55% 65% at 85% 30%, black 5%, transparent 72%)" />
					<Glow
						className="-left-28 top-1/3"
						size={560}
						strength={0.12}
					/>
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<SectionHead
						kicker="Обновления"
						title="Приложение растёт вместе с клубами"
						lead="Мы дорабатываем GoGym Fitness по просьбам владельцев и тренеров. Обновления бесплатны на всех тарифах и приходят через App Store и Google Play."
					/>
				</div>

				<div className="relative">
					{/* Линия времени */}
					<span
						aria-hidden
						className="absolute bottom-2 left-[7px] top-2 w-px bg-line"
					/>

					{RELEASES.map((r, i) => (
						<Reveal
							key={r.version}
							delay={i * 0.08}
						>
							<div
								className={`relative pl-10 ${
									i < RELEASES.length - 1 ? 'pb-12' : ''
								}`}
							>
								<span
									aria-hidden
									className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
										r.latest
											? 'border-lime bg-lime shadow-[0_0_16px_rgba(184,242,41,0.6)]'
											: 'border-line bg-ink'
									}`}
								/>

								<div className="flex flex-wrap items-center gap-3">
									<span
										className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${
											r.latest
												? 'bg-lime text-ink'
												: 'border border-line text-muted'
										}`}
									>
										{r.version === 'Ранее' ? r.version : `Версия ${r.version}`}
									</span>
									{r.latest && (
										<span className="flex items-center gap-1.5 text-[12px] font-bold text-lime">
											<Sparkles
												size={13}
												aria-hidden
											/>
											Уже в магазинах
										</span>
									)}
								</div>

								<h3 className="mt-3 text-xl font-extrabold tracking-tight text-white md:text-2xl">
									{r.title}
								</h3>

								<ul className="mt-4 space-y-2.5">
									{r.items.map(it => (
										<li
											key={it}
											className="flex gap-3 text-[15px] leading-relaxed text-white/85"
										>
											<span
												aria-hidden
												className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-lime"
											/>
											{it}
										</li>
									))}
								</ul>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</Section>
	)
}
