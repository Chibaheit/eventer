import React from 'react'
import { reduxForm } from 'redux-form'
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { register } from '../../redux/modules/account'
import store from '../../redux/store'
import ajax from '../../base/ajax'
import styles from './styles'

const validate = values => {
  const errors = {}

  if (!values.password || typeof values.password !== 'string') {
    errors.password = '不能为空'
  }

  if (!values.email || typeof values.email !== 'string') {
    errors.email = '不能为空'
  }
  return errors
}


@reduxForm({
  form: 'loginForm',
  fields: ['email', 'password'],
  validate
}, undefined, {
  onSubmit: data => register(data)
})
class RegisterForm extends React.Component {
  render() {
    const { fields: { email, password },
            handleSubmit } = this.props
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{ fontSize: 15, marginRight: 4 }}
                                type="user" />}
                   help={ email.touched && email.error ?
                          email.error : '　' }
                   hasFeedback={ email.touched }
                   validateStatus={ email.touched && email.error ? 'error' : 'success' }>
          <Input size="large"
                 placeholder="邮箱或用户名"
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
                 placeholder="密码"
                 {...password} />
        </Form.Item>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit">
          注册
        </Button>
        <div className={styles.bottomRight}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 1)}>
            <Icon type="right" /> 注册用户
          </a>
        </div>
      </Form>
    );
  }
}

export default RegisterForm
