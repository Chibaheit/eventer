import React from 'react'
import { reduxForm } from 'redux-form'
import is from 'is_js'
import _ from 'lodash'

import { login } from '../../redux/modules/user'

import styles from './styles'

import { Form, Input, Icon, Button } from 'antd'

const validate = values => {
  const errors = {}
  if (!values.email || !_.isString(values.email)) {
    errors.email = 'Required'
  }
  if (!values.password || !_.isString(values.password)) {
    errors.password = 'Required'
  }
  return errors
}

@reduxForm({
  form: 'LoginForm',
  fields: [ 'email', 'password'],
  validate
}, undefined, {
  onSubmit: data => login(data)
})
class LoginForm extends React.Component {
  render() {
    const {
      fields: { email, password },
      handleSubmit
    } = this.props
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 4 }}
                   wrapperCol={{ span: 20 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}} type="user" />}
                   help={email.touched && email.error ? email.error : ' '}
                   hasFeedback={email.touched}
                   validateStatus={email.touched && email.error ? 'error' : 'success'}>
          <Input size="large"
                 type="text"
                 placeholder="Email or username"
                 autoComplete="off"
                 {...email} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 4 }}
                   wrapperCol={{ span: 20 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}} type="lock" />}
                   help={password.touched && password.error ? password.error : ' '}
                   hasFeedback={password.touched}
                   validateStatus={password.touched && password.error ? 'error' : 'success'}>
          <Input size="large"
                 type="password"
                 placeholder="Password"
                 {...password} />
        </Form.Item>
        <Button size="large"
                htmlType="submit"
                type="primary">
          Log in
        </Button>
      </Form>
    )
  }
}

export default LoginForm
