// src/lib/supabase.ts
// Клиент для лендинга. Нужен только чтобы положить заявку в gym_requests —
// ту же таблицу, которую владелец платформы читает в приложении.
//
// Клиент создаётся лениво, при первой отправке формы.
// Если ключей нет, падает только форма, а не весь сайт.
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Есть ли чем работать — форма спрашивает это перед отправкой
export const supabaseReady = Boolean(url && anonKey)

if (!supabaseReady) {
	console.error(
		'Не заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY — форма заявки работать не будет'
	)
}

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
	if (!url || !anonKey) {
		throw new Error('Нет ключей Supabase')
	}

	if (!client) {
		client = createClient(url, anonKey, {
			auth: {
				// Лендингу сессия не нужна, ничего не храним в браузере
				persistSession: false,
				autoRefreshToken: false
			}
		})
	}

	return client
}
