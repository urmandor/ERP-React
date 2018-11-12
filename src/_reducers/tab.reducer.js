import { tabConstants, tabs } from '../_constants';

export function tab(
	state = {
		MAIN: tabs.DASHBOARD.MAIN,
		SUB: { name: undefined, status: false },
	},
	action,
) {
	const { type, ...tab } = action;
	switch (type) {
		case tabConstants.CHANGE_TAB:
			state = {
				...state,
				MAIN: tab.MAIN,
			};
			return state;
		case tabConstants.TOGGLE_MAIN_TAB:
			state = {
				...state,
				SUB: { name: tab.SUB.name, status: state.SUB && !state.SUB.status },
			};
			return state;
		default:
			return state;
	}
}
