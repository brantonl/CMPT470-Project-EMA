import React, { Component } from 'react'
import storage from '../utils/Storage'
import config from '../config.js'
import axios from 'axios'
import UserList from '../component/userList'

class MyFollowing extends Component {
  state = {
    users: []
  }
  componentDidMount () {
    this.getUserList()
  }
  getUserList () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/user/' + storage.getUserInfo().id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        users: response.data.followers,
        loading: false
      })
    })
  }

  render () {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
    )
  }
}

export default MyFollowing
