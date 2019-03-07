import React, { Component } from 'react'
import { Table, Avatar } from 'antd'
import storage from '../utils/Storage'
import config from '../config.js'
import axios from 'axios'
import Follow from '../component/follow'

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

class MutualFriends extends Component {
  state = {
    users: []
  }
  componentDidMount () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/user/friends/suggestions',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        users: response.data.data,
        loading: false
      })
    })
  }

  render () {
    return (
      <div>
        <h1>Users you might know</h1>

        <Table columns={columns} dataSource={this.state.users} />
      </div>
    )
  }
}

export default MutualFriends
