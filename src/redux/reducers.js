import {
	LOGIN,
	LOGOUT
} from './actions'

const stintApp = function (state={}, action) {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				freelancer: action.freelancer
			}
		case LOGOUT:
			return {
				...state,
				freelancer: null
			}
		default:
			return state
	}
}

export default stintApp
