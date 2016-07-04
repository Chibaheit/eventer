import React from 'react'

import RegisterForm from '../RegisterForm'
import LoginForm from '../LoginForm'
import RegisterOrganizationForm from '../RegisterOrganizationForm'

import styles from './styles'

class MixedForm extends React.Component {
  state = { activeForm: 0 }
  handleSwitchPanel = key => {
    let inc = 5 * (key < this.state.activeForm ? 1 : -1)
    let progress = inc
    const frame = () => {
      this.refs.root.style.transform = `rotateY(${progress}deg)`
      const next = (progress != 0)
      progress += inc
      if (progress > 90 || progress < -90) {
        inc = -inc
        this.setState({ activeForm: key})
      }
      if (next) {
        requestAnimationFrame(frame)
      }
    }
    requestAnimationFrame(frame)
  }
  render() {
    return (
      <div ref="root" className={styles.form}>
        { this.state.activeForm == 0 &&
          <LoginForm handleSwitchPanel={this.handleSwitchPanel} /> }
        { this.state.activeForm == 1 &&
          <RegisterForm handleSwitchPanel={this.handleSwitchPanel} /> }
        { this.state.activeForm == 2 &&
          <RegisterOrganizationForm handleSwitchPanel={this.handleSwitchPanel} /> }
      </div>
    )
  }
}

export default MixedForm
