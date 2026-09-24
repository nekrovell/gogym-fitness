import { useEffect } from 'react'
import { Access, Notifications } from './components/Extra'
import { Faq, Footer, Start, Why } from './components/Faq'
import { Admin, ClientRest } from './components/Features'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Control, Money, Reports, Setup, Staff } from './components/Owner'
import { Pricing, Trial } from './components/Pricing'
import { Problem, Roles } from './components/Problem'
import { Showcase } from './components/Showcase'
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
				<Hero />
				<Problem />
				<Roles />

				{/* Телефон прилипает, экраны меняются по прокрутке */}
				<Showcase />

				<ClientRest />
				<Admin />
				<Staff />

				{/* Что приложение делает без участия людей */}
				<Notifications />

				<Divider />

				<Money />
				<Reports />
				<Setup />
				<Control />

				{/* Вход и разделение данных — перед разговором о деньгах */}
				<Access />

				<Divider />

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
