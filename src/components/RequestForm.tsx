// src/components/RequestForm.tsx
// Форма заявки на подключение зала.
// Пишет строку в gym_requests — владелец платформы видит её
// в приложении в разделе заявок.
import { Check, Loader2 } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { getSupabase, supabaseReady } from '../lib/supabase'

type Status = 'idle' | 'sending' | 'ok' | 'error'
type Contact = 'whatsapp' | 'telegram'
type Field =
	| 'ownerName'
	| 'gymName'
	| 'city'
	| 'contact'
	| 'address'
	| 'comment'

const EMPTY: Record<Field, string> = {
	ownerName: '',
	gymName: '',
	city: '',
	contact: '',
	address: '',
	comment: ''
}

const COMMENT_MAX = 500

// ── Проверки ──
// Возвращаем текст ошибки или пустую строку
function checkField(name: Field, value: string, contactType: Contact): string {
	const v = value.trim()

	switch (name) {
		case 'ownerName':
			if (!v) return 'Напишите, как к вам обращаться'
			if (v.length < 2) return 'Слишком коротко'
			if (v.length > 60) return 'Слишком длинно'
			return ''

		case 'gymName':
			if (!v) return 'Укажите название клуба'
			if (v.length < 2) return 'Слишком коротко'
			if (v.length > 80) return 'Слишком длинно'
			return ''

		case 'city':
			if (!v) return 'Укажите город'
			if (v.length < 2) return 'Слишком коротко'
			if (!/^[А-Яа-яЁёA-Za-z\s-]+$/.test(v)) return 'Только буквы'
			return ''

		case 'contact': {
			if (!v) {
				return contactType === 'whatsapp'
					? 'Укажите номер для связи'
					: 'Укажите ник в Telegram'
			}

			if (contactType === 'whatsapp') {
				const digits = v.replace(/\D/g, '')
				if (digits.length < 10) return 'В номере не хватает цифр'
				if (digits.length > 15) return 'В номере лишние цифры'
				return ''
			}

			const nick = v.replace(/^@/, '')
			if (!/^[A-Za-z0-9_]{4,32}$/.test(nick)) {
				return 'Ник — латиница, цифры и _, от 4 символов'
			}
			return ''
		}

		case 'address':
			if (v.length > 120) return 'Слишком длинно'
			return ''

		case 'comment':
			if (v.length > COMMENT_MAX) return 'Слишком длинно'
			return ''
	}
}

// Приводим контакт к единому виду перед отправкой
function normalizeContact(value: string, type: Contact): string {
	const v = value.trim()
	if (type === 'telegram') return '@' + v.replace(/^@/, '')

	const digits = v.replace(/\D/g, '')
	return '+' + digits
}

// ── Стили полей ──
const FIELD_BASE =
	'w-full rounded-xl border bg-surface px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-faint disabled:opacity-60'
const FIELD_OK = 'border-line focus:border-lime/60'
const FIELD_BAD = 'border-red-400/80 focus:border-red-400'
const LABEL = 'mb-1.5 block text-[13px] font-bold text-white/80'
const HINT = 'font-medium text-faint'

