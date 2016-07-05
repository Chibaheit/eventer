/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react'
import _ from 'lodash'
import { asyncConnect } from 'redux-connect'
import { Button } from 'antd'
import AccountTimeline from '../components/AccountTimeline'
import FormModal from '../components/FormModal'
import styles from './styles'
import ajax from '../base/ajax'
import store from '../redux/store'
import { fetchTimeline } from '../redux/modules/account'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    return dispatch(fetchTimeline())
  }}],
  state => ({
    user: state.account.user,
    timeline: state.account.timeline
  })
)
class AccountTimelinePage extends React.Component {
  render() {
    const { user } = this.props
    if (!user) {
      return <span />
    }
    return (
      <AccountTimeline />
    )
  }
}
export default AccountTimelinePage
