import React, { Component } from 'react';
import './App.less';
import axios from 'axios';
import FeedItem from './FeedItem';

function getDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dateDay = date.getDate()
  return `${year}-${month}-${dateDay}`
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendFeeds: [],
      next_date: '',
    }
  }
  componentDidMount() {
    let _this = this;
    let appHeight;

    axios.get('http://localhost:3000/list')
      .then(response => {
        console.log(response);
        this.setState({
          recommendFeeds: response.data
        })
        appHeight = this.div.getBoundingClientRect().height;
      })
    
    if (!this.state.next_date) {
      this.setState({
        next_date: getDate(new Date())
      })
    }
    
    window.onscroll = function () {
      if (this.scrollY + window.innerHeight + 60 >= appHeight) {
        appHeight += 500;
        axios.get(`http://localhost:3000/list?next_date=${_this.state.next_date}`)
          .then(function (response) {
            _this.setState(prevState => {
              return {
                recommendFeeds: prevState.recommendFeeds.concat(response.data),
                next_date: getDate(new Date(new Date(prevState.next_date).getTime() - 24*60*60*1000))
              }
            })
            appHeight = _this.div.getBoundingClientRect().height;
          })
      }
    }
  }

  render() {
    let recommendFeeds = this.state.recommendFeeds;
    let listItems = recommendFeeds.map(item => 
      <FeedItem key={item.target.url} recommendFeed={item} />
    )
    return (
      <div className="App feed-section" ref={div => {this.div = div}}>
        {listItems}
      </div>
    );
  }
}

export default App;
