import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon } from 'antd'
class FavRes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFav: this.props.rest.isFav,
      favMsg: this.props.rest.favMsg
    }
  }
  componentDidMount () {
    this.setState({
      isFav: '',
      favMsg: 'Add to Favourite'
    })
  }

  addFavRestaurant = () => {
    axios({
      method: 'POST',
      url: config.base_url + 'api/v1/dining',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        rest_id: this.props.rest.id,
        name: this.props.rest.name
      }
    })
      .then(() => {
        this.setState({
          isFav: 'filled',
          favMsg: 'Remove from Favorite'
        })
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  render () {
    return (
      <div>
        <Button onClick={this.addFavRestaurant}>
          <Icon type='heart' theme={this.state.isFav} />
          {this.state.favMsg}
        </Button>
      </div>
    )
  }
}

export default FavRes
