const functions = require('firebase-functions');
const admin = require('firebase-admin')
const app = require('express')()

const cors = require('cors')({ origin: true });

const firebaseConfig = {
  apiKey: "AIzaSyDH_hiOBxaDyXSyZ6EaXtLtbx2Cv9tblHI",
  authDomain: "quickstart-1561998550467.firebaseapp.com",
  databaseURL: "https://quickstart-1561998550467.firebaseio.com",
  projectId: "quickstart-1561998550467",
  storageBucket: "quickstart-1561998550467.appspot.com",
  messagingSenderId: "1091712667896",
  appId: "1:1091712667896:web:7f3c2f9dd78115b3"
}

admin.initializeApp()

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()


//get users list

app.get('/users', (req, res) => {
  cors(req, res, () => {
    db
      .collection('users')
      .get()
      .then(data => {
        let users = [];
        data.forEach(doc => {
          users.push(doc.data());
        })
        return res.json(users)
      })
      .catch(err => console.error(err))
  })
})

//get boards list

app.get('/boards', (req, res) => {
  cors(req, res, () => {
    db
      .collection('boards')
      .orderBy('id', 'desc')
      .get()
      .then(data => {
        let boards = [];
        data.forEach(doc => {
          boards.push(doc.data());
        })
        return res.json(boards)
      })
      .catch(err => console.error(err))
  })
})

// get categories

app.get('/categories', (req, res) => {
  cors(req, res, () => {
    db
      .collection('categories').get()
      .then(data => {
        let categories = [];
        data.forEach(doc => {
          categories.push(doc.data());
        })
        return res.json(categories)
      })
      .catch(err => console.error(err))
  })
})

//get details

app.get('/details', (req, res) => {
  cors(req, res, () => {
    db
      .collection('details').get()
      .then(data => {
        let details = [];
        data.forEach(doc => {
          details.push(doc.data());
        })
        return res.json(details)
      })
      .catch(err => console.error(err))
  })
})

//get pulses

app.get('/pulses', (req, res) => {
  cors(req, res, () => {
    db
      .collection('pulses').get()
      .then(data => {
        let pulses = [];
        data.forEach(doc => {
          pulses.push(doc.data());
        })
        return res.json(pulses)
      })
      .catch(err => console.error(err))
  })
})

//get status

app.get('/status', (req, res) => {
  cors(req, res, () => {
    db
      .collection('status').get()
      .then(data => {
        let status = [];
        data.forEach(doc => {
          status.push(doc.data());
        })
        return res.json(status)
      })
      .catch(err => console.error(err))
  })
})



//post users



app.post('/users', (req, res) => {
  cors(req, res, () => {
    const newUser = {
      userInitials: req.body.userInitials,
      title: req.body.title,
      createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }

    db
      .collection('users')
      .add(newUser)
      .then(doc => {
        res.json({ message: `document ${doc.id} created successfuly` })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  })
})

//post boards

app.post('/boards', (req, res) => {
  cors(req, res, () => {
    const now = Date.now()
    const newBoard = {
      id: now,
      title: req.body.title,
      createdAt: new Date().toISOString()
    }
    db
      .collection('boards')
      .add(newBoard)
      .then(doc => {
        res.json({
          board: newBoard,
          message: `document ${doc.id} created successfuly`
        })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  })
})

//post categories

app.post('/categories', (req, res) => {
  cors(req, res, () => {
    const now = Date.now()
    const newCategory = {
      id: now,
      title: req.body.title,
      boardId: req.body.boardId,
      createdAt: new Date().toISOString()
    }
    db
      .collection('categories')
      .add(newCategory)
      .then(doc => {
        res.json({
          category: newCategory,
          message: `document ${doc.id} created successfuly`
        })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  })
})

//signup route

const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  else return false
}

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }
  let errors = {}

  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match'
  if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty'

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)


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

//login route 

app.post('/login', (req,res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  let errors = {}
  
  if (isEmpty(user.email)) errors.email = 'Must not be empty'  
  if (isEmpty(user.password)) errors.password = 'Must not be empty'
  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(data => {
    return data.user.getIdToken()
  })
  .then((token) => {
    return res.json({token})
  })
  .catch((err) => {
    console.log(err)
    if(err.code === 'auth/wrong-password'){
      return res.status(403).json({general: 'Wrong credentials, please try again'})
    } else {return res.status(500).json({error: err.code})}
  })
})


exports.api = functions.region('europe-west2').https.onRequest(app)

