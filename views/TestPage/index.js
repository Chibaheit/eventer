import React from 'react'
import { connect } from 'react-redux'

import Container from '../components/Container'

import MixedForm from '../components/MixedForm'
import { Button } from 'antd'

import { follow, unfollow, fetchTimeline } from '../redux/modules/account'
import { join, unjoin, createActivity, removeActivity, updateActivity } from '../redux/modules/activity'

@connect(
  state => ({
    state: state
  }),
  dispatch => ({
    follow: data => dispatch(follow(data)),
    unfollow: data => dispatch(unfollow(data)),
    fetchTimeline: () => dispatch(fetchTimeline()),
    join: data => dispatch(join(data)),
    unjoin: data => dispatch(unjoin(data)),
    createActivity: data => createActivity(data),
    removeActivity: data => removeActivity(data),
    updateActivity: data => updateActivity(data)
  })
)


class TestPage extends React.Component {
  render() {
    const { follow, unfollow, fetchTimeline, join, unjoin, createActivity, removeActivity, updateActivity } = this.props
    return (
      <Button onClick={() => {
        join('1')
      }}>Test</Button>
    );
  }
}

export default TestPage;
