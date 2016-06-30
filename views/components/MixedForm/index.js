import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import SignupForm from '../SignupForm'
import LoginForm from '../LoginForm'

import { showSignup, showLogin } from '../../redux/modules/user'

import styles from './styles'

@connect(
  state => ({
    activeForm: state.user.activeForm,
    submitting: (state.form['SignupForm'] && state.form['SignupForm']._submitting)
             || (state.form['LoginForm'] && state.form['LoginForm']._submitting)
  }),
  dispatch => ({
    showSignup: () => dispatch(showSignup()),
    showLogin: () => dispatch(showLogin())
  })
)
class MixedForm extends React.Component {
  render() {
    const {
      activeForm, submitting, showSignup, showLogin
    } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={classNames(styles.selector, {[styles.signup]: activeForm === 'SignupForm'})}>
          <a className={classNames({[styles.selected]: activeForm === 'LoginForm'})} onClick={showLogin}>
            Log in
          </a>
          <a className={classNames({[styles.selected]: activeForm === 'SignupForm'})} onClick={showSignup}>
            Sign up
          </a>
          <span className={styles.underline}> </span>
        </div>
        <div className={styles.form}>
          { activeForm === 'SignupForm' && <SignupForm /> }
          { activeForm === 'LoginForm' && <LoginForm />}
        </div>
      </div>
    )
  }
}

export default MixedForm
