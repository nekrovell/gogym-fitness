// src/App.tsx
// Порядок секций выстроен под владельца клуба:
// боль → сколько это стоит → как решаем → доказательства → цена → заявка
import { useEffect } from 'react'
import { ClubPage, Promo } from './components/Club'
import { Compare } from './components/Compare'
import { Access, Notifications } from './components/Extra'
import { Faq, Footer, Start, Why } from './components/Faq'
import { Admin, ClientRest } from './components/Features'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LossCalc } from './components/LossCalc'
import { Control, Money, Reports, Setup, Staff } from './components/Owner'
import { Pricing, Trial } from './components/Pricing'
import { Problem, Roles } from './components/Problem'
import { Showcase } from './components/Showcase'
import { Trainers } from './components/Trainers'
import { Updates } from './components/Updates'
import { Divider } from './components/decor'

export default function App() {
	// Скрытая клавиша для презентаций: Q открывает страницу с QR-кодом
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			// Не срабатываем, пока человек печатает в форме заявки
			const t = e.target as HTMLElement | null
			if (
				t &&
				(t.tagName === 'INPUT' ||
					t.tagName === 'TEXTAREA' ||
					t.isContentEditable)
			)
				return
			if (e.metaKey || e.ctrlKey || e.altKey) return

			// e.code — физическая клавиша, работает и на русской раскладке (Й)
			if (e.code === 'KeyQ') {
				window.location.assign('/qr')
			}
		}

		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

	return (
		<div className="min-h-screen bg-ink">
			<Header />

			<main>
				{/* 1. Боль и её цена */}
				<Hero />
				<Problem />
				<LossCalc />

				{/* 2. Как это выглядит */}
				<Roles />
				<Showcase />

				<Divider />

				{/* 3. Владелец — тот, кто платит. Его выгода первой */}
				<Money />
				<Trainers />
				<Reports />
				<Control />

				<Divider />

				{/* 4. Остальные роли */}
				<Admin />
				<Staff />
				<ClientRest />
				<Notifications />

				{/* 5. Настройка и витрина клуба */}
				<Setup />
				<ClubPage />
				<Promo />

				<Divider />

				{/* 6. Доказательства: сравнение и живые обновления */}
				<Compare />
				<Updates />
				<Access />

				<Divider />

				{/* 7. Деньги и заявка */}
				<Pricing />
				<Trial />
				<Why />
				<Faq />
				<Start />
			</main>

			<Footer />
		</div>
	)
}
