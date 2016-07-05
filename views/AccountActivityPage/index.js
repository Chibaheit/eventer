import React from 'react'
import { asyncConnect } from 'redux-connect'
import { reduxForm } from 'redux-form'
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd'
import Container from '../components/Container'
import AccountActivityHeader from '../components/AccountActivityHeader'
import { loadActivity, removeActivity, join, unjoin } from '../redux/modules/account'


import styles from './styles';


const checkJoin = (activities, id) => {
  for (let i of activities) {
    if (i.activity == id) {
      return true
    }
  }
  return false
}

@asyncConnect([{
  promise: ({ store: { dispatch, getState }, params }) => {
    return dispatch(loadActivity(String(params.activityId)))
  }}],
  state => ({
    user: state.account.user,
    activity: state.account.activity
  }),
  dispatch => ({
    removeActivity: id => dispatch(removeActivity(id)),
    join: id => dispatch(join(id)),
    unjoin: id => dispatch(unjoin(id))
  })
)
class AccountActivityPage extends React.Component {
  handleClick = (isOrganization, activities, id) => {
    if (isOrganization) {
      this.props.removeActivity(id)
    } else {
      if (checkJoin(activities, id)) {
        this.props.unjoin(id)
      } else {
        this.props.join(id)
      }
    }
  }
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
                     src={`/api/photo/show?id=${activity.photo}`} />
               </div>
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{activity.title}</div>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  组织者
                </Col>
                <Col span="12">
                  { activity.creator.nickname }
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
              {
                user.isOrganization &&
                <div className={styles.buttonContainer}>
                  <Button size="large" type="primary"
                          onClick={this.handleClick.bind(this, user.isOrganization, user.activities, activity._id)}
                          disabled={!(user && user.isOrganization && user._id == activity.creator._id)}>
                    <Icon type='delete' />取消
                  </Button>
                </div>
              }
              {
                !user.isOrganization &&
                <div className={styles.buttonContainer}>
                  <Button size="large" type="primary"
                          onClick={this.handleClick.bind(this, user.isOrganization, user.activities, activity._id)}>
                    <Icon type={checkJoin(user.activities, activity._id) ? 'plus-circle-o' : 'plus-circle'} /> {
                      checkJoin(user.activities, activity._id) ? '不参加' : '参加'
                    }
                  </Button>
                </div>
              }
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
