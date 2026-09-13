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
import booking from './assets/mockups/booking.png'
import history from './assets/mockups/history.png'
import measurements from './assets/mockups/measurements.png'
import membership from './assets/mockups/membership.png'
import partner from './assets/mockups/partner.png'
import qr from './assets/mockups/qr.png'
import schedule from './assets/mockups/schedule.png'

// ── Администратор ──
import adminHome from './assets/mockups/adminHome.png'
import clientCard from './assets/mockups/clientCard.png'
import clientCard2 from './assets/mockups/clientCard2.png'
import scanner from './assets/mockups/scaner.png'

// ── Тренер и специалист ──
import trainerClient from './assets/mockups/trainer-client.png'
import trainerSchedule from './assets/mockups/trainer-schedule.png'
// import staffDay from './assets/mockups/staff-day.png'
import staffEarnings from './assets/mockups/staff-earnings.png'

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
	schedule: schedule,
	booking: booking,
	partner: partner,
	history: history,

	// Администратор
	adminHome: adminHome,
	scanner: scanner,
	clientCard: clientCard,
	clientCard2: clientCard2,

	// Тренер и специалист
	trainerSchedule: trainerSchedule,
	trainerClient: trainerClient,
	staffDay: undefined,
	staffEarnings: staffEarnings,

	// Владелец клуба
	stats: undefined,
	revenue: undefined,
	reportSetup: undefined,
	reportPrint: undefined,
	auditLog: undefined,
	feedback: undefined
} as Record<string, string | undefined>
