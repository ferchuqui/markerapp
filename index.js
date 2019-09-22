const express = require('express')
const low = require('lowdb')
const shortid = require('shortid')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({markers: []})
  .write()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/markers', (req, res) => {
  res.send(db.get('markers').value())
})

app.post('/markers', (req, res) => {
  const id = shortid.generate()
  db.get('markers').push({ id, ...req.body }).write()
  
  res.send({
    id
  })
})

app.delete('/markers/:id', (req, res) => {
  db.get('markers').remove({ id: req.params.id}).write()
  
  res.send({
    id: req.params.id
  })
})

app.listen(port, () => console.log(`Marker app listening on port ${port}!`))
