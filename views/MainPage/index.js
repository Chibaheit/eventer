/*
 * 首页
 */
import React from 'react'
import { connect } from 'react-redux'

import Container from '../components/Container'

import MixedForm from '../components/MixedForm'

import styles from './styles'

@connect(
  state => ({
    user: state.account.user
  })
)
class MainPage extends React.Component {
  render() {
    // 登录后会自动跳转
    if (this.props.user) {
      return <span></span>
    }
    return (
      <div className={styles.wrapper}
        style={{ height: window.innerHeight - 85 }}>
        <Container className={styles.container}>
          <MixedForm />
        </Container>
      </div>
    )
  }
}

export default MainPage;
