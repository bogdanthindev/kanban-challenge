import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      list: []
    }

    this.getData = this.getData.bind(this)
  }
  render () {
    const items = this.state.list
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button type='button' onClick={this.getData}>
          Get data
        </button>
        <ul>
          {
            items.length > 0 && items.map(i => <li> {i.name} - {i._id} </li>)
          }
        </ul>
      </div>
    )
  }

  getData () {
    // eslint-disable-next-line
    fetch('/api?query={getItems{name,_id}}')
        .then(res => {
          return res.json()
        })
        .then(res => {
          this.setState({
            list: res.data.getItems
          })
        })
  }
}

export default App
