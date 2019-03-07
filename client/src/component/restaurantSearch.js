import React, { Component } from 'react'
import { Input } from 'antd'

const Search = Input.Search

class DiningSearch extends Component {
  render () {
    return (
      <Search
        placeholder='Please enter city, price level ($-$$$$) or name, etc.'
        onSearch={value => this.getRestaurantList}
        enterButton
      />
    )
  }
}

export default DiningSearch
