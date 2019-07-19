const functions = require('firebase-functions');
const app = require('express')()

const FBAuth = require('./util/fbAuth')

const { getBoards, postBoard, deleteBoard, patchBoard } = require('./handlers/boards')
const { getStatus } = require('./handlers/status')
const { getCategories, postCategory, patchCategory } = require('./handlers/categories')
const { getDetails } = require('./handlers/details')
const { getPulses } = require('./handlers/pulses')
const { signup, login, getUsers, uploadImage, addUserDetails } = require('./handlers/users')

//boards routes
app.get('/boards', getBoards)
app.post('/board', postBoard)
app.delete('/board/:id', deleteBoard)
app.patch('/board/:id', patchBoard)

//categories routes
app.get('/categories', getCategories)
app.post('/category', postCategory)
app.patch('/category/:id', patchCategory)


//other routes
app.get('/details', getDetails)
app.get('/pulses', getPulses)
app.get('/status', getStatus)


//users routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

app.post('/user', FBAuth, addUserDetails)
app.get('/users', getUsers) //TODO adjust user list in pulses

exports.api = functions.region('europe-west2').https.onRequest(app)

