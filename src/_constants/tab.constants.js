export const tabConstants = {
	CHANGE_TAB: 'CHANGE_TAB',
	TOGGLE_MAIN_TAB: 'TOGGLE_MAIN_TAB',
};

export const tabs = {
	DASHBOARD: { MAIN: 'dashboard' },
	CONTRACT: {
		MAIN: 'contract',
		SUB: {
			VIEW: 'view-contract',
			ADD: 'add-contract',
			UPDATE: 'update-contract',
			TRACING: 'contract-tracing',
		},
	},
	INVENTORY: {
		MAIN: 'inventory',
		SUB: {
			CURRENT: 'current-inventory',
			HISTORY: 'inventory-history',
			TRACING: 'inventory-tracing',
		},
	},
};

export const tabRoutes = {
	[tabs.DASHBOARD.MAIN]: '/',
	[tabs.CONTRACT.SUB.VIEW]: '/view-contracts',
	[tabs.CONTRACT.SUB.ADD]: '/add-contract',
	[tabs.CONTRACT.SUB.UPDATE]: '/update-contract',
	[tabs.CONTRACT.SUB.TRACING]: '/contract-tracing',
	[tabs.INVENTORY.SUB.CURRENT]: '/current-inventory',
	[tabs.INVENTORY.SUB.HISTORY]: '/inventory-history',
	[tabs.INVENTORY.SUB.TRACING]: '/inventory-tracing',
};
