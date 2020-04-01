const Pool = require('pg').Pool

const pool = new Pool({
    "user": "postgres",
    "password": "admin",
    "host": "localhost",
    "port": 5433,
    "database": "sadenie"
})

const createUser = (request, response) => {
    const {username, password, photo, rights, points, adress } = request.body
  
    pool.query('INSERT INTO users (username, password, photo, rights, points, adress) VALUES ($1, $2,$3,$4,$5,$6)', [username, password, photo, rights, points, adress], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

const getNews = (request, response) => {
  pool.query('SELECT * FROM news ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNewsId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM news WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProfile = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createNews = (request, response) => {
  const {title, description, created_at, author} = request.body

  pool.query('INSERT INTO news (title, description, created_at, author) VALUES ($1,$2,$3,$4)', [title, description, created_at, author], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`News added with ID: ${results.insertId}`)
  })
}

const updateProfile = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, password } = request.body

  pool.query(
    'UPDATE users SET username = $1, password = $2 WHERE id = $3',
    [username, password, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const updateNews = (request, response) => {
  const id = parseInt(request.params.id)
  const {title} = request.body

  pool.query(
    'UPDATE news SET title = $1 WHERE id = $2',
    [title, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`News modified with ID: ${id}`)
    }
  )
}

const deleteNews = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM news WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`News deleted with ID: ${id}`)
  })
}

const getEvents = (request, response) => {
  pool.query('SELECT * FROM events ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEventId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEvent = (request, response) => {
  const {title, when_date, when_time, capacity, points, type, adress, description, modified, creator} = request.body

  pool.query('INSERT INTO events (title, when_date, when_time, capacity, points, type, adress, description, modified, creator) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [title, when_date, when_time, capacity, points, type, adress, description, modified, creator], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`Event added with ID: ${results.insertId}`)
  })
}

const updateEvent = (request, response) => {
  const id = parseInt(request.params.id)
  const {title} = request.body

  pool.query(
    'UPDATE events SET points = $1 WHERE id = $2',
    [points, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Event modified with ID: ${id}`)
    }
  )
}

const deleteEvent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Event deleted with ID: ${id}`)
  })
}

const getParticipants = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT count(id_event) FROM participation WHERE id_event = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addParticipant = (request, response) => {
  const {id_event, id_user} = request.body

  pool.query('INSERT INTO participants (id_event, id_user) VALUES ($1,$2)', [id_event, id_user], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`Event added with ID: ${results.insertId}`)
  })
}


  module.exports = {
    getNews,
    getNewsId,
    getProfile,
    createUser,
    createNews,
    updateProfile,
    updateNews,
    deleteNews,
    //updateUser,
    //deleteUser,
    getEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent,
    getParticipants,
    addParticipant
  }
