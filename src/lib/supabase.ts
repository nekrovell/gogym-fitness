// src/lib/supabase.ts
// Клиент для лендинга. Нужен только чтобы положить заявку в gym_requests —
// ту же таблицу, которую владелец платформы читает в приложении.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
	// Видно сразу при сборке, а не когда кто-то нажмёт «Отправить»
	console.error(
		'Не заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY — форма заявки работать не будет'
	)
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
	auth: {
		// Лендингу сессия не нужна, ничего не храним в браузере
		persistSession: false,
		autoRefreshToken: false
	}
})
