/*
 * 个人账户界面
 */

import React from 'react'
import Container from '../components/Container'
import AccountMenu from '../components/AccountMenu'

import styles from './styles'

class AccountPage extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}
        style={{ height: window.innerHeight - 85 }}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <AccountMenu />
          </div>
          <div className={styles.right} id="account-right">
            { this.props.children }
          </div>
        </Container>
      </div>
    );
  }
}

export default AccountPage;
