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
app.get('/users/:username:password', db.getUser)  //toto neviem, ci sa to takto pise 
app.post('/users', db.createUser)
app.post('/news', db.createNews)
app.put('/users/:id', db.updateProfile)
app.put('/news/:id', db.updateNews)
app.delete('/news/:id', db.deleteNews)
app.get('/events', db.getEvents)
app.get('/events/:id', db.getEventId)
app.post('/events', db.createEvent)
app.put('/events/:id', db.updateEvent)
app.delete('/events/:id', db.deleteEvent)
app.get('/participation/:id', db.getParticipants)
app.post('/participation/:id', db.addParticipant)



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
