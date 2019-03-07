import React, { Component } from 'react'
import Routing from './layout/routing'

class App extends Component {
  state = {
    username: 'test user'
  }
  render () {
    return (
      <div className='App' style={{ backgroundColor: '#4286f4' }}>
        <Routing />
      </div>
    )
  }
}

export default App
