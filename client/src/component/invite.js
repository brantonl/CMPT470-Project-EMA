import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon, Tooltip, message } from 'antd'
class Invite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  invite = () => {
    axios({
      method: 'POST',
      url: config.base_url + 'api/v1/user/invite',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        email: this.props.user.email,
        friend: this.props.user.username,
        item: this.props.content
      }
    }).then(() => {
      message.success('Your invitation has been sent')
      this.props.closeModal()
    })
  }

  render () {
    return (
      <div className='App'>

        <Tooltip title='Invite' placement='right'>
          <Button onClick={this.invite}>
            <Icon type='mail' />
          </Button>
        </Tooltip>

      </div>
    )
  }
}

export default Invite
