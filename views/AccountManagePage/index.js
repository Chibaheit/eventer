import React from 'react'
import { connect } from 'react-redux'
import is from 'is_js'

import store from '../redux/store'
import ajax from '../base/ajax'
import { removeActivity, unjoin } from '../redux/modules/account'

import AccountActivityHeader from '../components/AccountActivityHeader'
import styles from './styles'

@connect(
  state => ({
    activities: state.account.user.activities
  }),
  dispatch => ({
    removeActivity: id => dispatch(removeActivity(id)),
    unjoin: id => dispatch(unjoin(id))
  })
)
class AccountManagePage extends React.Component {
  render() {
    <div></div>
  }
}
export default AccountManagePage
