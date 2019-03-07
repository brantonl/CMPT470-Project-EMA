import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import DiningTransaction from '../component/DiningTransaction'
import FriendList from './friendList'
import { List, Avatar, Icon, Rate, Input, Button, message } from 'antd'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class DiningList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listData: [],
      displayData: [],
      favRestaurants: [],
      loading: true,
      theme: '',
      isFav: 'Add to Favourite',
      trans_modal_visible: false,
      trans_title: '',
      transVal: ''
    }
  }

  extractList () {
    const listData = this.state.listData
    const tmp = []
    for (let i = 0; i < listData.length; i++) {
      tmp.push({
        address: listData[i].address,
        city: listData[i].city,
        id: listData[i].id,
        image_url: listData[i].image_url,
        name: listData[i].name,
        phone: listData[i].phone,
        price: listData[i].price,
        rating: listData[i].rating,
        review_count: listData[i].review_count,
        url: listData[i].url,
        isFav: '',
        favMsg: 'Add to Favourite',
        trans_modal_visible: false,
        trans_title: '',
        transVal: ''
      })
      for (let j = 0; j < this.state.favRestaurants.length; j++) {
        if (listData[i].id === this.state.favRestaurants[j].rest_id) {
          tmp[i].isFav = 'filled'
          tmp[i].favMsg = 'Remove from Favourite'
        }
      }
    }
    this.setState({
      displayData: tmp
    })
  }

  getFavorite () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.setState({
          favRestaurants: Array.from(response.data.data)
        })
        this.extractList(response)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      listData: newProps.listData,
      loading: newProps.loading
    })

    this.getFavorite(newProps)
    this.forceUpdate()
  }

  addFavRestaurant = item => {
    axios({
      method: 'post',
      url: config.base_url + 'api/v1/dining',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        rest_id: item.id,
        name: item.name,
        image_url: item.image_url,
        phone: item.phone,
        city: item.city,
        address: item.address
      }
    })
      .then(response => {
        this.getFavorite()
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  removeRestaurant = item => {
    axios({
      method: 'delete',
      url: config.base_url + 'api/v1/dining/' + item.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.getFavorite()
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  HandleClick = item => {
    if (item.isFav === '') {
      this.addFavRestaurant(item)
    } else {
      this.removeRestaurant(item)
    }
  }

  onTransValChange (event) {
    this.setState({
      transVal: event.target.value
    })
    this.forceUpdate()
  }

  showTransModal (rest_name) {
    this.setState({
      trans_modal_visible: true,
      trans_title: rest_name
    })
    this.forceUpdate()
  }

  transModalCancel () {
    this.setState({
      trans_modal_visible: false,
      trans_title: ''
    })
    this.forceUpdate()
  }

  addTransaction () {
    const regex = /[0-9]+/
    if (regex.test(this.state.transVal)) {
      axios({
        method: 'post',
        url: config.base_url + 'api/v1/transaction',
        data: {
          amount: parseFloat(this.state.transVal),
          description: 'Eat at ' + this.state.trans_title
        },
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        }
      })
        .then(() => {
          message.success('Expense added!')
          this.setState({
            transVal: ''
          })
        })
        .catch(err => {
          throw new Error(err)
        })
      this.setState({
        trans_modal_visible: false
      })
    } else if (this.state.transVal === '') {
      alert('Input cannot be empty')
      this.setState({
        transVal: ''
      })
    } else {
      alert('Input must be numeric')
      this.setState({
        transVal: ''
      })
    }
  }

  render () {
    return (
      <div>
        <List
          itemLayout='vertical'
          size='large'
          loading={this.state.loading}
          pagination={{
            pageSize: 5
          }}
          dataSource={this.state.displayData}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <IconText type='star-o' text={item.review_count} />,
                <Rate allowHalf disabled defaultValue={item.rating} />,
                <p>{item.price || 'N/A'}</p>,
                <Button onClick={() => this.HandleClick(item)}>
                  <Icon type='heart' theme={item.isFav} />
                  {item.favMsg}
                </Button>,
                <Button onClick={() => this.showTransModal(item.name)}>
                  <IconText type='pay-circle' />
                  Add transaction
                </Button>,
                <FriendList content={item.name} />
              ]}
              extra={<img width={272} alt='logo' src={item.image_url} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image_url} />}
                title={<a href={item.url}>{item.name}</a>}
                description={item.phone}
              />
              {item.address + ', ' + item.city}
            </List.Item>
          )}
        />
        <DiningTransaction
          visible={this.state.trans_modal_visible}
          handleOk={this.addTransaction.bind(this)}
          handleCancel={this.transModalCancel.bind(this)}
          onTransValChange={this.onTransValChange.bind(this)}
          value={this.state.transVal}
          restaurantTitle={this.state.trans_title}
        />
      </div>
    )
  }
}

export default DiningList
