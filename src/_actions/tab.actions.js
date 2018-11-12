import { tabConstants, tabRoutes, tabs } from '../_constants';
import { history } from '../_helpers';
export const tabActions = {
	changeTab,
	toggleSubTab,
};

function changeTab(tab) {
	const link = tabRoutes[tab];
	if (link) {
		history.push(tabRoutes[tab]);
	}
	return {
		type: tabConstants.CHANGE_TAB,
		MAIN: tab,
		SUB: { name: undefined, status: false },
	};
}

function toggleSubTab(tab) {
	return { type: tabConstants.TOGGLE_MAIN_TAB, SUB: { name: tab } };
}
