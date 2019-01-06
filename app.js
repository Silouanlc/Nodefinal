const db = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')
const api = express()
const methodOverride = require('method-override')


api.set('views', './views')
api.set('view engine', 'hbs')

api.use(methodOverride('_method'))

/* Creation of users and todos tables */

db.open('api.db').then(() => {
  Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS todos (name, completion, user_id, created_at, updated_at)"),
    /*db.run("DROP TABLE todos"),*/
     db.run("INSERT INTO todos VALUES('todo_name','inprogress', '8', 'date_created', 'date_up')"),
    /*db.run("DROP TABLE users"),*/
    db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, username, password, email, created_at, updated_at)"),
    db.run("INSERT INTO users VALUES('name','firstname', 'username', 'password','email', '', '')"),
  ]).then(() => {
    console.log('Database todos and users is ready')
  }).catch((err) => {
    console.log('Une erreur est survenue :', err)
  })
})



// MIDDLEWARE POUR PARSER LE BODY
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
// api.use(methodOverride(‘_method’))

// ROUTES
api.use('/todos', require('./controllers/todos.js'))
api.use('/users', require('./controllers/users.js'))

api.listen(3000);

console.log("http://localhost:3000/todos -> for todos");
console.log("http://localhost:3000/users -> for users");
