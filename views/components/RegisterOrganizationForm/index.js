import React from 'react'
import { reduxForm } from 'redux-form'
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import is from 'is_js'

import { registerOrganization } from '../../redux/modules/account'

import store from '../../redux/store'
import ajax from '../../base/ajax'
import styles from './styles'

const usernameRegex = /^\w{3,18}$/

const validate = values => {
  const errors = {}
  if (!values.username || typeof values.username !== 'string') {
    errors.username = '不能为空'
  } else if (values.username.length < 3) {
    errors.username = '不能少于 3 个字符'
  } else if (values.username.length > 18) {
    errors.username = '不能多于 18 个字符'
  } else if (!usernameRegex.test(values.username)) {
    errors.username = '不能包含特殊字符'
  }

  if (!values.password || typeof values.password !== 'string') {
    errors.password = '不能为空'
  } else if (values.password.length < 6) {
    errors.password = '不能少于 6 个字符'
  } else if (values.password.length > 32) {
    errors.password = '不能多于 32 个字符'
  }

  if (!values.email || typeof values.email !== 'string') {
    errors.email = '不能为空'
  } else if (!is.email(values.email)) {
    errors.email = '格式不合法'
  }
  return errors
}

@reduxForm({
  form: 'registerForm',
  fields: ['email', 'password', 'username'],
  validate
}, undefined, {
  onSubmit: data => registerOrganization(data)
})
class RegisterForm extends React.Component {
  render() {
    const { fields: { email, password, username },
            handleSubmit } = this.props
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{ fontSize: 15, marginRight: 4 }}
                                type="mail" />}
                   help={ email.touched && email.error ?
                          email.error : '　' }
                   hasFeedback={ email.touched }
                   validateStatus={ email.touched && email.error ? 'error' : 'success' }>
          <Input size="large"
                 placeholder="邮箱"
                 autoFocus
                 autoComplete="off"
                 {...email} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}}
                                type="lock" />}
                   help={ password.touched && password.error ?
                          password.error : '　' }
                   hasFeedback={password.touched}
                   validateStatus={password.touched && password.error ?
                                   'error' : 'success'}>
          <Input size="large"
                 type="password"
                 placeholder="账户密码"
                 {...password} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{ fontSize: 15, marginRight: 4 }}
                                type="user" />}
                   help={ username.touched && username.error ?
                          username.error : '　' }
                   hasFeedback={ username.touched }
                   validateStatus={ username.touched && username.error ? 'error' : 'success' }>
          <Input size="large"
                 placeholder="用户名"
                 autoFocus
                 autoComplete="off"
                 {...username} />
        </Form.Item>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit">
          注册
        </Button>
        <div className={styles.bottomLeft}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 0)}>
            <Icon type="left" /> 普通用户注册
          </a>
        </div>
      </Form>
    );
  }
}

export default RegisterForm
