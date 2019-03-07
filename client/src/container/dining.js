import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import myData from './data/demoRestaurant.json'
import DiningList from '../component/diningList'
import { Icon, Input, Select, Button, Row, Col } from 'antd'
import storage from '../utils/Storage'
const Search = Input.Search

const baseUrl = config.base_url

const Option = Select.Option

class Dining extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      listLoading: true,
      loading: false,
      iconloading: false,
      location: 'vancouver',
      price: '',
      categories: '',
      sort_by: '',
      open_now: true,
      attributes: ''
    }
  }

  componentDidMount = () => {
    try {
      axios({
        method: 'post',
        url: baseUrl + 'api/v1/dining/search',
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        },
        data: {
          location: this.state.location
        }
      }).then(res => {
        this.setState({
          listData: res.data.data,
          listLoading: false
        })
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  handleChange(value) {
    console.log(value)
  }

  handlePriceChange = value => {
    this.setState({ price: value })
  }

  handleCategoriesChange = value => {
    this.setState({ categories: value })
  }

  handleSortChange = value => {
    this.setState({ sort_by: value })
  }

  handleOpenNowChange = value => {
    this.setState({ open_now: value })
  }

  handleSpecialChange = value => {
    this.setState({ attributes: value })
  }

  getRestaurantList = value => {
    let data = JSON.parse(JSON.stringify(myData))
    if (!value || value === '') {
      alert('Please enter your keyword')
      this.setState({
        location: 'vancouver',
        listData: data.businesses,
        listLoading: false
      })
    } else {
      axios({
        method: 'post',
        url: baseUrl + 'api/v1/dining/search',
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        },
        data: {
          location: value
        }
      }).then(response => {
        this.setState({
          location: value,
          listData: response.data.data,
          listLoading: false
        })
      })
    }
  }

  enterLoading = () => {
    this.setState({ loading: true })
  }

  refineResult = () => {
    axios({
      method: 'post',
      url: baseUrl + 'api/v1/dining/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        location: this.state.location,
        price: this.state.price,
        categories: this.state.categories,
        sort_by: this.state.sort_by,
        open_now: this.state.open_now,
        attributes: this.state.attributes
      }
    }).then(response => {
      this.setState({
        listData: response.data.data,
        listLoading: false,
        iconloading: false
      })
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={3}>
            <Icon type='search' style={{ margin: '6px' }} />
            <span>Location</span>
          </Col>
          <Col span={20}>

            <Search
              style={{
                alignContent: 'left',
                width: '100%',
                display: 'block'
              }}
              defaultValue='vancouver'
              onSearch={value => {
                this.setState({ listLoading: true })
                this.getRestaurantList(value)
              }}
              enterButton
            />
          </Col>
        </Row>
        <br /><br />
        <Select
          showSearch
          style={{ width: 100 }}
          placeholder='Price'
          optionFilterProp='children'
          onChange={this.handlePriceChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='1'>$</Option>
          <Option value='2'>$$</Option>
          <Option value='3'>$$$</Option>
          <Option value='4'>$$$$</Option>
          <Option value=''>Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder='Category'
          optionFilterProp='children'
          onChange={this.handleCategoriesChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='japanese'>Japanese Food</Option>
          <Option value='bakeries'>Bakeries</Option>
          <Option value='chinese'>Chinese Food</Option>
          <Option value='hotdogs'>Fast Food</Option>
          <Option value='bars'>Bars</Option>
          <Option value=''>Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder='Sort By'
          optionFilterProp='children'
          onChange={this.handleSortChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='best_match'>Best Match</Option>
          <Option value='rating'>Rating</Option>
          <Option value='review_count'>Review Count</Option>
          <Option value=''>Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder='Open Now'
          optionFilterProp='children'
          onChange={this.handleOpenNowChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='true'>Yes</Option>
          <Option value='false'>No</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder='Special'
          optionFilterProp='children'
          onChange={this.handleSpecialChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0}
        >
          <Option value='hot_and_new'>Hot&New</Option>
          <Option value='cashback'>Yelp Cashback</Option>
          <Option value='reservation'>Reservation Ready</Option>
          <Option value=''>Default</Option>
        </Select>
        <br /> <br />
        <Button
          type='primary'
          icon='sync'
          loading={this.state.iconloading}
          onClick={() => {
            this.setState({
              iconloading: true,
              listLoading: true
            })
            this.refineResult()
          }}
          iconloading={this.iconloading}
        >
          Refine Result
        </Button>

        <DiningList
          listData={this.state.listData}
          loading={this.state.listLoading}
        />
      </div>
    )
  }
}

export default Dining
