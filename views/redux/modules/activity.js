import store from '../store'
import { push } from 'react-router-redux'

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

const SEARCH = 'Eventer/activity/SEARCH'
const SEARCH_SUCCESS = 'Eventer/activity/SEARCH_SUCCESS'
const SEARCH_FAIL = 'Eventer/activity/SEARCH_FAIL'

const initialState = {
  total: [],
  currentActivity: null
}

export const join = data => ({
  types: [JOIN, JOIN_SUCCESS, JOIN_FAIL],
  promise: client => client.post(`/api/activity/join/${data}`)
})

export const unjoin = data => ({
  types: [UNJOIN, UNJOIN_SUCCESS, UNJOIN_FAIL],
  promise: client => client.post(`/api/activity/unjoin/${data}`)
})

export const createActivity = data => ({
  types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
  promise: client => client.post('/api/activity/create', data)
})

export const removeActivity = data => ({
  types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
  promise: client => client.post('/api/activity/remove', data)
})

export const updateActivity = data => ({
  types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
  promise: client => client.post('/api/activity/update', data)
})

export const searchActivity = data => ({
  types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
  promise: client => client.get('/api/activity/search', data)
})

const checkIdx = (id, total) => {
  for (let i in total) {
    if (total[i] === id) {
      return i
    }
  }
}

const wrapActivity = (id, total) => ([
  ...total.slice(0, checkIdx(id, total)),
  ...total.slice(checkIdx(id, total) + 1)
])

const wrapUpdate = (activity, total) => ([
  ...total.slice(0, checkIdx(activity._id, total)),
  activity,
  ...total.slice(checkIdx(activity._id, total) + 1)
])

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_SUCCESS:
    case JOIN_SUCCESS:
      return {
        ...state,
        total: [...state.total, action.result.activity]
      }
    case REMOVE_SUCCESS:
    case UNJOIN_SUCCESS:
      return {
        ...state,
        total: wrapActivity(action.result._id, state.total)
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        total: wrapUpdate(action.result.activity, state.total)
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        activities: action.result.activities
      }
    default:
      return state
  }
}
