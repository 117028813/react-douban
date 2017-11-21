import React, {Component} from 'react';
import './FeedItem.less';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: `data:image/png;base64,${this.props.recommendFeed.target.cover_url}`,
      morePicUrl1: `data:image/png;base64,${this.props.recommendFeed.target.more_pic_urls[0]}`,
      morePicUrl2: `data:image/png;base64,${this.props.recommendFeed.target.more_pic_urls[1]}`,
    }
  }
  
  render() {
    let feedContent;
    const recommendFeed = this.props.recommendFeed;
    if (recommendFeed.layout === 5) {
      feedContent = (
        <div className="feed-content">
          <div className="photos">
            <div className="main">
              <img src={this.state.coverUrl} alt="" />
            </div>
            <div className="aside">
              <div className="aside-pic">
                <img src={this.state.morePicUrl1} alt="" />
              </div>
              <div className="aside-pic">
                <img src={this.state.morePicUrl2} alt="" />
                <div className="more-pic">
                  <span className="count">{recommendFeed.target.photos_count - 3}+</span>
                </div>
              </div>
            </div>
          </div>
          <h3>{recommendFeed.title}</h3>
        </div>
      )
    } else {
      let img = null;
      if (recommendFeed.target.cover_url) {
        img = <img className="img" src={this.state.coverUrl} alt="" />
      }
      feedContent = (
        <div className="feed-content">
          {img}
          <h3>{recommendFeed.title}</h3>
          <p>{recommendFeed.target.desc}</p>
        </div>
      )
    }
    return (
      <a href="#0" className="feed-item">
        {feedContent}
        <div className="footer">
          <div className="author">
            by <span className="name">{recommendFeed.target.author.name}</span>
          </div>
          <span className="feed-label">{recommendFeed.source_cn}</span>
        </div>
      </a>
    )
  }
}

export default FeedItem;