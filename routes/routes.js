const fs = require('fs')
const path = require('path')

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/ping', (req, res) => {
    res.status(200).send({success: true})
  })

  app.get('/posts/:id/comments', (req,res) => {
    let posts
    let comments

    var promises = [
      getData('../data/posts.json'),
      getData('../data/comments.json')
    ]

    Promise.all(promises)
    .then(result => {
      posts = JSON.parse(result[0])
      comments = JSON.parse(result[1])
      let commentsArray = comments.filter(comment => {
        return comment.postId == req.params.id
      })
  
      res.json(commentsArray)
    })
  })

  app.get('/posts/:id', (req, res) => {
    let posts
    getData('../data/posts.json')
    .then(result => {
      posts = JSON.parse(result)
      let filteredArray = posts.filter(post => {
        return post.id == req.params.id
      })
      res.json(filteredArray)
    })
  })

  app.get('/posts', (req, res) => {
    getData('../data/posts.json')
    .then(result => {
      res.json(JSON.parse(result))
    })
  })

  app.get('/comments/:id', (req, res) => {
    let comments
    getData('../data/comments.json')
    .then(result => {
      comments = JSON.parse(result)
      let filteredArray = comments.filter(comment => {
        return comment.id == req.params.id
      })
      res.json(filteredArray)
    })
  })

  app.get('/comments', (req, res) => {
    getData('../data/comments.json')
    .then(result => {
      res.json(JSON.parse(result))
    })
  })
}

function getData(fileName) {
  return fs.promises.readFile(path.resolve(__dirname, fileName), 'utf-8')
}