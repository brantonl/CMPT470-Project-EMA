import React, { Component } from 'react'
import { Input } from 'antd'
import storage from '../utils/Storage'
import config from '../config.js'
import axios from 'axios'
import UserList from '../component/userList'

const Search = Input.Search

class FindUser extends Component {
  state = {
    users: []
  }
  getUserList = async input => {
    axios({
      method: 'POST',
      url: config.base_url + 'api/v1/user/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        input: input
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
        <h1>Find User</h1>
        <Search
          placeholder='name/email'
          onSearch={value => this.getUserList(value)}
          style={{ width: 200 }}
        />
        <br /><br />
        <UserList users={this.state.users} />
      </div>
    )
  }
}

export default FindUser
