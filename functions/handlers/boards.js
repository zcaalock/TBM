const cors = require('cors')({ origin: true });
const { db } = require('../util/admin')

exports.getBoards = (req, res) => {
  cors(req, res, () => {
    db
      .collection('boards')
      .orderBy('createdAt')
      .get()
      .then(data => {
        let boards = [];
        data.forEach((doc) => {
          boards.push({
            id: doc.id,
            title: doc.data().title,
            //userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt
          });
        })
        return res.json(boards)
      })
      .catch(err => console.error(err))
  })
}

exports.postBoard = (req, res) => {
  cors(req, res, () => {

    if (req.body.title.trim() === '') {
      return res.status(400).json({ body: 'field must not be empty' })
    }

    const newBoard = {
      title: req.body.title,
      //userHandle: req.user.handle,
      createdAt: new Date().toISOString()
    }
    db
      .collection('boards')
      .add(newBoard)
      .then(doc => {
        res.json({
          board: {
            title: newBoard.title,
            //userHandle: newBoard.userHandle
            id: doc.id,
            createdAt: newBoard.createdAt
          },
          message: `document ${doc.id} created successfuly`
        })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  })
}

exports.deleteBoard = (req, res) => {
  const document = db.doc(`/boards/${req.params.id}`)
  document.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Board not found' })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: 'Board deleted successfuly' })
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}