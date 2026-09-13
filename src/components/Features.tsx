import { M } from '../mockups'
import { Beam, Glow, GridBg } from './decor'
import {
	Bullet,
	Phone,
	PhoneSwitcher,
	Reveal,
	Section,
	SectionHead
} from './ui'

// ── Клиент: абонемент и вход ──
export function ClientMembership() {
	return (
		<Section>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<Reveal>
					<div className="mx-auto grid max-w-[640px] grid-cols-2 gap-6 md:gap-8">
						<Phone
							src={M.membership}
							label="Главный экран"
							note="остаток и срок"
						/>
						<Phone
							src={M.qr}
							label="QR на вход"
							note="показал — прошёл"
							className="mt-10"
						/>
					</div>
				</Reveal>

				<div>
					<SectionHead
						kicker="Клиент"
						title="Абонемент лежит в телефоне"
						lead="Ни карточек, ни бумаги. Клиент открывает приложение и видит, сколько посещений осталось и до какого числа."
					/>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								На входе показывает QR-код — администратор сканирует, посещение
								списывается само
							</Bullet>
							<Bullet>
								История посещений с датами: когда приходил, во сколько
							</Bullet>
							<Bullet>
								Все абонементы за всё время — видно, что покупал раньше
							</Bullet>
							<Bullet>
								Уведомление приходит заранее, когда абонемент подходит к концу
							</Bullet>
						</ul>
					</Reveal>

					<Reveal delay={0.2}>
						<div className="mt-9 rounded-2xl bg-lime p-6 md:mt-11 md:p-7">
							<p className="text-[15px] font-bold leading-snug text-ink md:text-base">
								Клиент больше не звонит узнать остаток и не спорит на входе.
								Администратору остаётся продавать.
							</p>
						</div>
					</Reveal>
				</div>
			</div>
		</Section>
	)
}

// ── Клиент: тренировки, бар, услуги ──
const CLIENT_BLOCKS = [
	{
		t: 'Тренировки',
		d: 'Расписание персональных занятий, напоминание перед тренировкой, остаток тренировок по абонементу'
	},
	{
		t: 'Замеры',
		d: 'Вес, обхваты и динамика за месяцы — записывает тренер после занятия'
	},
	{
		t: 'Бар',
		d: 'Витрина с фото и ценами, корзина, открытый счёт. Клиент берёт по ходу, платит на выходе одним чеком'
	},
	{
		t: 'Услуги',
		d: 'Запись на массаж, солярий, бассейн. Выбор мастера и свободного времени, пакеты сеансов'
	},
	{
		t: 'Абонемент на двоих',
		d: 'Покупает один, приглашает друга по коду. Клуб получает двух посетителей с одной продажи'
	},
	{
		t: 'Обращения',
		d: 'Клиент пишет владельцу напрямую — жалоба не теряется на стойке'
	}
]

export function ClientRest() {
	return (
		<Section
			decor={
				<Glow
					className="-left-32 bottom-0"
					size={600}
					strength={0.13}
				/>
			}
		>
			<SectionHead
				kicker="Клиент"
				title="Что ещё он делает сам"
				lead="Всё это раньше требовало подойти к стойке и кого-то отвлечь."
			/>

			<div className="mt-12 grid gap-x-10 gap-y-px md:mt-14 md:grid-cols-2 md:gap-x-16">
				{CLIENT_BLOCKS.map((b, i) => (
					<Reveal
						key={b.t}
						delay={(i % 2) * 0.08}
					>
						<div className="border-b border-line py-6 md:py-7">
							<h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
								{b.t}
							</h3>
							<p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
								{b.d}
							</p>
						</div>
					</Reveal>
				))}
			</div>

			<Reveal delay={0.1}>
				<div className="mt-14 grid grid-cols-2 gap-8 md:mt-20 md:grid-cols-4 md:gap-6">
					<Phone
						src={M.schedule}
						label="Расписание"
						note="тренировки клиента"
					/>
					<Phone
						src={M.partner}
						label="Код для партнёра"
						note="абонемент на двоих"
					/>
					<Phone
						src={M.history}
						label="История посещений"
						note="когда приходил"
					/>
					<Phone
						src={M.booking}
						label="Запись на услугу"
						note="мастер и время"
					/>
				</div>
			</Reveal>
		</Section>
	)
}

// ── Администратор ──
export function Admin() {
	return (
		<Section
			className="noise"
			decor={
				<>
					<GridBg fade="radial-gradient(ellipse 60% 70% at 75% 50%, black 10%, transparent 75%)" />
					<Beam className="inset-y-0 right-0 w-2/3" />
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
				<div className="order-2 lg:order-1">
					<SectionHead
						kicker="Ресепшн"
						title="Стойка работает с телефона"
						lead="Администратору не нужен компьютер. Всё, что он делает за смену, помещается в приложение."
					/>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								Сканер QR — посещение отмечается за секунду, абонемент
								списывается сам
							</Bullet>
							<Bullet>
								Продажа абонементов из каталога клуба, с выбором способа оплаты
							</Bullet>
							<Bullet>
								Карточка клиента: абонемент, история, замеры, открытые счета
							</Bullet>
							<Bullet>
								Счета в баре — открыть, добавить позиции, закрыть при оплате
							</Bullet>
							<Bullet>
								Запись на услуги, продажа пакетов, разовые тренировки
							</Bullet>
						</ul>
					</Reveal>

					<Reveal delay={0.2}>
						<div className="mt-9 rounded-2xl border border-line bg-surface p-6 md:mt-11 md:p-7">
							<p className="kicker">Чего он не видит</p>
							<p className="mt-3 text-[15px] leading-relaxed text-muted">
								Выручку клуба, себестоимость, настройки цен и каталогов. Это
								остаётся у владельца.
							</p>
						</div>
					</Reveal>
				</div>

				<Reveal className="order-1 lg:order-2">
					<PhoneSwitcher
						items={[
							{
								label: 'Смена',
								note: 'продажи и посещения за день',
								src: M.adminHome
							},
							{
								label: 'Сканер',
								note: 'отметка посещения по коду',
								src: M.scanner
							},
							{
								label: 'Клиент',
								note: 'отметить посещение и абонемент',
								src: M.clientCard
							},
							{
								label: 'Действия',
								note: 'что можно сделать с клиентом',
								src: M.clientCard2
							}
						]}
					/>
				</Reveal>
			</div>
		</Section>
	)
}
