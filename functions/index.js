const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/fbAuth')

const {getBoards, postBoard} = require('./handlers/boards')
const {getUsers} = require('./handlers/users')
const {getStatus} = require('./handlers/status')
const {getCategories, postCategory} = require('./handlers/categories')
const {getDetails} = require('./handlers/details')
const {getPulses} = require('./handlers/pulses')
const {signup, login} = require('./handlers/users')

//get Routes
app.get('/users', getUsers) //TODO adjust user list in pulses
app.get('/boards', getBoards)
app.get('/categories', getCategories)
app.get('/details', getDetails)
app.get('/pulses', getPulses)
app.get('/status', getStatus)

//post routes
app.post('/boards', FBAuth, postBoard)
app.post('/categories', FBAuth, postCategory)

//signup routes
app.post('/signup', signup)
app.post('/login', login)

exports.api = functions.region('europe-west2').https.onRequest(app)

