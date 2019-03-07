import React, { Component } from 'react'
import { List, Avatar, Button, Modal, Tooltip } from 'antd'
import config from '../config.js'
import storage from '../utils/Storage'
import Invite from '../component/invite'
import axios from 'axios'

class FriendList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friends: []
    }
  }

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/user/friends/index',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        friends: response.data.data,
        loading: false
      })
    })
  }

  render () {
    return (
      <div>
        <Tooltip title='invite friend'>
          <Button icon='team' onClick={this.showModal} />
        </Tooltip>
        <Modal
          style={{ width: '30%' }}
          title='Friends'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <List
              itemLayout='horizontal'
              dataSource={this.state.friends}
              renderItem={item => (
                <div>
                  <List.Item
                    actions={[
                      <Invite
                        user={item}
                        content={this.props.content}
                        closeModal={this.handleOk}
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatarUrl} />}
                      title={item.username}
                    />
                  </List.Item>

                </div>
              )}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

export default FriendList
