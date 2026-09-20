// src/mockups.ts
// Все скриншоты приложения в одном месте.
//
// Картинки лежат в src/assets/mockups/ в формате webp — их готовит
// scripts/mockups.mjs из исходных png (ширина 800, качество 78).
// Добавили новый скриншот — положите png рядом, прогоните скрипт
// и допишите импорт сюда.
//
// Если поставить undefined — на странице покажется пунктирная рамка
// с подписью, так что незаполненные места сразу видно.

// ── Клиент ──
import bar from './assets/mockups/bar.webp'
import booking from './assets/mockups/booking.webp'
import history from './assets/mockups/history.webp'
import measurements from './assets/mockups/measurements.webp'
import membership from './assets/mockups/membership.webp'
import partner from './assets/mockups/partner.webp'
import qr from './assets/mockups/qr.webp'
import schedule from './assets/mockups/schedule.webp'

// ── Администратор ──
import adminHome from './assets/mockups/adminHome.webp'
import clientCard from './assets/mockups/clientCard.webp'
import clientCard2 from './assets/mockups/clientCard2.webp'
import scanner from './assets/mockups/scaner.webp'

// ── Тренер и специалист ──
import staffDay from './assets/mockups/staff-day.webp'
import staffEarnings from './assets/mockups/staff-earnings.webp'
import trainerClient from './assets/mockups/trainer-client.webp'
import trainerSchedule from './assets/mockups/trainer-schedule.webp'

// ── Владелец клуба ──
import auditLog from './assets/mockups/audit-log.webp'
import feedback from './assets/mockups/feedback.webp'
import reportPrint from './assets/mockups/report-print.webp'
import reportSetup from './assets/mockups/report-setup.webp'
import revenue from './assets/mockups/revenue.webp'
import stats from './assets/mockups/stats.webp'
import traffic from './assets/mockups/traffic.webp'

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
	staffDay: staffDay,
	staffEarnings: staffEarnings,

	// Владелец клуба
	stats: stats,
	revenue: revenue,
	traffic: traffic,
	reportSetup: reportSetup,
	reportPrint: reportPrint,
	auditLog: auditLog,
	feedback: feedback
} as Record<string, string | undefined>
