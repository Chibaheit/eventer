/*
 * 账户页面左边的导航条
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'

const menus = [
  { to: '/account', text: '时间轴', icon: 'home'},
  { to: '/account/info', text: '基本信息', icon: 'info-circle-o' },
  { to: '/account/security', text: '安全设置', icon: 'unlock' },
  { to: '/account/manage', text: '我的活动', icon: 'exception'},
  { to: '/account/activitySearch', text: '浏览活动', icon: 'plus'},
  { to: '/account/search', text: '浏览用户', icon: 'plus'}
];

@connect(
  state => ({
    user: state.account.user
  })
)
class AccountMenu extends React.Component {
  render() {
    const { user } = this.props
    if (user && user.isOrganization && menus.length == 6) {
      menus.push({ to: '/account/create', text: '添加活动', icon: 'plus-square'})
    }
    return (
      <Menu onClick={this.handleClick}
        defaultOpenKeys={['sub1']}
        selectedKeys={[location.pathname]}
        mode="inline">
        { menus.map((t) => (
          <Menu.Item key={t.to}>
            <Link to={t.to}>
              <Icon type={t.icon} /> {t.text}
            </Link>
          </Menu.Item>
        )) }
      </Menu>
    )
  }
}

export default AccountMenu
