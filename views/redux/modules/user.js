import { push } from 'react-router-redux'
import store from '../store'

const SIGNUP = 'sweely/user/SIGNUP'
const SIGNUP_SUCCESS = 'sweely/user/SIGNUP_SUCCESS'
const SIGNUP_FAIL = 'sweely/user/SIGNUP_FAIL'

const LOGIN = 'sweely/user/LOGIN'
const LOGIN_SUCCESS = 'sweely/user/LOGIN_SUCCESS'
const LOGIN_FAIL = 'sweely/user/LOGIN_FAIL'

const SHOW_SIGNUP = 'sweely/user/SHOW_SIGNUP'
const SHOW_LOGIN = 'sweely/user/SHOW_LOGIN'

const GET_PROFILE = 'sweely/user/GET_PROFILE'
const GET_PROFILE_SUCCESS = 'sweely/user/GET_PROFILE_SUCCESS'
const GET_PROFILE_FAIL = 'sweely/user/GET_PROFILE_FAIL'

const ADD_FRIEND = 'sweely/user/ADD_FRIEND'
const ADD_FRIEND_SUCCESS = 'sweely/user/ADD_FRIEND_SUCCESS'
const ADD_FRIEND_FAIL = 'sweely/user/ADD_FRIEND_FAIL'

const initialState = {
  activeForm: 'SignupForm'
}

export const showSignup = () => ({
  type: SHOW_SIGNUP
})

export const showLogin = () => ({
  type: SHOW_LOGIN
})

export const signup = data => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
  promise: _ => _.post('/api/user/signup', data)
})

export const login = data => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: _ => _.post('/api/user/login', data)
})

export const getProfile = () => ({
  types: [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL],
  promise: _ => _.get('/api/user')
})

export const addFriend = data => ({
  types: [ADD_FRIEND, ADD_FRIEND_SUCCESS, ADD_FRIEND_FAIL],
  promise: _ => _.post('/api/user/add', {...data, selectedUser: store.getState().panel.selectedUser})
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_SIGNUP:
      return {
        ...state,
        activeForm: 'SignupForm'
      }
    case SHOW_LOGIN:
      return {
        ...state,
        activeForm: 'LoginForm'
      }
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/'))
      }, )
      return state
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.result.user
      }
    default:
      return state
  }
}
