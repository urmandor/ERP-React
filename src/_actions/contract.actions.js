import { contractConstants } from '../_constants';
import { contractService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const contractActions = {
	addContract,
	viewContracts,
	updateContract,
};

function addContract(contract) {
	return dispatch => {
		dispatch(request(contract.contractName));

		let message;
		if (!contract.contractName) {
			message = 'Contract Name is required';
		} else if (!contract.deliveryDate) {
			message = 'Delivery Date is required';
		} else if (!contract.contractType) {
			message = 'Contract Type is required';
		} else if (!contract.contractNumber) {
			message = 'Contract Number is required';
		} else if (!contract.wrapCount) {
			message = 'Wrap Count is required';
		} else if (!contract.weftCount) {
			message = 'Weft Count is required';
		} else if (!contract.read) {
			message = 'Read is required';
		} else if (!contract.pick) {
			message = 'Pick is required';
		} else if (!contract.width) {
			message = 'Width is required';
		} else if (!contract.wrapBeam) {
			message = 'Wrap Beam is required';
		} else if (!contract.weftQuantity) {
			message = 'Weft Quantity is required';
		}

		if (message) {
			dispatch(failure(message));
			dispatch(alertActions.error(message));
			return;
		}

		contractService
			.addContract(contract)
			.then(result => {
				dispatch(success(result));
				dispatch(alertActions.success('New Contract Added'));
				dispatch(contractActions.viewContracts());
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};

	function request(contract) {
		return { type: contractConstants.ADD_CONTRACT_REQUEST, contract };
	}
	function success(contract) {
		return { type: contractConstants.ADD_CONTRACT_SUCCESS, contract };
	}
	function failure(error) {
		return { type: contractConstants.ADD_CONTRACT_FAILURE, error };
	}
}

function updateContract(contract) {
	return dispatch => {
		dispatch(request(contract.contractName));

		let message;
		if (!contract.contractNumber) {
			message = 'Contract Number is required';
		} else if (!contract.wrapCount) {
			message = 'Wrap Count is required';
		} else if (!contract.weftCount) {
			message = 'Weft Count is required';
		} else if (!contract.read) {
			message = 'Read is required';
		} else if (!contract.pick) {
			message = 'Pick is required';
		} else if (!contract.width) {
			message = 'Width is required';
		} else if (!contract.wrapBeam) {
			message = 'Wrap Beam is required';
		} else if (!contract.weftQuantity) {
			message = 'Weft Quantity is required';
		}

		if (message) {
			dispatch(failure(message));
			dispatch(alertActions.error(message));
			return;
		}

		contractService
			.updateContract(contract)
			.then(result => {
				dispatch(success(result));
				dispatch(alertActions.success('Contract Successfully Updated'));
				dispatch(contractActions.viewContracts());
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};

	function request(contract) {
		return { type: contractConstants.UPDATE_CONTRACT_REQUEST, contract };
	}
	function success(contract) {
		return { type: contractConstants.UPDATE_CONTRACT_SUCCESS, contract };
	}
	function failure(error) {
		return { type: contractConstants.UPDATE_CONTRACT_FAILURE, error };
	}
}

function viewContracts() {
	return dispatch => {
		dispatch(request());

		contractService
			.getAllContracts()
			.then(contracts => {
				dispatch(success(contracts));
			})
			.catch(error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			});
	};
	function request() {
		return { type: contractConstants.VIEW_CONTRACTS_REQUEST };
	}
	function success(contracts) {
		return { type: contractConstants.VIEW_CONTRACTS_SUCCESS, contracts };
	}
	function failure(error) {
		return { type: contractConstants.VIEW_CONTRACTS_FAILURE, error };
	}
}
