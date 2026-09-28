// src/components/StoreButtons.tsx
// Кнопки скачивания из App Store и Google Play (официальные значки из public/badges)

// Ссылки на страницы приложения. Пока пусто — кнопка не показывается
const APP_STORE_URL = 'https://apps.apple.com/us/app/gogym-fitness/id6815078905'

const GOOGLE_PLAY_URL =
	'https://play.google.com/store/apps/details?id=kz.gogym.fitness'

const STORES = [
	{
		url: APP_STORE_URL,
		src: '/badges/app-store.svg',
		alt: 'Загрузите в App Store'
	},
	{
		url: GOOGLE_PLAY_URL,
		src: '/badges/google-play.png',
		alt: 'Доступно в Google Play'
	}
]

type Props = {
	label?: string
	className?: string
}

export function StoreButtons({ label, className = '' }: Props) {
	// Показываем только магазины, где ссылка уже есть
	const ready = STORES.filter(s => s.url)
	if (ready.length === 0) return null

	return (
		<div className={`flex flex-col items-center gap-3 ${className}`}>
			{label && (
				<p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
					{label}
				</p>
			)}

			<div className="flex flex-wrap items-center justify-center gap-3">
				{ready.map(s => (
					<a
						key={s.src}
						href={s.url}
						target="_blank"
						rel="noreferrer"
						className="transition-opacity hover:opacity-80"
					>
						{/* Одинаковая высота у обоих значков, ширина по пропорциям */}
						<img
							src={s.src}
							alt={s.alt}
							className="h-11 w-auto md:h-12"
							loading="eager"
						/>
					</a>
				))}
			</div>
		</div>
	)
}
