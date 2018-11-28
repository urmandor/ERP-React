import config from 'config';
import { authHeader } from '../_helpers';

export const contractService = {
	getAllContracts,
	addContract,
	updateContract,
};

function getAllContracts() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
	};

	return fetch(`${config.apiUrl}/contracts`, requestOptions)
		.then(handleResponse)
		.then(contracts => {
			console.log(contracts);
			return contracts;
		});
}

function updateContract(contract) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: contract,
	};

	return fetch(
		`${config.apiUrl}/contracts/${contract.contractNumber}`,
		requestOptions,
	)
		.then(handleResponse)
		.then(contracts => {
			return contracts;
		});
}

function addContract(contract) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: contract,
	};

	return fetch(`${config.apiUrl}/contracts`, requestOptions)
		.then(handleResponse)
		.then(contracts => {
			return contracts;
		});
}

function handleResponse(response) {
	console.log(response);
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
