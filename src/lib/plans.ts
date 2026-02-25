// Plan limits — single source of truth
export const PLAN_LIMITS = {
	free: {
		maxForms: 1,
		maxSubmissionsPerMonth: 100,
		aiInsights: false,
		webhooks: false,
		teamWorkspace: false,
		label: "Free",
		price: 0,
	},
	pro: {
		maxForms: 10,
		maxSubmissionsPerMonth: 5000,
		aiInsights: true,
		webhooks: false,
		teamWorkspace: false,
		label: "Pro",
		price: 9,
	},
	growth: {
		maxForms: Infinity,
		maxSubmissionsPerMonth: Infinity,
		aiInsights: true,
		webhooks: true,
		teamWorkspace: true,
		label: "Growth",
		price: 29,
	},
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
