import React from 'react'
import { reduxForm } from 'redux-form'
import is from 'is_js'
import _ from 'lodash'

import { signup } from '../../redux/modules/user'

import styles from './styles'

import { Form, Input, Icon, Button } from 'antd'

const validate = values => {
  const errors = {}
  if (!values.email || !_.isString(values.email)) {
    errors.email = 'Required'
  } else if (!is.email(values.email)) {
    errors.email = 'Invalid address'
  }
  if (!values.username || !_.isString(values.username)) {
    errors.username = 'Required'
  }
  if (!values.password || !_.isString(values.password)) {
    errors.password = 'Required'
  }
  return errors
}


@reduxForm({
  form: 'SignupForm',
  fields: [ 'email', 'password', 'username'],
  validate
}, undefined, {
  onSubmit: data => signup(data)
})
class SignupForm extends React.Component {
  render() {
    const {
      fields: { email, password, username },
      handleSubmit
    } = this.props
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 4 }}
                   wrapperCol={{ span: 20 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}} type="mail" />}
                   help={email.touched && email.error ? email.error : ' '}
                   hasFeedback={email.touched}
                   validateStatus={email.touched && email.error ? 'error' : 'success'}>
          <Input size="large"
                 type="text"
                 placeholder="Email"
                 autoComplete="off"
                 {...email} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 4 }}
                   wrapperCol={{ span: 20 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}} type="user" />}
                   help={username.touched && username.error ? username.error : ' '}
                   hasFeedback={username.touched}
                   validateStatus={username.touched && username.error ? 'error' : 'success'}>
          <Input size="large"
                 type="text"
                 placeholder="Username"
                 autoComplete="off"
                 {...username} />
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
          Sign up
        </Button>
      </Form>
    )
  }
}

export default SignupForm
