import React from 'react'
import { connect } from 'react-redux'
import ajax from '../base/ajax'

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
        <div>
            <Button onClick={async () => {
                await ajax.post("/api/activity/create", {
                    title : 'ha',
                    content : 'haha',
                    location : 'hz',
                    startTime : Date.now(),
                    endTime : Date.now()
                });
            }}>create</Button>
            <Button onClick={async () => {
                await ajax.post("/api/activity/remove", {
                    id : "577a7208bd82f3db4101378d"
                });
            }}>remove</Button>
            <Button onClick={async () => {
                await ajax.post("/api/activity/update_info/577a74277a8940d34332cbd8", {
                    title : 'ha',
                    content : 'haha',
                    location : 'hz',
                    startTime : Date.now(),
                    endTime : Date.now()
                });
            }}>update</Button>
            <br/>
            <Button onClick={async () => {
                await ajax.post("/api/activity/join/577a74277a8940d34332cbd8", {
                });
            }}>join</Button>
            <Button onClick={async () => {
                await ajax.post("/api/activity/unjoin/577a74277a8940d34332cbd8", {
                });
            }}>unjoin</Button>
            <Button onClick={async () => {
                await ajax.get("/api/activity/info/577a74277a8940d34332cbd8", {
                });
            }}>get info</Button>
            <br/>
            <Button onClick={async () => {
                await ajax.get("/api/activity/search", {
                    q : 'h'
                });
            }}>search</Button>
        </div>
    );
  }
}

export default TestPage;
