/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react'
import { connect } from 'react-redux'
import SecurityRow from '../components/SecurityRow'
import styles from './styles'
import ajax from '../base/ajax'

@connect(
  state => ({
    user: state.account.user
  })
)
class AccountSecurityPage extends React.Component {

  render() {
    const { user } = this.props
    const contents = [
      {
        title: '账户密码',
        brief: '账户密码用于登录您的账户',
        btnText: '修改',
        onClick: this.props.toggleModifyLoginpass
      }, {
        title: '支付密码',
        brief: '支付密码用于保障交易安全',
        btnText: '修改',
        onClick: this.props.toggleModifyPaypass
      }, {
        title: '实名验证',
        brief: brief[user.status],
        btnText: user.status === 1 ? '修改' : '验证',
        onClick: this.props.toggleVerification
      }
    ]
    return (
      <div className={styles.container}>
        {
          contents.map((e, i) => (
            <SecurityRow className={styles.row} key={i} content={e} />
          ))
        }
      </div>
    )
  }
}

export default AccountSecurityPage
