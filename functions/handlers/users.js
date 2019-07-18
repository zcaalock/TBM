const cors = require('cors')({ origin: true });
const firebase = require('firebase')
const { db } = require('../util/admin')

const firebaseConfig = require('../util/firebaseConfig')

firebase.initializeApp(firebaseConfig)

const {validateSignupData, validateLoginData} = require('../util/validators')

exports.signup = (req, res) => {
  cors(req, res, () => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }  

  const { valid, errors} = validateSignupData(newUser)
  if(!valid) return res.status(400).json(errors)

  // validate data
  let token, userId
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'This email is already in use' })
      } else { return res.status(500).json({ error: err.code }) }
    })
  })
}

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const { valid, errors} = validateLoginData(user)
  if(!valid) return res.status(400).json(errors)  

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken()
    })
    .then((token) => {
      return res.json({ token })
    })
    .catch((err) => {
      console.log(err)
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong credentials, please try again' })
      } else { return res.status(500).json({ error: err.code }) }
    })
}

exports.getUsers = (req, res) => {
  cors(req, res, () => {
    db
      .collection('users').get()
      .then(data => {
        let users = [];
        data.forEach(doc => {
          users.push(doc.data());
        })
        return res.json(users)
      })
      .catch(err => console.error(err))
  })
}


//trash 
//post users

// app.post('/users', (req, res) => {
//   cors(req, res, () => {
//     const newUser = {
//       userInitials: req.body.userInitials,
//       title: req.body.title,
//       createdAt: admin.firestore.Timestamp.fromDate(new Date())
//     }

//     db
//       .collection('users')
//       .add(newUser)
//       .then(doc => {
//         res.json({ message: `document ${doc.id} created successfuly` })
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'something went wrong' })
//         console.error(err)
//       })
//   })
// })