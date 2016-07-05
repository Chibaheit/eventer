import React from 'react'
import _ from 'lodash'
import { asyncConnect } from 'redux-connect'
import { Pagination } from 'antd'
import TimelineRow from '../TimelineRow'
import styles from './styles'
import store from '../../redux/store'
import fetchTimeline from '../../redux/modules/account'
import ajax from '../../base/ajax'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    return dispatch(fetchTimeline())
  }}],
  state => ({
    user: state.account.user,
    timeline: state.account.timeline
  })
)
class AccountTimeline extends React.Component {
  state = { current: 1 }
  handlePagination = current => {
    this.setState({ current })
  }
  render() {
    const { user, timeline } = this.props
    const { current } = this.state
    const contents = [{
      username: 'Chiba',
      nickname: 'Chiba',
      avatar: 'https://pbs.twimg.com/profile_images/745450979894525952/JcFDk3BR_bigger.jpg',
      isOrganization: false,
      title: '吃饭',
      time: new Date()
    }, {
      username: 'Chiba',
      nickname: 'Chiba',
      avatar: 'https://pbs.twimg.com/profile_images/745450979894525952/JcFDk3BR_bigger.jpg',
      isOrganization: true,
      title: '看电影',
      time: new Date()
    }]
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {
            timeline.slice(5 * (current - 1), 5 * current).map((e, i) => (
              <TimelineRow className={styles.row} key={i} content={e} />
            ))
          }
        </div>
        <Pagination className={styles.pagination}
                    current={this.state.current}
                    total={contents.length}
                    pageSize={5}
                    onChange={this.handlePagination} />
      </div>
    )
  }
}
export default AccountTimeline
