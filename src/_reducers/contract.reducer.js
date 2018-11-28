import { contractConstants } from '../_constants';

export function contracts(state = { loading: true }, action) {
	switch (action.type) {
		case contractConstants.VIEW_CONTRACTS_REQUEST:
			return {
				loading: true,
			};
		case contractConstants.VIEW_CONTRACTS_SUCCESS:
			console.log('contracts: ', action.contracts);
			return {
				items: action.contracts,
			};
		case contractConstants.VIEW_CONTRACTS_FAILURE:
			return {
				error: action.error,
			};

		case contractConstants.ADD_CONTRACT_REQUEST:
			return {
				loading: true,
			};
		case contractConstants.ADD_CONTRACT_SUCCESS:
			return {};
		case contractConstants.ADD_CONTRACT_FAILURE:
			return {};

		case contractConstants.UPDATE_CONTRACT_REQUEST:
			return {
				loading: true,
			};
		case contractConstants.UPDATE_CONTRACT_SUCCESS:
			return { ...state, loading: false };
		case contractConstants.UPDATE_CONTRACT_FAILURE:
			return { ...state, loading: false };

		default:
			return state;
	}
}
