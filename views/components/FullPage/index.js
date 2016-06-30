import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles'

class FullPage extends React.Component {
  render() {
    return (
      <div className={styles.fullpage}>
        <figure ref="background" className={styles.background} />
        { this.props.children }
      </div>
    )
  }
}

export default FullPage
