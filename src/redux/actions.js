// action types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// action creators
export function login(freelancer) {
  return { type: LOGIN, freelancer }
}

export function logout(freelancer) {
  return { type: LOGOUT, freelancer }
}
