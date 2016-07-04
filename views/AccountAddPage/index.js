import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd'
import Container from '../components/Container'
import AccountActivityHeader from '../components/AccountActivityHeader'

import { createActivity } from '../redux/modules/activity'
const RangePicker = DatePicker.RangePicker

import styles from './styles';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
}


@connect(
  (state) => ({
    status: state.account.user && state.account.user.isOrganization
  })
)
@reduxForm({
  form: 'createActivity',
  fields: ['title', 'content', 'location', 'date', 'photo']
}, undefined, {
  onSubmit: data => createActivity(data)
})
class AccountAddPageForm extends React.Component {
  handleChange = ({ file, fileList }) => {
    switch (file.status) {
      case 'done':
        message.success('成功上传了一张图片')
        break
      case 'error':
        message.error(file.response.error)
        break
      default:
        // ???
        break
    }
    // connect reduxForm
    return this.props.fields.photo.onChange(fileList)
  }
  render() {
    const { fields: { title, content, location, date, photo },
             handleSubmit, resetForm, status } = this.props
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item label="活动名:" {...formItemLayout}>
          <Input placeholder="请输入活动名" {...title} />
        </Form.Item>
        <Form.Item label="活动描述:" {...formItemLayout}>
          <Input type="textarea" placeholder="请输入活动描述" {...content} />
        </Form.Item>
        <Form.Item label="活动地点:" {...formItemLayout}>
          <Input type="textarea" placeholder="请输入活动地点" {...location} />
        </Form.Item>
        <Form.Item label="活动时间:" {...formItemLayout}>
          <RangePicker className={styles.picker}
                       showTime {...date}/>
        </Form.Item>
        <Form.Item label="商品照片：" {...formItemLayout}>
          <Upload action="/api/photo/new"
                  listType="picture"
                  accept="image/*"
                  {...photo}
                  onChange={this.handleChange}>
            <Button type="ghost">
              <Icon type="upload" /> 点击上传照片
            </Button>
          </Upload>
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button className={styles.buttonSummit} type="primary"
                  htmlType="submit">
            确定
          </Button>
          <Button className={styles.buttonReset} type="ghost"
                  onClick={resetForm}>
            重置
          </Button>
        </div>
      </Form>
    );
  }
}

class AccountAddPage extends React.Component {
  render() {
      return (
        <div>
          <AccountActivityHeader icon="plus-circle-o" text="添加活动" />
          <AccountAddPageForm />
        </div>
      );
  }
}
export default AccountAddPage
