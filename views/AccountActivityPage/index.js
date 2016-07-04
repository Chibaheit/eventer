import React from 'react'
import { asyncConnect } from 'redux-connect'
import { reduxForm } from 'redux-form'
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd'
import Container from '../components/Container'
import AccountActivityHeader from '../components/AccountActivityHeader'
import { loadActivity } from '../redux/modules/activity'


import styles from './styles';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }, params }) => {
    return dispatch(loadActivity(String(params.activityId)))
  }}],
  state => ({
    user: state.account.user,
    activity: state.activity.currentActivity
  })
)
class AccountActivityPage extends React.Component {
  render() {
    const { user, activity } = this.props
    return (
      <div>
        <AccountActivityHeader icon="smile" text="浏览活动" />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.carousel}>
              <div>
                <img className={styles.photo}
                     src='https://pbs.twimg.com/media/Cmhr0yoUkAIKJEH.jpg:large' />
               </div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{activity.title}</div>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  组织者
                </Col>
                <Col span="12">
                  { activity.creator }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  活动内容
                </Col>
                <Col span="12">
                  { activity.content }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  地点
                </Col>
                <Col span="12">
                  { activity.location }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  报名开始
                </Col>
                <Col span="12">
                  { (new Date(activity.startTime)).toString() }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  报名截止
                </Col>
                <Col span="12">
                  { (new Date(activity.endTime)).toString() }
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.description}>
            参与者：{activity.participator.join(', ')}
          </div>
        </div>
      </div>
    )
  }
}
export default AccountActivityPage
