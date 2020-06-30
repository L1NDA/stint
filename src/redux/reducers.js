import {
	LOGIN,
	LOGOUT
} from './actions'

function stintApp(state={}, action) {
	switch(action.type) {
		case LOGIN:
			return action.freelancer
	}
}
