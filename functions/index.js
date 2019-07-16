const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getUsers = functions.https.onRequest((req, res) => {
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

exports.createUser = functions.https.onRequest((req, res) => {
  const newUser = {
    userInitials: req.body.userInitials,
    title: req.body.title    
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
