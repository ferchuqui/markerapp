const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/markers', (req, res) => {
  res.send([{"description":"","address":"","number":"","coords":{"lat":-34.595986,"lng":-58.3724715},"category":""},{"description":"","address":"","number":"","coords":{"lat":-34.594986,"lng":-58.3744715},"category":""},{"description":"","address":"","number":"","coords":{"lat":-34.534986,"lng":-58.3244715},"category":""},{"description":"","address":"","number":"","coords":{"lat":-34.434986,"lng":-58.2244715},"category":""}])
})

app.listen(port, () => console.log(`Marker app listening on port ${port}!`))
