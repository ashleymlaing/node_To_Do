const express = require('express')
const axios = require("axios")
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://test:password1@ds123770.mlab.com:23770/mango', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mango')
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('mango').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {items: result})
  })
  //res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/createItem', (req, res) => {
  db.collection('mango').save({name: req.body.item}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/deleteItem', (req, res) => {
  console.log("test");
db.collection('mango').findOneAndDelete({name: req.body.item}, (err, result) => {
  if (err) return res.send(500, err)
  res.send('Message deleted!')
})
})
