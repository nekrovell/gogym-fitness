import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-dark-small.png'

const NAV = [
	{ label: 'Возможности', href: '#features' },
	{ label: 'Роли', href: '#roles' },
	{ label: 'Тарифы', href: '#pricing' },
	{ label: 'Вопросы', href: '#faq' }
]

export function Header() {
	const [scrolled, setScrolled] = useState(false)
	const [open, setOpen] = useState(false)

	// Шапка уплотняется после прокрутки
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	// Блокируем прокрутку под открытым меню
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	return (
		<>
			<header
				className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
					scrolled
						? 'border-b border-line/70 bg-ink/85 backdrop-blur-xl'
						: 'border-b border-transparent'
				}`}
			>
				<div className="mx-auto flex h-[72px] max-w-page items-center gap-8 px-5 md:px-8">
					<a
						href="#top"
						className="flex shrink-0 items-center"
						aria-label="Go Gym Fitness — в начало"
					>
						<img
							src={logo}
							alt=""
							className="h-8 w-auto md:h-9"
						/>
					</a>

					<nav className="hidden flex-1 items-center gap-7 lg:flex">
						{NAV.map(n => (
							<a
								key={n.href}
								href={n.href}
								className="text-[15px] font-medium text-muted transition-colors hover:text-white"
							>
								{n.label}
							</a>
						))}
					</nav>

					<div className="ml-auto flex items-center gap-3">
						<a
							href="#start"
							className="hidden rounded-full bg-white px-6 py-3 text-[14px] font-bold text-ink transition hover:bg-lime sm:inline-flex"
						>
							Подключить зал
						</a>

						<button
							type="button"
							onClick={() => setOpen(v => !v)}
							className="grid h-11 w-11 place-items-center rounded-full border border-line text-white lg:hidden"
							aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
							aria-expanded={open}
						>
							{open ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</header>

			{/* Меню на телефоне */}
			{open && (
				<div className="fixed inset-0 z-40 bg-ink pt-[72px] lg:hidden">
					<nav className="flex flex-col px-5 pt-6">
						{NAV.map((n, i) => (
							<a
								key={n.href}
								href={n.href}
								onClick={() => setOpen(false)}
								className="animate-riseIn border-b border-line py-5 text-2xl font-bold tracking-tight text-white"
								style={{ animationDelay: `${i * 60}ms` }}
							>
								{n.label}
							</a>
						))}

						<a
							href="#start"
							onClick={() => setOpen(false)}
							className="btn-lime mt-8 w-full"
						>
							Подключить зал
						</a>
					</nav>
				</div>
			)}
		</>
	)
}
