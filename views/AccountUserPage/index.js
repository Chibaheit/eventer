import React from 'react'
import { asyncConnect } from 'redux-connect'
import { reduxForm } from 'redux-form'
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd'
import Container from '../components/Container'
import AccountActivityHeader from '../components/AccountActivityHeader'
import { loadUser, follow, unfollow } from '../redux/modules/account'


import styles from './styles';

const checkFollow = (follow, id) => {
  for (let i of follow) {
    if (i.user == id || i.user._id == id) {
      return true
    }
  }
  return false
}

@asyncConnect([{
  promise: ({ store: { dispatch, getState }, params }) => {
    return dispatch(loadUser(String(params.userId)))
  }}],
  state => ({
    user: state.account.user,
    other: state.account.other,
    followings: state.account.user.followings
  }),
  dispatch => ({
    follow: id => dispatch(follow(id)),
    unfollow: id => dispatch(unfollow(id))
  })
)
class AccountActivityPage extends React.Component {
  handleClick = (followings, id) => {
    if (checkFollow(followings, id)) {
      this.props.unfollow(id)
    } else {
      this.props.follow(id)
    }
  }
  render() {
    const { user, other, followings } = this.props
    return (
      <div>
        <AccountActivityHeader icon="smile" text="查看用户" />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.carousel}>
              <div>
                <img className={styles.photo}
                     src='https://pbs.twimg.com/media/Cmhr0yoUkAIKJEH.jpg:large' />
               </div>
            </div>
            <div className={styles.info}>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  昵称
                </Col>
                <Col span="12">
                  { other.nickname }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  邮箱
                </Col>
                <Col span="12">
                  { other.email }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  电话
                </Col>
                <Col span="12">
                  { other.phone }
                </Col>
              </Row>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  用户类型
                </Col>
                <Col span="12">
                  { other.isOrganization ? '社团用户' : '普通用户'}
                </Col>
              </Row>
              <div className={styles.buttonContainer}>
                <Button size="large" type="primary"
                        onClick={this.handleClick.bind(this, followings, other._id)}
                        disabled={user && user._id === other._id}>
                  <Icon type={checkFollow(followings, other._id) ? 'heart' : 'heart-o'} /> {
                    checkFollow(followings, other._id) ? '取消关注' : '关注'
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AccountActivityPage
