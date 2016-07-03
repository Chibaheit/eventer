import React from 'react'
import { connect } from 'react-redux'
import is from 'is_js'

import store from '../redux/store'
import ajax from '../base/ajax'
import TogglableInput from '../components/TogglableInput'
import { updateInfo } from '../redux/modules/account'
import styles from './styles'


const validateEmail = async (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    try {
      await ajax.get('/api/account/check_email', {
        email: value
      })
      callback()
    } catch (err) {
      if (err.type = 'EMAIL_EXIST') {
        callback(new Error('该邮箱已被注册'))
      } else {
        callback(new Error('验证出现错误'))
      }
    }
  }
}

const validateUsername = async (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    try {
      await ajax.get('/api/account/check_username', {
        username: value
      })
      callback()
    } catch (err) {
      if (err.type = 'USERNAME_EXIST') {
        callback(new Error('该用户名已被注册'))
      } else {
        callback(new Error('验证出现错误'))
      }
    }
  }
}

const validateNickname = (rule, value, callback) => { callback() }

const validateSignature = (rule, value, callback) => { callback() }

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    if (/^\d{5,11}$/.test(value)) {
      callback()
    } else {
      callback(new Error('号码格式不合法'))
    }
  }
}
@connect(
  state => ({
    user: state.account.user
  }),
  dispatch => ({
    handleSubmit: (data) => dispatch(updateInfo(data))
  })
)
class AccountInfoPage extends React.Component {
  render() {
    const { user, handleSubmit } = this.props
    if (!user) {
      return <span />
    }
    const items = [{
      title: '邮箱地址',
      display: user.email,
      callback: handleSubmit,
      field: ['email', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateEmail }]
      }],
      errorMsg: this.props.emailError,
      requesting: this.props.requestingEmail
    }, {
      title: '用户名',
      display: user.username,
      callback: handleSubmit,
      field: ['username', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateUsername }]
      }],
      errorMsg: this.props.usernameError,
      requesting: this.props.requestingUsername
    }, {
      title: '昵称',
      display: user.nickname,
      callback: handleSubmit,
      field: ['nickname', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateNickname }]
      }],
      errorMsg: this.props.nicknameError,
      requesting: this.props.requestingNickname
    }, {
      title: '签名信息',
      display: user.signature,
      callback: handleSubmit,
      field: ['signature', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateSignature }]
      }],
      errorMsg: this.props.signatureError,
      requesting: this.props.requestingSignature
    }, {
      title: '手机 / 电话',
      display: user.phone,
      callback: handleSubmit,
      field: ['phone', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validatePhone }]
      }],
      errorMsg: this.props.phoneError,
      requesting: this.props.requestingPhone
    }]
    return (
      <div className={styles.container}>{}
        <div className={styles.mainTitle}>修改个人资料</div>{}
        {
          items.map((e, i) => (
            <div key={i} className={styles.wrapper}>
              <div className={styles.row}>
                {}
                <div className={styles.editTitle}>
                  { items[i].title }
                </div>
                <TogglableInput defaultValue={items[i].display}
                                errorMsg={items[i].errorMsg}
                                callback={items[i].callback}
                                field={items[i].field} />
              </div>
            </div>
          ))
        }
      </div>)
  }
}

export default AccountInfoPage
