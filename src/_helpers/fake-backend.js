// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let contracts = JSON.parse(localStorage.getItem('contracts')) || [];

export function configureFakeBackend() {
	let realFetch = window.fetch;
	window.fetch = function(url, opts) {
		return new Promise((resolve, reject) => {
			// wrap in timeout to simulate server api call
			setTimeout(() => {
				// authenticate
				if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
					// get parameters from post request
					let params = JSON.parse(opts.body);

					// find if any user matches login credentials
					let filteredUsers = users.filter(user => {
						return (
							user.username === params.username &&
							user.password === params.password
						);
					});

					if (filteredUsers.length) {
						// if login details are valid return user details and fake jwt token
						let user = filteredUsers[0];
						let responseJson = {
							id: user.id,
							username: user.username,
							firstName: user.firstName,
							lastName: user.lastName,
							token: 'fake-jwt-token',
						};
						resolve({
							ok: true,
							text: () => Promise.resolve(JSON.stringify(responseJson)),
						});
					} else {
						// else return error
						reject('Username or password is incorrect');
					}

					return;
				}

				// get user by id
				if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
					// check for fake auth token in header and return user if valid
					if (
						opts.headers &&
						opts.headers.Authorization === 'Bearer fake-jwt-token'
					) {
						// find user by id in users array
						let urlParts = url.split('/');
						let id = parseInt(urlParts[urlParts.length - 1]);
						let matchedUsers = users.filter(user => {
							return user.id === id;
						});
						let user = matchedUsers.length ? matchedUsers[0] : null;

						// respond 200 OK with user
						resolve({ ok: true, text: () => JSON.stringify(user) });
					} else {
						// return 401 not authorised if token is null or invalid
						reject('Unauthorised');
					}

					return;
				}

				// register user
				if (url.endsWith('/users/register') && opts.method === 'POST') {
					// get new user object from post body
					let newUser = JSON.parse(opts.body);

					// validation
					let duplicateUser = users.filter(user => {
						return user.username === newUser.username;
					}).length;
					if (duplicateUser) {
						reject('Username "' + newUser.username + '" is already taken');
						return;
					}

					// save new user
					newUser.id = users.length
						? Math.max(...users.map(user => user.id)) + 1
						: 1;
					users.push(newUser);
					localStorage.setItem('users', JSON.stringify(users));

					// respond 200 OK
					resolve({ ok: true, text: () => Promise.resolve() });

					return;
				}

				if (url.endsWith('/contracts') && opts.method === 'GET') {
					if (
						opts.headers &&
						opts.headers.Authorization === 'Bearer fake-jwt-token'
					) {
						// respond 200 OK with contracts list
						contracts = JSON.parse(localStorage.getItem('contracts')) || [];
						resolve({
							ok: true,
							text: () => Promise.resolve(JSON.stringify(contracts)),
						});
					} else {
						// return 401 not authorised if token is null or invalid
						reject('Unauthorised');
					}
					return;
				}

				if (url.endsWith('/contracts') && opts.method === 'POST') {
					if (
						opts.headers &&
						opts.headers.Authorization === 'Bearer fake-jwt-token'
					) {
						// respond 200 OK with contracts list
						const contract = opts.body;
						contract.status = 'Approved';
						contract.id = contracts.length;
						contract.progress = Math.random() * 100;
						contracts = JSON.parse(localStorage.getItem('contracts')) || [];
						if (
							contracts.filter(
								val => val.contractNumber === contract.contractNumber,
							).length
						) {
							return reject('Contract number already exists');
						}

						contracts.push(contract);
						localStorage.setItem('contracts', JSON.stringify(contracts));
						resolve({
							ok: true,
							text: () => Promise.resolve(JSON.stringify(contract)),
						});
					} else {
						// return 401 not authorised if token is null or invalid
						reject('Unauthorised');
					}
					return;
				}

				if (url.match(/\/contracts\/\d+$/) && opts.method === 'PUT') {
					if (
						opts.headers &&
						opts.headers.Authorization === 'Bearer fake-jwt-token'
					) {
						// find contract by contractNumber in contracts array
						const urlParts = url.split('/');
						const contractNumber = Number(urlParts[urlParts.length - 1]);
						let index = -1;
						contracts = JSON.parse(localStorage.getItem('contracts')) || [];
						const updatedContracts = contracts.map((contract, i) => {
							if (Number(contract.contractNumber) === contractNumber) {
								index = i;
								return { ...contract, ...opts.body };
							}
							return contract;
						});
						if (index === -1) {
							return reject('Contract number not found');
						}

						localStorage.setItem('contracts', JSON.stringify(updatedContracts));

						// respond 200 OK with contract
						resolve({
							ok: true,
							text: () =>
								Promise.resolve(JSON.stringify(updatedContracts[index])),
						});
					} else {
						// return 401 not authorised if token is null or invalid
						reject('Unauthorised');
					}

					return;
				}

				// pass through any requests not handled above
				realFetch(url, opts).then(response => resolve(response));
			}, 500);
		});
	};
}
