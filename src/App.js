import React, { Component } from 'react';
import './App.less';
import axios from 'axios';
import FeedItem from './FeedItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendFeeds: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/list')
      .then(response => {
        console.log(response);
        this.setState({
          recommendFeeds: response.data
        })
      })
  }

  render() {
    let recommendFeeds = this.state.recommendFeeds;
    let listItems = recommendFeeds.map(item => 
      <FeedItem key={item.id} recommendFeed={item} />
    )
    return (
      <div className="App feed-section">
        {listItems}
      </div>
    );
  }
}

export default App;
