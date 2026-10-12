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

// ── Новые скриншоты (1.2 и 1.3) ──
// Когда снимете — раскомментируйте импорт и замените undefined ниже на имя
import clubPage2 from './assets/mockups/club-page-2.webp'
import clubPage from './assets/mockups/club-page.webp'
import promoClient from './assets/mockups/promo-client.webp'
import promoEditor from './assets/mockups/promo-editor.webp'
import promoSale from './assets/mockups/promo-sale.webp'
import singleTraining from './assets/mockups/single-training.webp'
import statsDetail from './assets/mockups/stats-detail.webp'
import statsOverview from './assets/mockups/stats-overview.webp'
import statsPeak from './assets/mockups/stats-peak.webp'
import statsPeriod from './assets/mockups/stats-period.webp'
import statsTop from './assets/mockups/stats-top.webp'
import trainerHistory from './assets/mockups/trainer-history.webp'
import trainerInactive from './assets/mockups/trainer-inactive.webp'
import trainerPush from './assets/mockups/trainer-push.webp'
import trainerStats from './assets/mockups/trainer-stats.webp'

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
	reportSetup: reportSetup,
	reportPrint: reportPrint,
	auditLog: auditLog,
	feedback: feedback,

	// Статистика (1.3) — старые stats/revenue/traffic устарели и убраны
	statsOverview: statsOverview,
	statsPeak: statsPeak,
	statsTop: statsTop,
	statsDetail: statsDetail,
	statsPeriod: statsPeriod,

	// Тренеры (1.2 и 1.3)
	trainerPush: trainerPush,
	trainerStats: trainerStats,
	trainerHistory: trainerHistory,
	trainerInactive: trainerInactive,
	singleTraining: singleTraining,

	// Страница клуба и акции
	clubPage: clubPage,
	clubPage2: clubPage2,
	promoEditor: promoEditor,
	promoSale: promoSale,
	promoClient: promoClient
} as Record<string, string | undefined>
