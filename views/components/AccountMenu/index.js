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
  { to: '/account/manage_activity', text: '我的活动', icon: 'exception'}
];

@connect(
  state => ({
    user: state.account.user
  })
)
class AccountMenu extends React.Component {
  render() {
    const { user } = this.props
    if (user.isOrganization) {
      menus.push({ to: '/account/add_activity'})
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
