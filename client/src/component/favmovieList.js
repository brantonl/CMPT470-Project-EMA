import React, { Component } from 'react'
import { List } from 'antd'
import config from '../config.js'
import storage from '../utils/Storage'
import axios from 'axios'

class FavMovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/movies',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        movies: response.data.data,
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
        dataSource={this.state.movies}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
            <img src={item.posterURL} style={{ width: 250 }} />
          </List.Item>
        )}
      />
    )
  }
}

export default FavMovieList
