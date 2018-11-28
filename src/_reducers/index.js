import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { tab } from './tab.reducer';
import { contracts } from './contract.reducer';

const rootReducer = combineReducers({
	authentication,
	registration,
	users,
	alert,
	tab,
	contracts,
});

export default rootReducer;
