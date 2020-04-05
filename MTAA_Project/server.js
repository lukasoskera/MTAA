const Pool = require('pg').Pool
var fs = require("fs");
//defaultne je global user nastaveny null 
global_user = null

const pool = new Pool({
    "user": "postgres",
    "password": "admin",
    "host": "localhost",
    "port": 5433,
    "database": "sadenie" 
})

//HOTOVO
const uploadImage = (request, response) =>{
  const {id_user,type,name} = request.body
  subor = name + type

  let buff = fs.readFileSync(subor);
  let udaje = buff.toString('base64');

  pool.query('INSERT INTO photos (id_user,type,name,data) VALUES ($1, $2,$3,$4)',[global_user,type,name,udaje], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`IMAGE ADDED: ${results.insertId}`)
  })

}

//HOTOVO
const getImage = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM photos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log(results.rows[0].id)

    let bufferko = new Buffer(results.rows[0].data, 'base64');
    meno = results.rows[0].name + results.rows[0].type
    fs.writeFileSync(meno, bufferko);
  })
}

//HOTOVO
const createUser = (request, response) => {
    const {username, password, rights, points, adress } = request.body
  
    pool.query('INSERT INTO users (username, password, rights, points, adress) VALUES ($1,$2,$3,$4,$5)', [username, password, rights, points, adress], (error, results) => {
      if (error) {
        throw error
      }
      pool.query('SELECT * FROM users ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json(`User added with ID: ${results.rows[0].id}`)
      })    
    })
  }

//HOTOVO
const getUser = (request, response) => {
  const {username, password} = request.body
  //skontrolovanie, ci najdeme takeho pouzivatela
  if(pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [request.params.username, request.params.password]) != null) {
    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [request.params.username, request.params.password], (error, results) => {
      if (error) {
        throw error
      }
        global_user = results.rows[0].id
        response.status(200).send("prihlaseny")
      })
  }
  else {
    response.status(400).send('Nespravne meno alebo heslo.')
  }
}

//HOTOVO
const getProfile = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const updateProfile = (request, response) => {
  const { username, password } = request.body

   //check, ci  je prihlaseny 
   if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je creator toho eventu 
  else{
    
    pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3', [username, password, global_user],(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${global_user}`)
    })
  }
}

//HOTOVO
const getNews = (request, response) => {
  pool.query('SELECT * FROM news ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const getNewsId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM news WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const createNews = (request, response) => {

  //check, ci  je prihlaseny 
  if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je admin
  else if (pool.query('SELECT rights FROM users WHERE id = $1', [global_user]) == 0) {
    response.status(403).send(`Pouzivatel nie je admin.`)
  }
  //aj je prihlaseny a je admin
  else {
    const {title, description, created_at, author} = request.body

    pool.query('INSERT INTO news (title, description, created_at, author) VALUES ($1,$2,$3,$4)', [title, description, created_at, global_user], (error, results) => {
      if (error) {
        throw error
      }
      pool.query('SELECT * FROM news ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json(`News added with ID: ${results.rows[0].id}`)
      })      
    })
  }
}

//HOTOVO
const updateNews = (request, response) => {
  const id = parseInt(request.params.id)
  const {description} = request.body

   //check, ci  je prihlaseny 
   if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  //check, ci je creator toho eventu 
  else{
    pool.query('SELECT author FROM news WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      if(results.rows[0].author != global_user){
        response.status(403).send('Pouzivatel nie je autorom clanku.')
      }
      //ak je prihlaseny a je creator tak moze zmenit
      else{ 
        if(description == ''){
          response.status(400).send('Clanok nesmie byt prazdny.')
        }
        else{
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
      }
    })
  }
}

//HOTOVO
const deleteNews = (request, response) => {
  const id = parseInt(request.params.id)

  if(global_user == null) {
    console.log('Pouzivatel nie je prihlaseny.')
  }
  
  pool.query('SELECT author FROM news WHERE id = $1', [id],(error, results) => {
    if (error) {
      throw error
    }
    if(results.rows[0].author != global_user){
      response.status(403).send(`Pouzivatel nie je autorom clanku.`)
    }
    else{
      pool.query('DELETE FROM news WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`News deleted with ID: ${id}`)
      })
    }
  })
 
}

