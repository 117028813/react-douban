const express = require('express')
const superagent = require('superagent')
const app = express()
const fs = require('fs')

app.get('/list', function (req, res) {
  console.log(req.query.next_date)
  let next_date = req.query.next_date || ''
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  superagent.get(`https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=${next_date}&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1`)
    .end(function (err, response) {
      if (err) {
        console.log('获取数据出错')
        fs.readFile('./data.txt', 'utf-8', (err, data) => {
          res.send(data)
        })
        return;
      }
      recommend_feeds = response.body.recommend_feeds
      console.log(recommend_feeds)
      let count = 0
      let countLayout5 = 0
      let countMorePicTotal = 0
      for (let i = 0; i < recommend_feeds.length; i++) {
        if (recommend_feeds[i].layout === 5) {
          countLayout5++
          let morePicUrls = recommend_feeds[i].target.more_pic_urls
          for (let j = 0; j < morePicUrls.length; j++) {
            superagent.get(morePicUrls[j]).end((err, response1) => {
              morePicUrls[j] = response1.body.toString('base64')
              countMorePicTotal++
            })
          }
        }
        if (!recommend_feeds[i].target.cover_url) {
          count++;
          continue;
        }
        superagent.get(recommend_feeds[i].target.cover_url).end((err, response2) => {
          recommend_feeds[i].target.cover_url = response2.body.toString('base64')
          count++;
          if (count === recommend_feeds.length && countLayout5 * 2 === countMorePicTotal) {
            console.log('done')
            res.send(recommend_feeds)
            fs.writeFile('./data.txt', JSON.stringify(recommend_feeds), err => {
              if (err) throw err
              console.log('File saved!')
            })
          }
        })
      }      
    })
})

app.listen(3000, function () {
  console.log('http://localhost:3000/')
})
