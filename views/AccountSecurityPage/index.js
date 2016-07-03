/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react'
import { connect } from 'react-redux'
import SecurityRow from '../components/SecurityRow'
import FormModal from '../components/FormModal'
import styles from './styles'
import ajax from '../base/ajax'
import { toggleModifyPassword, changePassword } from '../redux/modules/account'

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

let password
let newPassword

const validateNewPassword = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    if (!passwordRegex.test(value)) {
      callback(new Error('密码必须包含字母和数字组合，长度至少 8 位'))
    } else {
      newPassword = value
      callback()
    }
  }
}

const validateRepeatPassword = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    if (value !== newPassword) {
      callback(new Error('两次输入的密码不匹配'))
    } else {
      callback()
    }
  }
}

const validatePassword = async (rule, value, callback) => {
  try {
    await ajax.post('/api/account/check_password', { password: value })
    callback()
  } catch (err) {
    callback(new Error('登录密码错误'))
  }
}

const error = {}

const loginpassPropsArray = [
  {
    input: {
      placeholder: '请输入登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'oldPassword', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validatePassword }]
      }
    ]
  }, {
    input: {
      placeholder: '请输入新登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'password', {
        rules: [{ required: true }, { validator: validateNewPassword }]
      }
    ]
  }, {
    input: {
      placeholder: '请再次输入新登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'repeatPassword', {
        rules: [{ required: true }, { validator: validateRepeatPassword }]
      }
    ]
  }
]

@connect(
  state => ({
    showModifyPasswordModal: state.account.showModifyPasswordModal,
    user: state.account.user
  }), {
    toggleModifyPassword,
    changePassword
  }
)
class AccountSecurityPage extends React.Component {

  render() {
    const { user } = this.props
    const contents = [{
      title: '账户密码',
      brief: '账户密码用于登录您的账户',
      btnText: '修改',
      onClick: this.props.toggleModifyPassword
    }]
    return (
      <div className={styles.container}>
        {
          contents.map((e, i) => (
            <SecurityRow className={styles.row} key={i} content={e} />
          ))
        }
        <FormModal title="修改登录密码"
                   visible={this.props.showModifyPasswordModal}
                   num={3}
                   btnText="确认修改"
                   propsArray={loginpassPropsArray}
                   btnCallback={this.props.changePassword}
                   errorMsg={this.props.passwordError}
                   toggleModal={this.props.toggleModifyPassword} />
      </div>
    )
  }
}

export default AccountSecurityPage
