const express = require('express')
const low = require('lowdb')
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
  console.log(req.body)
  res.send({"message": "ok"})
  db.get('markers')
    .push(req.body)
    .write()
})

app.listen(port, () => console.log(`Marker app listening on port ${port}!`))
