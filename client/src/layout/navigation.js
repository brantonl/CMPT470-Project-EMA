import React, { Component } from 'react'
import { Menu, Button, Icon, Layout, Avatar, Tooltip } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import storage from '../utils/Storage'
const { Header } = Layout

class Navigation extends Component {
  state = {
    username: storage.getUserInfo().username
  }

  render () {
    const adminButton = storage.canReadUser()
      ? <Menu.Item>
        <Link to='/manage/analysis'>
          <Icon type='user' />
            Admin Dashboard
          </Link>
      </Menu.Item>
      : null

    return (
      <div className='Navigation'>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item>
              <Link to='/dining/find_restaurant'>
                <Icon type='shop' />
                Dining
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to='/movie'>
                <Icon type='video-camera' />
                Movie
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to='/expense'>
                <Icon type='pie-chart' />
                Expenses
              </Link>
            </Menu.Item>

            {adminButton}
            <Menu.Item
              style={{
                float: 'right',
                marginLeft: '-20px'
              }}
            >
              <Tooltip title='logout' placement='bottom'>
                <Button
                  shape='circle'
                  size='small'
                  type='dashed'
                  onClick={storage.logOutUser}
                  style={{ textAlign: 'center', backgroundColor: '#efefef' }}
                >

                  <Icon type='logout' />

                </Button>
              </Tooltip>
            </Menu.Item>
            <Menu.Item>
              <Link to='/find_user'>
                <Icon type='search' />
                Find User
              </Link>

            </Menu.Item>
            <Menu.Item
              style={{
                textAlign: 'right',
                float: 'right'
              }}
            >
              <Link to='/my_profile'>
                <Avatar src={storage.getUserInfo()['avatarUrl']} />
                &nbsp;&nbsp;&nbsp;
                {this.state.username}
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    )
  }
}

export default withRouter(Navigation)
