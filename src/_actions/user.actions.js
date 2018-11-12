import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
	login,
	logout,
	register,
};

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		userService.login(username, password).then(
			user => {
				dispatch(success(user));
				history.push('/');
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			},
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function logout() {
	userService.logout();
	history.push('/login');
	return { type: userConstants.LOGOUT };
}

function register(user) {
	return dispatch => {
		dispatch(request(user));
		let message;
		if (!user.username) {
			message = 'Username is required';
		} else if (!user.email) {
			message = 'Email is required';
		} else if (!user.phone) {
			message = 'Mobile Number is required';
		} else if (!user.password) {
			message = 'Password is required';
		} else if (!user.confirmPassword) {
			message = 'Confirm Password is required';
		} else if (user.password !== user.confirmPassword) {
			message = 'Password and Confirm Password do not match';
		}

		if (message) {
			dispatch(failure(message));
			dispatch(alertActions.error(message));
			return;
		}

		userService.register(user).then(
			user => {
				dispatch(success());
				history.push('/login');
				dispatch(alertActions.success('Registration successful'));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			},
		);
	};

	function request(user) {
		return { type: userConstants.REGISTER_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.REGISTER_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.REGISTER_FAILURE, error };
	}
}
