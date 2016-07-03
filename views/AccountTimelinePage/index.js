/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Button } from 'antd'
import AccountRecordTable from '../components/AccountRecordTable'
import FormModal from '../components/FormModal'
import styles from './styles'
import ajax from '../base/ajax'
import store from '../redux/store'

@connect(
  state => ({
    user: state.account.user
  })
)
class AccountTimelinePage extends React.Component {
  render() {
    const { user } = this.props
    if (!user) {
      return <span />
    }
    return (
      <div>Test</div>
    )
  }
}
export default AccountTimelinePage
