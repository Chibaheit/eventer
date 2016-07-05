import React from 'react'
import store from '../../redux/store'
import { push } from 'react-router-redux'

import styles from './styles'

class TimelineRow extends React.Component {
  handleUserClick = (id) => {
    store.dispatch(push(`/account/user/${id}`))
  }
  handleActivityClick = (id) => {
    store.dispatch(push(`/account/activity/${id}`))
  }
  render() {
    return (
      <div className={this.props.className}>
        <div className={styles.container}>
          <img className={styles.avatar} src={`/api/photo/show?id=${this.props.content.avatar}`} />
          <div className={styles.wrapper}>
            <div onClick={this.handleUserClick.bind(this, this.props.content.userId) }   className={styles.title}>
              <span className={styles.nickname}>{ this.props.content.nickname }</span>
              <span className={styles.username}>&nbsp;@{ this.props.content.username }</span>
              <span className={styles.time}>&nbsp;&rlm;{ (new Date(this.props.content.time)).toString() }</span>
            </div>
            <div onClick={this.handleActivityClick.bind(this, this.props.content.activityId) }  className={styles.brief}>{!this.props.content.isOrganization ? '参加了' : '发起了'}{ this.props.content.title }活动</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineRow
