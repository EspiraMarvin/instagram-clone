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
// const inspect = require('util').inspect
const Busboy = require('busboy')
const UUID = require('uuid-v4')

/*
        config -firebase section
 */

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'quasargram-96646.appspot.com'
})

const db = admin.firestore()
const bucket = admin.storage().bucket()
const path = require('path')
const os = require('os')
// fs - fileserver
const fs = require('fs')

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

  const uuid = UUID()

  const busboy = new Busboy({ headers: request.headers })
  const fields = {}
  let fileData = {}

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    // temp/image.png - writing file to temp folder
    const filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = { filepath, mimetype }
  })
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    // console.log('Field [' + fieldname + ']: value: ' + inspect(val))
    fields[fieldname] = val
  })
  busboy.on('finish', function () {
    // upload image - there's one metadata object for the upload and another for the file
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimetype,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile)
        }
      }
    )

    function createDocument (uploadedFile) {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
      }).then(() => {
        response.send('Post Added: ' + fields.id)
      }).catch(err => console.log(err))
    }
    response.send('Done passing form!')
  })
  request.pipe(busboy)
})

app.listen(process.env.PORT || 3000)
