import React, { Component } from 'react'
import listData from '../container/data/moviesDB1.json'
import { List, Icon, Button } from 'antd'
import config from '../config.js'
import axios from 'axios'
import storage from '../utils/Storage'
import ReviewModal from './movieReviewModal'
import MovieSearch from './movieSearch'
import MovieTransaction from './movieTransaction'
import FriendList from './friendList'

const addToWishlist = 'Add to wishlist'
const removeFromWishlist = 'Remove from wishlist'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Mdata: [],
      outputList: [],
      reviews: [],
      favorite_list: [],
      modal_visible: false,
      review_title: '',
      review_content: '',
      review_movie_id: '',
      trans_modal_visible: false,
      trans_title: '',
      transVal: '',
      del_id: '',
      review_rate: 0
    }
  }

  getFavorite () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/movies',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.setState({
          favorite_list: Array.from(response.data.data)
        })
        this.extractList()
      })
      .catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
  }

  extractList () {
    const tmp = []
    for (let i = 0; i < listData.movies.length; i++) {
      tmp.push({
        id: listData.movies[i].id,
        title: listData.movies[i].name,
        release: listData.movies[i].releaseDate.substring(0, 10),
        avatar: listData.movies[i].posterLargeURL,
        Movie_len: listData.movies[i].runtime,
        genres: listData.movies[i].genres,
        synopsis: listData.movies[i].synopsis,
        href: listData.movies[i].webURL,
        inWishlist: false,
        btnText: addToWishlist
      })
      for (let j = 0; j < this.state.favorite_list.length; j++) {
        if (listData.movies[i].id === this.state.favorite_list[j].id) {
          tmp[i].inWishlist = true
          tmp[i].btnText = removeFromWishlist
        }
      }
    }
    this.setState({
      Mdata: tmp,
      outputList: tmp
    })
  }

  componentDidMount () {
    this.getFavorite()
  }

  handleClick (key, imageURL, title) {
    function findMovieID (records) {
      return records.id === key
    }
    const index = this.state.Mdata.findIndex(findMovieID)
    this.changeWishlist(index)
    this.changebtnText(index)
    this.forceUpdate()

    if (this.state.Mdata[index].inWishlist) {
      axios({
        method: 'POST',
        url: config.base_url + 'api/v1/movies',
        data: {
          name: title,
          movieId: key,
          posterURL: imageURL
        },
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        }
      }).catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
    } else {
      axios({
        method: 'delete',
        url: config.base_url + 'api/v1/movies/' + key,
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        }
      }).catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
    }
  }

  showmodal (id) {
    this.setState({
      modal_visible: true
    })
    this.forceUpdate()
  }

  showTransModal (movie_title) {
    this.setState({
      trans_modal_visible: true,
      trans_title: movie_title
    })
    this.forceUpdate()
  }

  getReviewIndex (records) {
    return records.id === this.state.review_movie_id
  }

  handleOk () {
    if (
      !this.state.review_title &&
      !this.state.review_content &&
      this.state.review_rate === 0
    ) {
      alert('Please input the review title, content and rating.')
    } else if (!this.state.review_title && !this.state.review_content) {
      alert('Please input the review title and content.')
    } else if (!this.state.review_title && this.state.review_rate === 0) {
      alert('Please input the review title and the rating.')
    } else if (!this.state.review_content && this.state.review_rate === 0) {
      alert('Please input content for the review and the rating.')
    } else if (!this.state.review_content) {
      alert('Please input content for the review.')
    } else if (!this.state.review_title) {
      alert('Please input review title.')
    } else if (this.state.review_rate === 0) {
      alert('Please select the rating for this movie.')
    } else {
      axios({
        method: 'POST',
        url: config.base_url + 'api/v1/review',
        data: {
          reviewTitle: this.state.review_title,
          reviewContent: this.state.review_content,
          rate: this.state.review_rate,
          movieId: this.state.review_movie_id
        },
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        }
      })
        .then(response => {
          this.getReviews(this.state.review_movie_id, false)
          this.setState({
            review_title: '',
            review_content: '',
            review_rate: 0
          })
        })
        .catch(err => {
          console.log(err)
          alert('Unexpected error occured. Please try again later')
        })
    }
  }

  getReviews (movieID, showBool) {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/review/' + movieID,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.setState({
          review_movie_id: movieID,
          reviews: response.data.data
        })
        if (showBool) {
          this.showmodal()
        }
      })
      .catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
  }

  handleCancel () {
    this.setState({
      modal_visible: false,
      review_movie_id: ''
    })
    this.forceUpdate()
  }

  handleReviewDelete (reviewID) {
    axios({
      method: 'delete',
      url: config.base_url + 'api/v1/review/' + reviewID,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.getReviews(this.state.review_movie_id, false)
      })
      .catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
  }

  transModalCancel () {
    this.setState({
      trans_modal_visible: false,
      trans_title: ''
    })
    this.forceUpdate()
  }

  onTitleChange (event) {
    this.setState({
      review_title: event.target.value
    })
    this.forceUpdate()
  }

  onContentChange (event) {
    this.setState({
      review_content: event.target.value
    })
    this.forceUpdate()
  }

  onRateChange (value) {
    this.setState({
      review_rate: value
    })
    this.forceUpdate()
  }

  onTransValChange (event) {
    this.setState({
      transVal: event.target.value
    })
    this.forceUpdate()
  }

  onSearch (value) {
    let target = []
    if (value.trim() !== '') {
      for (let i = 0; i < this.state.Mdata.length; i++) {
        if (this.state.Mdata[i].title.toLowerCase().includes(value)) {
          target.push(this.state.Mdata[i])
        }
      }
    } else {
      alert('Please input title to search for movies')
      target = this.state.Mdata
    }
    this.setState({
      outputList: target
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
          description: 'purchase movie ticket of ' + this.state.trans_title
        },
        headers: {
          Authorization: 'Bearer ' + storage.getAuthToken()
        }
      }).catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
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

  changeWishlist (index) {
    let listData = this.state.Mdata
    listData[index].inWishlist = !listData[index].inWishlist
    this.setState({
      Mdata: listData
    })
  }

  changebtnText (index) {
    let listData = this.state.Mdata
    if (!listData[index].inWishlist) {
      listData[index].btnText = addToWishlist
    } else {
      listData[index].btnText = removeFromWishlist
    }

    this.setState({
      Mdata: listData
    })
  }

  render () {
    return (
      <div>
        <MovieSearch onSearch={this.onSearch.bind(this)} />
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            pageSize: 5
          }}
          dataSource={this.state.outputList}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type='clock-circle' text={item.release} />,
                <IconText type='hourglass' text={item.Movie_len} />,
                <p>
                  trailer:
                  {' '}
                  <a href={item.trailer} target='_blank'>
                    <Icon type='play-circle' />
                  </a>
                </p>,
                <p>
                  <IconText type='heart' />
                  <Button
                    onClick={() =>
                      this.handleClick(item.id, item.avatar, item.title)}
                  >
                    {item.btnText}
                  </Button>
                </p>,
                <p>
                  <IconText type='pay-circle' />
                  <Button onClick={() => this.showTransModal(item.title)}>
                    Add transaction
                  </Button>
                </p>,
                <p>
                  <IconText type='message' />
                  <Button onClick={() => this.getReviews(item.id, true)}>
                    Reviews
                  </Button>
                </p>,
                <FriendList content={item.title} />
              ]}
              extra={<img width={250} alt='logo' src={item.avatar} />}
            >
              <List.Item.Meta
                title={<a href={item.href} target='_blank'>{item.title}</a>}
                description={item.genres}
              />
              {item.synopsis}
            </List.Item>
          )}
        />
        <MovieTransaction
          visible={this.state.trans_modal_visible}
          handleOk={this.addTransaction.bind(this)}
          handleCancel={this.transModalCancel.bind(this)}
          onTransValChange={this.onTransValChange.bind(this)}
          value={this.state.transVal}
          movieTitle={this.state.trans_title}
        />
        <ReviewModal
          visible={this.state.modal_visible}
          handleOk={this.handleOk.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
          onTitleChange={this.onTitleChange.bind(this)}
          onContentChange={this.onContentChange.bind(this)}
          onRateChange={this.onRateChange.bind(this)}
          title={this.state.review_title}
          content={this.state.review_content}
          reviews={this.state.reviews}
          rateVal={this.state.review_rate}
          userID={storage.getUserInfo().id}
          permission={storage.canDeleteComments()}
          onDelete={this.handleReviewDelete.bind(this)}
        />
      </div>
    )
  }
}

export default MovieList
