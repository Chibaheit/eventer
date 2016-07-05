import React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Card, Icon, Pagination, Input, Form, Select, Button, Tooltip } from 'antd'
import QueueAnim from 'rc-queue-anim'
import querystring from 'querystring';
import classNames from 'classnames';

import store from '../redux/store'
import AccountActivityHeader from '../components/AccountActivityHeader'
import { searchAccount } from '../redux/modules/account'

import show from './show.jpg'
import styles from './styles'


const SearchInput = React.createClass({
  getInitialState() {
    return {
      data: [],
      value: '',
      focus: false,
    };
  },
  handleChange(value) {
    this.setState({ value });
    fetch(value, (data) => this.setState({ data }));
  },
  handleSubmit() {
    this.props.handleSubmit(this.state.value)
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const options = this.state.data.map(d =>
      <Select.Option key={d.value}>{d.text}</Select.Option>
    );
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.value}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}>
            {options}
          </Select>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  },
});
@connect(
  state => ({
    contents: state.account.users
  }),
  dispatch => ({
    searchAccount: q => dispatch(searchAccount(q))
  })
)
class AccountSearchPage extends React.Component {
  state = {
    current: 1
  }
  handleClick = (id) => {
    store.dispatch(push(`/account/user/${id}`))
  }
  handlePagination = (current) => {
    this.setState({ current })
  }
  handleChange = (q) => {
    this.props.searchAccount({q: q})
    this.setState({})
  }
  getPageSize = () => {
    const right = document.getElementById('account-right')
    if (right) {
      const { width, height } = right.getBoundingClientRect()
      return Math.floor(width / 270) * Math.floor((height - 200) / 310)
    } else {
      setTimeout(() => this.forceUpdate(), 1)
      return 1
    }
  }
  render() {
    const { contents } = this.props
    const pageSize = this.getPageSize()
    const { current } = this.state
    return (
      <div>
        <AccountActivityHeader icon="info-circle-o" text="浏览用户" />
        <div className={styles.input}>
          <SearchInput placeholder="输入关键词点击搜索"
            handleSubmit={this.handleChange} />
        </div>
        <QueueAnim type={['bottom', 'right']} delay={500}>
          <div className={styles.flex}>
            { contents &&
              contents.slice(pageSize * (current - 1), pageSize * current).map(e => (
                <div key={e._id}>
                  <Card className={styles.card}
                    >
                    {
                      e.avatar
                        ? <img onClick={this.handleClick.bind(this, e.id) } src={`/api/photo/show?id=${e.avatar}`} />
                        : <img onClick={this.handleClick.bind(this, e.id) } src={show} />
                    }
                    <div className={styles.title}>
                      <span className={styles.nickname}>{ e.nickname }</span>
                      <span className={styles.username}>&nbsp;@{ e.username }</span>
                    </div>
                  </Card>
                </div>
              ))
            }
          </div>
        </QueueAnim>
        { contents &&
        <Pagination className={styles.pagination}
          current={this.state.current}
          total={contents.length}
          showTotal={total => `共 ${total} 个活动`}
          pageSize={pageSize}
          onChange={this.handlePagination} />
        }
      </div>
    );
  }
}
export default AccountSearchPage
