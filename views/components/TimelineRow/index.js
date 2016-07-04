import React from 'react'

import styles from './styles'

class TimelineRow extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className={styles.container}>
          <img className={styles.avatar} src={this.props.content.avatar} />
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <span className={styles.nickname}>{ this.props.content.nickname }</span>
              <span className={styles.username}>&nbsp;@{ this.props.content.username }</span>
              <span className={styles.time}>&nbsp;&rlm;{ this.props.content.time.toLocaleDateString() }</span>
            </div>
            <div className={styles.brief}>{this.props.content.isOrganization ? '参加了' : '发起了'}{ this.props.content.title }活动</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineRow
