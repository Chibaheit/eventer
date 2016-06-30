import React from 'react'
import Title from 'react-document-title'

import MixedForm from '../components/MixedForm'
import FullPage from '../components/FullPage'

import styles from './styles'

class MainPage extends React.Component {
  render() {
    return (
      <Title title="Log in | Eventer">
        <FullPage>
          <div className={styles.wrapper}>
            <MixedForm />
          </div>
        </FullPage>
      </Title>
    )
  }
}

export default MainPage
