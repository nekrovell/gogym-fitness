// src/components/StoreButtons.tsx

// Кнопки скачивания из App Store и Google Play
// Официальные значки находятся в public/badges

// Ссылки на страницы приложений
// Пока пусто — кнопка не показывается
const APP_STORE_URL = 'https://apps.apple.com/us/app/gogym-fitness/id6815078905'

const GOOGLE_PLAY_URL = ''

const STORES = [
	{
		url: APP_STORE_URL,
		src: '/badges/app-store.svg',
		alt: 'Загрузите в App Store',
		// У значка Apple нет внутренних полей
		height: 'h-[44px]'
	},
	{
		url: GOOGLE_PLAY_URL,
		src: '/badges/google-play.png',
		alt: 'Доступно в Google Play',
		// У значка Google есть прозрачные поля по краям,
		// поэтому он выше
		height: 'h-[64px] -my-[10px]'
	}
]

type Props = {
	label?: string
	className?: string
}

export function StoreButtons({ label, className = '' }: Props) {
	// Показываем только магазины, где ссылка уже есть
	const ready = STORES.filter(store => store.url)

	if (ready.length === 0) return null

	return (
		<div className={`flex flex-col items-center gap-3 ${className}`}>
			{label && (
				<p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
					{label}
				</p>
			)}

			<div className="flex flex-wrap items-center justify-center gap-3">
				{ready.map(store => (
					<a
						key={store.src}
						href={store.url}
						target="_blank"
						rel="noreferrer"
						className="transition-opacity hover:opacity-80"
					>
						<img
							src={store.src}
							alt={store.alt}
							className={`${store.height} w-auto`}
							loading="eager"
						/>
					</a>
				))}
			</div>
		</div>
	)
}
