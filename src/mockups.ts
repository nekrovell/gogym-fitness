// src/mockups.ts
// Все скриншоты приложения в одном месте.
//
// Как добавить свой:
//   1. Положите файл в src/assets/mockups/
//   2. Раскомментируйте нужный импорт ниже
//   3. Замените undefined на имя импорта
//
// Пока стоит undefined — на странице показывается пунктирная рамка
// с подписью, так что незаполненные места сразу видно.

// ── Клиент ──
import bar from './assets/mockups/bar.png'
import measurements from './assets/mockups/measurements.png'
import membership from './assets/mockups/membership.png'
import qr from './assets/mockups/qr.png'
// import schedule from './assets/mockups/schedule.png'
// import booking from './assets/mockups/booking.png'

// ── Администратор ──
// import adminHome from './assets/mockups/admin-home.png'
// import scanner from './assets/mockups/scanner.png'
// import clientCard from './assets/mockups/client-card.png'

// ── Тренер и специалист ──
// import trainerSchedule from './assets/mockups/trainer-schedule.png'
// import trainerClient from './assets/mockups/trainer-client.png'
// import staffDay from './assets/mockups/staff-day.png'
// import staffEarnings from './assets/mockups/staff-earnings.png'

// ── Владелец клуба ──
// import stats from './assets/mockups/stats.png'
// import revenue from './assets/mockups/revenue.png'
// import reportSetup from './assets/mockups/report-setup.png'
// import reportPrint from './assets/mockups/report-print.png'
// import auditLog from './assets/mockups/audit-log.png'
// import feedback from './assets/mockups/feedback.png'

export const M = {
	// Клиент
	membership: membership,
	qr: qr,
	bar: bar,
	measurements: measurements,
	schedule: undefined,
	booking: undefined,

	// Администратор
	adminHome: undefined,
	scanner: undefined,
	clientCard: undefined,

	// Тренер и специалист
	trainerSchedule: undefined,
	trainerClient: undefined,
	staffDay: undefined,
	staffEarnings: undefined,

	// Владелец клуба
	stats: undefined,
	revenue: undefined,
	reportSetup: undefined,
	reportPrint: undefined,
	auditLog: undefined,
	feedback: undefined
} as Record<string, string | undefined>
