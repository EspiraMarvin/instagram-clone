/*
         dependencies
    script
    section- 1 -run- (npm start) - to start nodemon index.js to start the server automatically using nodemon
    section 2 -run - (npm run deploy) - deploy app to heroku from local directory
    before that we used a plugin to connect local dir to heroku instead of using github repo by running this command
    (heroku plugins:install heroku-builds) from heroku builds
 */
const express = require('express')

const admin = require('firebase-admin')

/*
        config -firebase section
 */

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

/*

config - express

*/
const app = express()
/*

listen

*/

/*

endpoint - posts

*/

app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  const posts = []
  db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data())
      posts.push(doc.data())
    })
    response.send(posts)
  })
})

/*

endpoint - createPosts

*/

app.post('/createPost', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.send(request.headers)
})

app.listen(process.env.PORT || 3000)
