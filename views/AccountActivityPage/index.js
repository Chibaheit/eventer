import React from 'react'
import { asyncConnect } from 'redux-connect'
import { reduxForm } from 'redux-form'
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd'
import Container from '../components/Container'
import AccountActivityHeader from '../components/AccountActivityHeader'
import loadActivity from '../redux/modules/activity'


import styles from './styles';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }, params }) => {
    return dispatch(loadActivity())
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
            </div>
            <div className={styles.info}>
              <div className={styles.title}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AccountActivityPage
