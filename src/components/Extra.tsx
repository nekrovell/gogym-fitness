// src/components/Extra.tsx
// Две секции: уведомления и вход с разделением данных
import { AtSign, Fingerprint, LogIn, Trash2 } from 'lucide-react'
import logo from '../assets/logo-dark-small.png'
import { Beam, DotBg, Glow, GridBg, TopEdge } from './decor'
import { Bullet, Reveal, Section, SectionHead } from './ui'

// ── Карточка уведомления ──
// Рисуем вёрсткой, скриншот не нужен
function Push({
	title,
	body,
	when
}: {
	title: string
	body: string
	when: string
}) {
	return (
		<div className="flex gap-3.5 rounded-2xl border border-line bg-surface/80 p-4">
			<img
				src={logo}
				alt=""
				aria-hidden
				className="mt-0.5 h-9 w-9 shrink-0 rounded-[10px] bg-ink object-contain p-1.5"
			/>
			<div className="min-w-0 flex-1">
				<div className="flex items-baseline gap-3">
					<p className="flex-1 text-[14px] font-bold leading-tight text-white">
						{title}
					</p>
					<span className="shrink-0 text-[11px] text-faint">{when}</span>
				</div>
				<p className="mt-1 text-[13px] leading-snug text-muted">{body}</p>
			</div>
		</div>
	)
}

const TO_CLIENT = [
	{
		title: 'Абонемент заканчивается',
		body: 'Осталось 3 посещения, срок до 14 октября',
		when: 'сейчас'
	},
	{
		title: 'Вы записаны',
		body: 'Массаж · Айгуль · 14 октября, 16:00',
		when: '2 мин'
	},
	{
		title: 'Остался 1 сеанс',
		body: 'По услуге «Массаж» остался один сеанс',
		when: '1 ч'
	},
	{
		title: 'Запись отменена',
		body: 'Массаж · 14 октября, 16:00',
		when: 'вчера'
	}
]

const TO_STAFF = [
	{
		title: 'Новая запись',
		body: 'Айгерим Нурлан · Массаж · 14 октября, 16:00',
		when: 'сейчас'
	},
	{
		title: 'Запись отменена',
		body: 'Слот на 16:00 освободился',
		when: '10 мин'
	}
]

export function Notifications() {
	return (
		<Section
			id="notify"
			className="noise"
			decor={
				<>
					<TopEdge />
					<Beam className="inset-y-0 left-0 w-2/3" />
					<Glow
						className="-right-28 top-1/4"
						size={560}
						strength={0.13}
					/>
				</>
			}
		>
			<SectionHead
				kicker="Уведомления"
				title="Приложение напоминает вместо администратора"
				lead="Никто не обзванивает клиентов и не пишет в WhatsApp, что пора продлевать. Это делает система."
			/>

			<div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-2 lg:gap-16">
				{/* Клиенту */}
				<div>
					<p className="kicker">Клиенту</p>
					<div className="mt-6 space-y-3">
						{TO_CLIENT.map((p, i) => (
							<Reveal
								key={p.title + p.body}
								delay={i * 0.07}
							>
								<Push {...p} />
							</Reveal>
						))}
					</div>
				</div>

				{/* Персоналу */}
				<div>
					<p className="kicker">Тренеру и мастеру</p>
					<div className="mt-6 space-y-3">
						{TO_STAFF.map((p, i) => (
							<Reveal
								key={p.title + p.body}
								delay={i * 0.07}
							>
								<Push {...p} />
							</Reveal>
						))}
					</div>

					<Reveal delay={0.16}>
						<ul className="mt-9 space-y-4">
							<Bullet>
								Клиент узнаёт об окончании абонемента заранее, а не на входе
							</Bullet>
							<Bullet>
								Мастер видит новую запись сразу — спрашивать на стойке не нужно
							</Bullet>
							<Bullet>
								Одно и то же уведомление не приходит дважды, даже если
								пролистать приложение заново
							</Bullet>
							<Bullet>
								Тот, кто сам создал запись, уведомление о ней не получает
							</Bullet>
						</ul>
					</Reveal>
				</div>
			</div>

			<Reveal delay={0.12}>
				<p className="mt-12 rounded-2xl bg-lime px-6 py-5 text-[15px] font-bold leading-snug text-ink md:mt-14 md:px-7 md:py-6 md:text-base">
					Продления перестают зависеть от того, вспомнил администратор позвонить
					или нет.
				</p>
			</Reveal>
		</Section>
	)
}

// ── Вход и данные ──
const SIGNIN = [
	{ icon: AtSign, t: 'Почта и пароль', d: 'Подтверждение кодом с почты' },
	{ icon: LogIn, t: 'Google', d: 'В одно нажатие, без пароля' },
	{ icon: Fingerprint, t: 'Apple ID', d: 'На iPhone — сразу через Face ID' },
	{
		icon: Trash2,
		t: 'Удаление аккаунта',
		d: 'Из профиля, без письма в поддержку'
	}
]

const DAILY = [
	'iPhone и Android',
	'Тёмная и светлая тема',
	'Русский язык и тенге',
	'Работает на планшете'
]

export function Access() {
	return (
		<Section
			id="access"
			decor={
				<>
					<GridBg
						step={80}
						fade="radial-gradient(ellipse 75% 70% at 50% 35%, black 10%, transparent 78%)"
					/>
					<DotBg fade="radial-gradient(ellipse 50% 60% at 15% 60%, black 5%, transparent 72%)" />
				</>
			}
		>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
				<div>
					<SectionHead
						kicker="Доступ и данные"
						title="Заходят быстро, чужого не видят"
						lead="Клиент скачивает приложение и заходит сам — заводить его вручную не нужно. Персоналу доступ выдаёт владелец клуба."
					/>

					<Reveal delay={0.1}>
						<ul className="mt-8 space-y-4 md:mt-10">
							<Bullet>
								Разделение клубов сделано в самой базе, а не на экранах:
								администратор одного зала не достанет клиентов другого, даже
								если попытается
							</Bullet>
							<Bullet>
								Права проверяются на сервере при каждом запросе — подменить роль
								со стороны телефона нельзя
							</Bullet>
							<Bullet>
								Администраторов, тренеров и специалистов заводит владелец: почта
								и пароль приходят сотруднику сразу
							</Bullet>
							<Bullet>
								Уволенного сотрудника владелец отключает сам — доступ пропадает
								в тот же момент
							</Bullet>
						</ul>
					</Reveal>
				</div>

				<div>
					<Reveal delay={0.1}>
						<div className="card-grad p-7 md:p-9">
							<h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
								Как заходит клиент
							</h3>

							<div className="mt-7 space-y-5">
								{SIGNIN.map(s => (
									<div
										key={s.t}
										className="flex items-start gap-4"
									>
										<span
											aria-hidden
											className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface2 text-lime"
										>
											<s.icon size={17} />
										</span>
										<div>
											<p className="text-[15px] font-bold leading-tight text-white">
												{s.t}
											</p>
											<p className="mt-1 text-[13px] leading-snug text-muted">
												{s.d}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</Reveal>

					<Reveal delay={0.18}>
						<div className="mt-6 flex flex-wrap gap-2.5">
							{DAILY.map(d => (
								<span
									key={d}
									className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-white/85"
								>
									{d}
								</span>
							))}
						</div>
					</Reveal>
				</div>
			</div>
		</Section>
	)
}
