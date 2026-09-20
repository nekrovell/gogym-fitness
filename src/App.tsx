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
