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

//defaultne je global user nastaveni null 
global_user = null
const getUser = (request, response) => {
  const {username, password} = request.body
  //skontrolovanie, ci najdeme takeho pouzivatela
  if(pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]) != null) {
    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      //ak najdeme takeho pouzivatela nastavime global_user, kde si pamatame id aktualne prihlaseneho usera
      global_user = pool.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password])
    })
    //po prihlaseni sa zobrazia vsetky clanky
    pool.query('SELECT * FROM news ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else {
    print('Zle meno alebo heslo.')
  }
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

const updateProfile = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, password } = request.body

  pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3', [username, password, id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
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

const createNews = (request, response) => {
  //chcek id validity ( ci je admin, pokial nie - > 403 ) -> pokial nieje prihlaseny -> global_ID == NULL
  //chcek validity je vlastne select rights from users where id==global_ID -> if rights==1 tak je admin
  const id = global_user
  //check, ci  je prihlaseny 
  if(global_user == null) {
    print('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je admin
  else if (pool.query('SELECT rights FROM users WHERE id = $1', [id]) == 0) {
    response.status(403).send(`Pouzivatel nie je admin.`)
  }
  //aj je prihlaseny a je admin
  else {
    const {title, description, created_at, author} = request.body

    pool.query('INSERT INTO news (title, description, created_at, author) VALUES ($1,$2,$3,$4)', [title, description, created_at, author], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`News added with ID: ${results.insertId}`)
      
      //get clanok pre zobrazenie
      const id = global_user
      pool.query('SELECT * FROM news WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    })
  }
}

const updateNews = (request, response) => {
  const id = parseInt(request.params.id)
  const {description} = request.body
  //chek ci som prihlaseny&&som autor udalosti
  //over ci description nieje null pripadne ci sa  nerovna '' -> ak sa rovna tak ERROR
  //bez ohladu na to ci je prazdny alebo nie, treba getnut clanok ktory chcel menit
  pool.query(
    'UPDATE news SET description = $1 WHERE id = $2',
    [description, id],
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
  const id = global_user
  //check, ci  je prihlaseny 
  if(global_user == null) {
    print('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je admin  -- neviem, ci to chceme tak, ze eventy moze vytvarat hocikto, alebo len admin 
  else if (pool.query('SELECT rights FROM users WHERE id = $1', [id]) == 0) {
    print('Pouzivatel nie je admin.')
  }
  else {
    const {title, when_date, when_time, capacity, points, type, adress, description, modified, creator} = request.body

    pool.query('INSERT INTO events (title, when_date, when_time, capacity, points, type, adress, description, modified, creator) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [title, when_date, when_time, capacity, points, type, adress, description, modified, creator], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`Event added with ID: ${results.insertId}`)
    })
  }
}

const updateEvent = (request, response) => {
  //zadanie konkretnej udalosti, ktoru chceme menit
  const id_event = parseInt(request.params.id)
  const {capacity} = request.body

  const id_user = global_user
  //check, ci  je prihlaseny 
  if(global_user == null) {
    print('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je creator toho eventu 
  else if (pool.query('SELECT creator FROM events WHERE id = $1', [id_event]) != id_user) {
    print('Pouzivatel nie je creator.')
  }
  //ak je prihlaseny a je creator tak moze zmenit 
  else {
    //zistenie, ci zmenena kapacita je vacsia ako aktualna ucast na evente
    if (pool.query('SELECT count(id_event) FROM participation WHERE id_event = $1', [id_event]) < capacity) {
      pool.query('UPDATE events SET capacity = $1 WHERE id = $2', [capacity, id_event], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Event modified with ID: ${id_event}`)
      })
    }
    else {
      print('Je viac ucastnikov uz prihlasenych, nemozeme znizit kapacitu.')
    }
    //pri zmenenej, aj nezmenenej kapacite sa zobrazi konkretna udalost 
    pool.query('SELECT * FROM events WHERE id = $1', [id_event], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
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
  //nacitanie jednej konkretnej udalosti do ktorej sa chce pridat ucastnik
  const id_event = parseInt(request.params.id)
  pool.query('SELECT * FROM events WHERE id = $1', [id_event], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
  const id_user = global_user
  //check, ci  je prihlaseny 
  if(global_user == null) {
    print('Pouzivatel nie je prihlaseny.')
  }
  //ak je pouzivatel prihlaseny vkladame id udalosti a id usera (global_user)
  else {
    pool.query('INSERT INTO participants (id_event, id_user) VALUES ($1,$2)', [id_event, id_user], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`Event added with ID: ${results.insertId}`)
    })
  }
}


  module.exports = {
    //upladPic
    //getPic
    getUser, //-> v nom bude autentifikacia a zaroven nacitanie vsetkych clankov
    getNews,
    getNewsId,
    getProfile,
    createUser,
    createNews,
    updateProfile,
    updateNews,
    deleteNews,
    getEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent,
    getParticipants,
    addParticipant
  }