//HOTOVO
const getEvents = (request, response) => {
  pool.query('SELECT * FROM events ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const getEventId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const createEvent = (request, response) => {
  const id = global_user
  //check, ci  je prihlaseny 
  if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  else {
    const {title, when_date, when_time, capacity, points, type, adress, description} = request.body
    modified = null
    pool.query('INSERT INTO events (title, when_date, when_time, capacity, points, type, adress, description, modified, creator) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', 
    [title, when_date, when_time, capacity, points, type, adress, description, modified,global_user], (error, results) => {
      if (error) {
        throw error
      }
      pool.query('SELECT * FROM events ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json(`Event added with ID: ${results.rows[0].id}`)
      })    
    })
  }
}

//HOTOVO
const updateEvent = (request, response) => {
  //zadanie konkretnej udalosti, ktoru chceme menit
  const id_event = parseInt(request.params.id)
  const {capacity} = request.body
  
  //check, ci  je prihlaseny 
  if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  //check, ci udalost existuje
  else{
  pool.query('SELECT * FROM events WHERE id = $1', [id_event], (error, results) => {
    if (error) {
      throw error 
    }
    if(typeof response.rows === "undefined"){
      response.status(400).send('Event neexistuje.')
    }
    else{
      pool.query('SELECT creator FROM events WHERE id = $1', [id_event], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rows[0].creator != global_user){
          response.status(403).send('Pouzivatel nie je autorom udalosti.')
        }
        //ak je prihlaseny a je creator tak moze zmenit
        else{ 
          //zistenie, ci zmenena kapacita je vacsia ako aktualna ucast na evente
          pool.query('SELECT count(id_event) FROM participation WHERE id_event = $1', [id_event], (error, results) => {
            if (error) {
              throw error
            }
            if (Number(results.rows[0].count) < Number(capacity)) {
              pool.query('UPDATE events SET capacity = $1 WHERE id = $2', [capacity, id_event], (error, results) => {
                  if (error) {
                    throw error
                  }
                  response.status(200).send(`Event modified with ID: ${id_event}`)
              })
            }
            else {
              response.status(400).send('Nejde znizit kapacitu pre limit prihlasenych.')
            }
          })
        }
      })  
    }
  })   
}
}

//HOTOVO
const deleteEvent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT creator FROM events WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if(global_user != results.rows[0].creator){
      response.status(403).send(`Pouzivatel nieje autorom udalosti`)
    }
    else{
      pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Event deleted with ID: ${id}`)
      })
    }
  })
}

//HOTOVO
const getParticipants = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT id_user, (SELECT username FROM users WHERE participation.id_user = users.id) FROM participation WHERE id_event = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//HOTOVO
const addParticipant = (request, response) => {
  const {id} = request.body

  if(global_user == null) {
    response.status(403).send('Pouzivatel nie je prihlaseny.')
  }
  else{
    pool.query('SELECT * FROM participants WHERE id_user = $1', [global_user], (error, results) => {
      if (error) {
        throw error 
      }
      if(typeof response.rows === "undefined"){
        pool.query('INSERT INTO participation (id_user,id_event) VALUES ($1,$2)',[global_user, id], (error, results) => {
          if (error) {
            throw error
          }
          pool.query('SELECT * FROM participation ORDER BY id DESC LIMIT 1', (error, results) => {
            if (error) {
              throw error
            }
            console.log(results.rows)
            response.status(201).json(`Pouziatel ${results.rows[0].id_user} bol pridany do eventu: ${results.rows[0].id_event}`)
          })    
        }) 
      }
      else {    
        response.status(400).send('Pouzivatel uz ma ucast na evente.')
      }
    })
  }
}

module.exports = {
  getUser, 
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
  addParticipant,
  uploadImage,
  getImage
}
