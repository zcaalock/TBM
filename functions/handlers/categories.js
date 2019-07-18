const cors = require('cors')({ origin: true });
const {db} = require('../util/admin')

exports.getCategories = (req, res) => {
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
}

exports.postCategory = (req, res) => {
  cors(req, res, () => {
    const now = Date.now()
    const newCategory = {
      id: now,
      title: req.body.title,
      boardId: req.body.boardId,
      userHandle: req.user.handle,
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
}