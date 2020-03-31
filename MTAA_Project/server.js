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
  }
