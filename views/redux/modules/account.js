import store from '../store'
import { push } from 'react-router-redux'

const REGISTER = 'Eventer/account/REGISTER'
const REGISTER_SUCCESS = 'Eventer/account/REGISTER_SUCCESS'
const REGISTER_FAIL = 'Eventer/account/REGISTER_FAIL'

const REGISTER_ORGANIZATION = 'Eventer/account/REGISTER_ORGANIZATION'
const REGISTER_ORGANIZATION_SUCCESS = 'Eventer/account/REGISTER_ORGANIZATION_SUCCESS'
const REGISTER_ORGANIZATION_FAIL = 'Eventer/account/REGISTER_ORGANIZATION_FAIL'

const LOGIN = 'Eventer/account/LOGIN'
const LOGIN_SUCCESS = 'Eventer/account/LOGIN_SUCCESS'
const LOGIN_FAIL = 'Eventer/account/LOGIN_FAIL'

const LOGOUT = 'Eventer/account/LOGOUT'
const LOGOUT_SUCCESS = 'Eventer/account/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'Eventer/account/LOGOUT_FAIL'

const LOAD_ACCOUNT_INFO = 'Eventer/account/LOAD_ACCOUNT_INFO'
const LOAD_ACCOUNT_INFO_SUCCESS = 'Eventer/account/LOAD_ACCOUNT_INFO_SUCCESS'
const LOAD_ACCOUNT_INFO_FAIL = 'Eventer/account/LOAD_ACCOUNT_INFO_FAIL'

const UPDATE_INFO = 'Eventer/account/UPDATE_INFO'
const UPDATE_INFO_SUCCESS = 'Eventer/account/UPDATE_INFO_SUCCESS'
const UPDATE_INFO_FAIL = 'Eventer/account/UPDATE_INFO_FAIL'

const CHANGE_PASSWORD = 'Eventer/account/CHANGE_PASSWORD'
const CHANGE_PASSWORD_SUCCESS = 'Eventer/account/CHANGE_PASSWORD_SUCCESS'
const CHANGE_PASSWORD_FAIL = 'Eventer/account/CHANGE_PASSWORD_FAIL'

const TOGGLE_MODIFY_PASSWORD = 'Eventer/account/TOGGLE_MODIFY_PASSWORD'

const FOLLOW = 'Eventer/account/FOLLOW'
const FOLLOW_SUCCESS = 'Eventer/account/FOLLOW_SUCCESS'
const FOLLOW_FAIL = 'Eventer/account/FOLLOW_FAIL'

const UNFOLLOW = 'Eventer/account/UNFOLLOW'
const UNFOLLOW_SUCCESS = 'Eventer/account/UNFOLLOW_SUCCESS'
const UNFOLLOW_FAIL = 'Eventer/account/UNFOLLOW_FAIL'

const FETCH_TIMELINE = 'Eventer/account/FETCH_TIMELINE'
const FETCH_TIMELINE_SUCCESS = 'Eventer/account/FETCH_TIMELINE_SUCCESS'
const FETCH_TIMELINE_FAIL = 'Eventer/account/FETCH_TIMELINE_FAIL'

const SEARCH = 'Eventer/account/SEARCH'
const SEARCH_SUCCESS = 'Eventer/account/SEARCH_SUCCESS'
const SEARCH_FAIL = 'Eventer/account/SEARCH_FAIL'

const LOAD_USER = 'Eventer/account/LOAD_USER'
const LOAD_USER_SUCCESS = 'Eventer/account/LOAD_USER_SUCCESS'
const LOAD_USER_FAIL = 'Eventer/account/LOAD_USER_FAIL'

const initialState = {
  user: null,
  follow: [],
  timeline: null
}

export const registerOrganization = data => ({
  types: [REGISTER_ORGANIZATION, REGISTER_ORGANIZATION_SUCCESS, REGISTER_ORGANIZATION_FAIL],
  promise: client => client.post('/api/account/register/organization', data)
})

export const register = data => ({
  types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
  promise: client => client.post('/api/account/register/normal', data)
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

export const updateInfo = data => ({
  types: [UPDATE_INFO, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL],
  promise: client => client.post('/api/account/update_info', data)
})

export const changePassword = data => ({
  types: [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL],
  promise: client => client.post('/api/account/change_password', data)
})

export const toggleModifyPassword = () => ({
  type: TOGGLE_MODIFY_PASSWORD
})

export const follow = user_id => ({
  types: [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAIL],
  promise: client => client.get(`/api/account/follow/${user_id}`)
})

export const unfollow = user_id => ({
  types: [UNFOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_FAIL],
  promise: client => client.get(`/api/account/unfollow/${user_id}`)
})

export const fetchTimeline = data => ({
  types: [FETCH_TIMELINE, FETCH_TIMELINE_SUCCESS, FETCH_TIMELINE_FAIL],
  promise: client => client.get('/api/account/timeline')
})

export const searchAccount = q => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  promise: client => client.get('/api/account/search', q)
})

export const loadUser = id => ({
  types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
  promise: client => client.get(`/api/account/info/${id}`)
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case REGISTER_ORGANIZATION_SUCCESS:
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
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        other: action.result.user
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        showModifyPasswordModal: false
      }
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user }
      }
    case TOGGLE_MODIFY_PASSWORD:
      return {
        ...state,
        showModifyPasswordModal: !state.showModifyPasswordModal
      }
    case FETCH_TIMELINE_SUCCESS:
      return {
        ...state,
        timeline: action.result.timeline
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        users: action.result.users
      }
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        user: action.result.user
      }
    default:
      return state
  }
}
