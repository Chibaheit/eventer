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
                    id : "577a8c9b5174a8e158c24559"
                });
            }}>remove</Button>
            <Button onClick={async () => {
                await ajax.post("/api/activity/update_info/577a8c9b5174a8e158c24559", {
                    title : 'ha',
                    content : 'haha',
                    location : 'hz',
                    startTime : Date.now(),
                    endTime : Date.now()
                });
            }}>update</Button>
            <hr/>
            <Button onClick={async () => {
                await ajax.post("/api/activity/join/577a8c9b5174a8e158c24559", {
                });
            }}>join</Button>
            <Button onClick={async () => {
                await ajax.post("/api/activity/unjoin/577a8c9b5174a8e158c24559", {
                });
            }}>unjoin</Button>
            <Button onClick={async () => {
                await ajax.get("/api/activity/info/577a8c9b5174a8e158c24559", {
                });
            }}>get info</Button>
            <hr/>
            <Button onClick={async () => {
                await ajax.post("/api/account/follow", {
                    user_id : '577a86fda058e65353595259'
                });
            }}>follow org</Button>
            <Button onClick={async () => {
                await ajax.post("/api/account/follow", {
                    user_id : '577a86eea058e65353595258'
                });
            }}>follow user</Button>
             | |
            <Button onClick={async () => {
                await ajax.post("/api/account/unfollow", {
                    user_id : '577a86fda058e65353595259'
                });
            }}>unfollow org</Button>
            <Button onClick={async () => {
                await ajax.post("/api/account/unfollow", {
                    user_id : '577a86eea058e65353595258'
                });
            }}>unfollow user</Button>
             | |
            <Button onClick={async () => {
                await ajax.get("/api/account/timeline", {
                });
            }}>get timeline</Button>
            <hr/>
            <Button onClick={async () => {
                await ajax.get("/api/activity/search", {
                    q : 'h'
                });
            }}>search</Button>
            <hr/>
            <form action="/api/photo/new" enctype="multipart/form-data" method="POST">
                <input type="file" name="file"/>
                <input type="submit" value="Upload"/>
            </form>
        </div>
    );
  }
}

export default TestPage;