export function RequestForm() {
	const [form, setForm] = useState(EMPTY)
	const [contactType, setContactType] = useState<Contact>('whatsapp')
	const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
	const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
	const [status, setStatus] = useState<Status>('idle')
	const [trap, setTrap] = useState('')

	// Чтобы поставить курсор в первое поле с ошибкой
	const refs = useRef<Partial<Record<Field, HTMLElement | null>>>({})

	const busy = status === 'sending'

	// Ошибку показываем, только когда поле уже трогали
	const errorOf = (name: Field) => (touched[name] ? errors[name] : '')

	function change(name: Field, value: string) {
		setForm(f => ({ ...f, [name]: value }))
		// Пока поле не трогали, не дёргаем человека красным
		if (touched[name]) {
			setErrors(e => ({ ...e, [name]: checkField(name, value, contactType) }))
		}
	}

	function blur(name: Field) {
		setTouched(t => ({ ...t, [name]: true }))
		setErrors(e => ({
			...e,
			[name]: checkField(name, form[name], contactType)
		}))
	}

	// Смена мессенджера меняет правило проверки контакта
	function switchContact(type: Contact) {
		setContactType(type)
		if (touched.contact) {
			setErrors(e => ({
				...e,
				contact: checkField('contact', form.contact, type)
			}))
		}
	}

	function validateAll() {
		const next: Partial<Record<Field, string>> = {}
		;(Object.keys(EMPTY) as Field[]).forEach(name => {
			const msg = checkField(name, form[name], contactType)
			if (msg) next[name] = msg
		})
		return next
	}

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (busy) return

		// Ловушка для ботов: человек это поле не видит и не заполнит
		if (trap.trim()) {
			setStatus('ok')
			return
		}

		const found = validateAll()
		setErrors(found)
		setTouched({
			ownerName: true,
			gymName: true,
			city: true,
			contact: true,
			address: true,
			comment: true
		})

		const first = (Object.keys(EMPTY) as Field[]).find(n => found[n])
		if (first) {
			refs.current[first]?.focus()
			return
		}

		// Ключей нет — не делаем вид, что отправили
		if (!supabaseReady) {
			setStatus('error')
			return
		}

		setStatus('sending')

		const row = {
			owner_name: form.ownerName.trim(),
			contact: normalizeContact(form.contact, contactType),
			contact_type: contactType,
			city: form.city.trim(),
			gym_name: form.gymName.trim(),
			address: form.address.trim() || null,
			comment: form.comment.trim() || null
		}

		let client
		try {
			client = getSupabase()
		} catch {
			setStatus('error')
			return
		}

		const { error } = await client.from('gym_requests').insert(row)

		if (error) {
			setStatus('error')
			return
		}

		// Уведомление владельцу платформы.
		// Не дойдёт — заявка всё равно уже сохранена, поэтому ошибку глушим
		try {
			await client.functions.invoke('notify-gym-request', {
				body: {
					gymName: row.gym_name,
					city: row.city,
					ownerName: row.owner_name
				}
			})
		} catch {
			// тихо
		}

		setStatus('ok')
	}

	// ── Отправлено ──
	if (status === 'ok') {
		return (
			<div
				className="card-grad p-8 text-center md:p-10"
				role="status"
				aria-live="polite"
			>
				<span
					aria-hidden
					className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-ink"
				>
					<Check size={26} />
				</span>
				<h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">
					Заявка у нас
				</h3>
				<p className="mx-auto mt-3 max-w-[40ch] text-[15px] leading-relaxed text-muted">
					Свяжемся в ближайшее время — обычно в тот же день. Если нужно быстрее,
					напишите в WhatsApp.
				</p>
				<button
					type="button"
					onClick={() => {
						setForm(EMPTY)
						setErrors({})
						setTouched({})
						setStatus('idle')
					}}
					className="mt-6 text-[14px] font-bold text-lime underline underline-offset-4 transition hover:text-lime-soft"
				>
					Отправить ещё одну
				</button>
			</div>
		)
	}

	// ── Одно текстовое поле ──
	const input = (
		name: Field,
		label: string,
		props: {
			placeholder?: string
			type?: string
			hint?: string
			autoComplete?: string
			inputMode?: 'text' | 'tel'
		} = {}
	) => {
		const err = errorOf(name)
		return (
			<div>
				<label
					className={LABEL}
					htmlFor={`rf-${name}`}
				>
					{label}
					{props.hint && <span className={HINT}> — {props.hint}</span>}
				</label>
				<input
					id={`rf-${name}`}
					ref={el => {
						refs.current[name] = el
					}}
					type={props.type ?? 'text'}
					inputMode={props.inputMode}
					autoComplete={props.autoComplete ?? 'off'}
					disabled={busy}
					value={form[name]}
					onChange={e => change(name, e.target.value)}
					onBlur={() => blur(name)}
					placeholder={props.placeholder}
					aria-invalid={err ? true : undefined}
					aria-describedby={err ? `rf-${name}-err` : undefined}
					className={`${FIELD_BASE} ${err ? FIELD_BAD : FIELD_OK}`}
				/>
				{err && (
					<p
						id={`rf-${name}-err`}
						className="mt-1.5 text-[12px] font-medium text-red-400"
					>
						{err}
					</p>
				)}
			</div>
		)
	}

	const commentErr = errorOf('comment')
	const left = COMMENT_MAX - form.comment.length

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			className="card-grad relative p-6 md:p-8"
		>
			<h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
				Оставить заявку
			</h3>
			<p className="mt-2 text-[14px] leading-relaxed text-muted">
				Заполните — и мы свяжемся, чтобы завести клуб.
			</p>

			<div className="mt-7 grid gap-5 sm:grid-cols-2">
				{input('ownerName', 'Как вас зовут', {
					placeholder: 'Артём',
					autoComplete: 'name'
				})}
				{input('gymName', 'Название клуба', { placeholder: 'Titan' })}
				{input('city', 'Город', { placeholder: 'Тараз' })}

				<div>
					{input(
						'contact',
						contactType === 'whatsapp' ? 'Номер WhatsApp' : 'Ник в Telegram',
						{
							placeholder:
								contactType === 'whatsapp' ? '+7 707 000 00 00' : '@nickname',
							type: contactType === 'whatsapp' ? 'tel' : 'text',
							inputMode: contactType === 'whatsapp' ? 'tel' : 'text',
							autoComplete: contactType === 'whatsapp' ? 'tel' : 'off'
						}
					)}

					{/* Куда писать */}
					<div
						className="mt-2.5 inline-flex rounded-full border border-line p-0.5"
						role="group"
						aria-label="Куда с вами связаться"
					>
						{(['whatsapp', 'telegram'] as Contact[]).map(t => (
							<button
								key={t}
								type="button"
								onClick={() => switchContact(t)}
								aria-pressed={contactType === t}
								disabled={busy}
								className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
									contactType === t
										? 'bg-lime text-ink'
										: 'text-muted hover:text-white'
								}`}
							>
								{t === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
							</button>
						))}
					</div>
				</div>

				<div className="sm:col-span-2">
					{input('address', 'Адрес клуба', {
						placeholder: 'улица, дом',
						hint: 'необязательно'
					})}
				</div>

				<div className="sm:col-span-2">
					<label
						className={LABEL}
						htmlFor="rf-comment"
					>
						Что важно знать
						<span className={HINT}> — необязательно</span>
					</label>
					<textarea
						id="rf-comment"
						ref={el => {
							refs.current.comment = el
						}}
						rows={3}
						maxLength={COMMENT_MAX}
						disabled={busy}
						value={form.comment}
						onChange={e => change('comment', e.target.value)}
						onBlur={() => blur('comment')}
						placeholder="Сколько примерно клиентов, что сейчас используете"
						aria-invalid={commentErr ? true : undefined}
						aria-describedby={commentErr ? 'rf-comment-err' : undefined}
						className={`${FIELD_BASE} resize-none ${
							commentErr ? FIELD_BAD : FIELD_OK
						}`}
					/>
					<div className="mt-1.5 flex items-start justify-between gap-4">
						<p
							id="rf-comment-err"
							className="text-[12px] font-medium text-red-400"
						>
							{commentErr}
						</p>
						{form.comment.length > COMMENT_MAX - 100 && (
							<span className="shrink-0 text-[11px] text-faint">
								осталось {left}
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Ловушка для ботов — скрыта от людей и от скринридеров */}
			<div
				aria-hidden
				className="absolute left-[-9999px] top-[-9999px]"
			>
				<label htmlFor="rf-company">Компания</label>
				<input
					id="rf-company"
					name="company"
					type="text"
					tabIndex={-1}
					autoComplete="off"
					value={trap}
					onChange={e => setTrap(e.target.value)}
				/>
			</div>

			<div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
				<button
					type="submit"
					disabled={busy}
					className="btn-lime gap-2.5 disabled:opacity-60"
				>
					{busy && (
						<Loader2
							size={17}
							className="animate-spin"
							aria-hidden
						/>
					)}
					{busy ? 'Отправляем' : 'Отправить заявку'}
				</button>

				<p className="text-[13px] leading-relaxed text-muted">
					Ни карты, ни предоплаты. Просто свяжемся и всё покажем.
				</p>
			</div>

			<div
				role="status"
				aria-live="polite"
			>
				{status === 'error' && (
					<p className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-[14px] leading-relaxed text-white">
						Не получилось отправить. Напишите в WhatsApp{' '}
						<a
							href="https://wa.me/77074108415"
							target="_blank"
							rel="noreferrer"
							className="font-bold text-lime underline underline-offset-4"
						>
							+7 707 410 84 15
						</a>{' '}
						— ответим сразу.
					</p>
				)}
			</div>
		</form>
	)
}
