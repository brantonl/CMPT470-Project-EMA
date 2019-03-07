import React, { Component } from 'react'
import { Table, Avatar } from 'antd'
import Follow from './follow'
const columns = [
  {
    render: text => <Avatar src={text.avatarUrl} />
  },
  {
    title: 'Username',
    dataIndex: 'username',
    render: text => <a href='javascript:;'>{text}</a>
  },
  {
    title: 'User id',
    dataIndex: 'id',
    render: text => <p>#{text}</p>
  },
  {
    render: text => (
      <div>
        <Follow user={text} />
      </div>
    )
  }
]

class UserList extends Component {
  state = {
    users: []
  }

  render () {
    return <Table columns={columns} dataSource={this.props.users} />
  }
}

export default UserList
