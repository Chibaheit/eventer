import React from 'react'
import classNames from 'classnames'

import styles from './styles'

class Input extends React.Component {
  render() {
    return (
      <span className={styles.wrapper}>
        <input autoComplete="off" spellCheck={false} {...this.props} className={classNames(styles.input, this.props.className)} />
        { this.props.touched && this.props.error && <span className={styles.error}>{ this.props.error }</span> }
      </span>
    )
  }
}

export default Input
