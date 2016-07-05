import store from '../store'
import { push } from 'react-router-redux'
import { message } from 'antd'

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
  activity: null,
  timeline: null
}

const JOIN = 'Eventer/activity/JOIN'
const JOIN_SUCCESS = 'Eventer/activity/JOIN_SUCCESS'
const JOIN_FAIL = 'Eventer/activity/JOIN_FAIL'

const UNJOIN = 'Eventer/activity/UNJOIN'
const UNJOIN_SUCCESS = 'Eventer/activity/UNJOIN_SUCCESS'
const UNJOIN_FAIL = 'Eventer/activity/UNJOIN_FAIL'

const CREATE = 'Eventer/activity/CREATE'
const CREATE_SUCCESS = 'Eventer/activity/CREATE_SUCCESS'
const CREATE_FAIL = 'Eventer/activity/CREATE_FAIL'

const REMOVE = 'Eventer/activity/REMOVE'
const REMOVE_SUCCESS = 'Eventer/activity/REMOVE_SUCCESS'
const REMOVE_FAIL = 'Eventer/activity/REMOVE_FAIL'

const UPDATE = 'Eventer/activity/UPDATE'
const UPDATE_SUCCESS = 'Eventer/activity/UPDATE_SUCCESS'
const UPDATE_FAIL = 'Eventer/activity/UPDATE_FAIL'

const SEARCH_ACTIVITY = 'Eventer/activity/SEARCH_ACTIVITY'
const SEARCH_ACTIVITY_SUCCESS = 'Eventer/activity/SEARCH_ACTIVITY_SUCCESS'
const SEARCH_ACTIVITY_FAIL = 'Eventer/activity/SEARCH_ACTIVITY_FAIL'

const LOAD_ACITIVITY = 'Eventer/activity/LOAD_ACITIVITY'
const LOAD_ACITIVITY_SUCCESS = 'Eventer/activity/LOAD_ACITIVITY_SUCCESS'
const LOAD_ACITIVITY_FAIL = 'Eventer/activity/LOAD_ACITIVITY_FAIL'

export const join = id => ({
  types: [JOIN, JOIN_SUCCESS, JOIN_FAIL],
  promise: client => client.get(`/api/activity/join/${id}`)
})

export const unjoin = id => ({
  types: [UNJOIN, UNJOIN_SUCCESS, UNJOIN_FAIL],
  promise: client => client.get(`/api/activity/unjoin/${id}`)
})

export const createActivity = data => ({
  types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
  promise: client => client.post('/api/activity/create', data)
})

export const removeActivity = id => ({
  types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
  promise: client => client.get(`/api/activity/remove/${id}`)
})

export const updateActivity = data => ({
  types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
  promise: client => client.post('/api/activity/update', data)
})

export const searchActivity = q => ({
  types: [SEARCH_ACTIVITY, SEARCH_ACTIVITY_SUCCESS, SEARCH_ACTIVITY_FAIL],
  promise: client => client.get('/api/activity/search', q)
})

export const loadActivity = id => ({
  types: [LOAD_ACITIVITY, LOAD_ACITIVITY_SUCCESS, LOAD_ACITIVITY_FAIL],
  promise: client => client.get(`/api/activity/info/${id}`)
})

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
    case CREATE_SUCCESS:
      message.success('创建活动成功')
      setTimeout(() => {
        store.dispatch(push(`/account/activity/${action.result.activity._id}`))
      })
      return {
        ...state,
        total: [...state.total, action.result.activity]
      }
    case JOIN_SUCCESS:
      return {
        ...state,
        total: [...state.total, action.result.activity]
      }
    case REMOVE_SUCCESS:
      return {
        ...state,
        user: action.result.user,
        activity: action.result.activity
      }
    case UNJOIN_SUCCESS:
    case UPDATE_SUCCESS:
    case SEARCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: action.result.activities
      }
    case LOAD_ACITIVITY_SUCCESS:
      return {
        ...state,
        activity: action.result.activity
      }
    default:
      return state
  }
}
