const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./server')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/news', db.getNews)
app.get('/news/:id', db.getNewsId)
app.get('/users/:id', db.getProfile)
app.post('/users', db.createUser)
app.post('/news', db.createNews)
app.put('/users/:id', db.updateProfile)
app.put('/news/:id', db.updateNews)
app.delete('/news/:id', db.deleteNews)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})