const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp()

const express = require('express')
const app = express()



app.get('/users', (req, res)=>{
  admin.firestore().collection('users').get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        users.push(doc.data({
          userId: doc.id,
          userInitials: doc.data().userInitials,
          title: doc.data().title,
          createdAt: doc.data().createdAt
        }));
      })
        return res.json(users)
    })
    .catch(err=>console.error(err))
})

app.get('/boards', (req, res)=>{
  admin.firestore().collection('boards').get()
    .then(data => {
      let boards = [];
      data.forEach(doc => {
        boards.push(doc.data({
          id: doc.id,          
          title: doc.data().title,
          createdAt: doc.data().createdAt
        }));
      })
        return res.json(boards)
    })
    .catch(err=>console.error(err))
})

app.post('/users',(req, res) => {

  const newUser = {
    userInitials: req.body.userInitials,
    title: req.body.title,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())    
  }

  admin.firestore()
        .collection('users')
        .add(newUser)
        .then(doc => {
          res.json({ message: `document ${doc.id} created successfuly`})
        })
        .catch(err => {
          res.status(500).json({error: 'something went wrong'})
          console.error(err)
        })
})

app.post('/boards',(req, res) => {
  const now= Date.now()
  const newBoard = {    
    id: now, 
    title: req.body.title,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()) 
       
  }

  admin.firestore()
        .collection('boards')
        .add(newBoard)
        .then(doc => {
          res.json({ 
            board: newBoard,
            message: `document ${doc.id} created successfuly`
          })
        })
        .catch(err => {
          res.status(500).json({error: 'something went wrong'})
          console.error(err)
        })
})


exports.api = functions.https.onRequest(app)