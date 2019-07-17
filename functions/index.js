const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp()

const express = require('express')
const app = express()


//get users list

app.get('/users', (req, res)=>{

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")
  
  admin.firestore().collection('users').get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        users.push(doc.data());
      })
        return res.json(users)
    })
    .catch(err=>console.error(err))
})

//get boards list

app.get('/boards', (req, res)=>{
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

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

// get categories

app.get('/categories', (req, res)=>{
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

  admin.firestore().collection('categories').get()
    .then(data => {
      let categories = [];
      data.forEach(doc => {
        categories.push(doc.data());
      })
        return res.json(categories)
    })
    .catch(err=>console.error(err))
})

//get details

app.get('/details', (req, res)=>{
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

  admin.firestore().collection('details').get()
    .then(data => {
      let details = [];
      data.forEach(doc => {
        details.push(doc.data());
      })
        return res.json(details)
    })
    .catch(err=>console.error(err))
})

//get pulses

app.get('/pulses', (req, res)=>{
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

  admin.firestore().collection('pulses').get()
    .then(data => {
      let pulses = [];
      data.forEach(doc => {
        pulses.push(doc.data());
      })
        return res.json(pulses)
    })
    .catch(err=>console.error(err))
})

//get status

app.get('/status', (req, res)=>{
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

  admin.firestore().collection('status').get()
    .then(data => {
      let status = [];
      data.forEach(doc => {
        status.push(doc.data());
      })
        return res.json(status)
    })
    .catch(err=>console.error(err))
})







app.post('/users',(req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")

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
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Origin", "GET")
  res.set("Access-Control-Allow-Origin", "Content-Type")
  res.set("Access-Control-Mix-Age", "3600")
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

exports.corsEnabledFunction = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  // Continue with function code
  
}