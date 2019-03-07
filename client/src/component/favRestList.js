import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import config from '../config.js'
import storage from '../utils/Storage'
import axios from 'axios'

class FavRestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        restaurants: response.data.data,
        loading: false
      })
    })
  }

  render () {
    return (
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        dataSource={this.state.restaurants}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<a href={item.url}>{item.name}</a>}
              description={item.phone}
            />
            <img alt={item.name} src={item.image_url} style={{ width: 300 }} />
            <br />
            {item.address + ', ' + item.city}
          </List.Item>
        )}
      />
    )
  }
}

export default FavRestList
