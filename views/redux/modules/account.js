import store from '../store'
import { push } from 'react-router-redux'

const REGISTER = 'Eventer/account/REGISTER'
const REGISTER_SUCCESS = 'Eventer/account/REGISTER_SUCCESS'
const REGISTER_FAIL = 'Eventer/account/REGISTER_FAIL'

const LOGIN = 'Eventer/account/LOGIN'
const LOGIN_SUCCESS = 'Eventer/account/LOGIN_SUCCESS'
const LOGIN_FAIL = 'Eventer/account/LOGIN_FAIL'

const LOGOUT = 'Eventer/account/LOGOUT'
const LOGOUT_SUCCESS = 'Eventer/account/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'Eventer/account/LOGOUT_FAIL'

const LOAD_ACCOUNT_INFO = 'Eventer/account/LOAD_ACCOUNT_INFO';
const LOAD_ACCOUNT_INFO_SUCCESS = 'Eventer/account/LOAD_ACCOUNT_INFO_SUCCESS';
const LOAD_ACCOUNT_INFO_FAIL = 'Eventer/account/LOAD_ACCOUNT_INFO_FAIL';

const UPDATE_INFO = 'Eventer/account/UPDATE_INFO'
const UPDATE_INFO_SUCCESS = 'Eventer/account/UPDATE_INFO_SUCCESS'
const UPDATE_INFO_FAIL = 'Eventer/account/UPDATE_INFO_FAIL'

const initialState = {
  user: null
}


export const register = data => ({
  types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
  promise: client => client.post('/api/account/register', data)
})

export const login = (data) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: client => client.post('/api/account/login', data)
})

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: client => client.get('/api/account/logout')
})

export const loadAccountInfo = () => ({
  types: [LOAD_ACCOUNT_INFO, LOAD_ACCOUNT_INFO_SUCCESS, LOAD_ACCOUNT_INFO_FAIL],
  promise: client => client.get('/api/account/info')
})

export const updateInfo = (data) => ({
  types: [UPDATE_INFO, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL],
  promise: client => client.post('/api/account/update_info', data)
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/account'))
      }, 0)
      return {
        ...state
      }
    case LOGOUT_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/'))
      }, 0)
      return {
        ...state,
        user: null
      }
    case LOAD_ACCOUNT_INFO_SUCCESS:
      if (action.result.user && location.pathname === '/') {
        setTimeout(() => {
          store.dispatch(push('/account'))
        }, 0)
      }
      return {
        ...state,
        user: action.result.user
      }
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user }
      }
    default:
      return state
  }
}
