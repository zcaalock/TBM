const cors = require('cors')({ origin: true });
const { db } = require('../util/admin')

exports.getCategories = (req, res) => {
  cors(req, res, () => {
    db
      .collection('categories')
      .orderBy('createdAt')
      .get()
      .then(data => {
        let categories = [];
        data.forEach((doc) => {
          categories.push({
            id: doc.id,
            title: doc.data().title,
            boardId: doc.data().boardId,
            //userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt
          });
        })
        return res.json(categories)
      })
      .catch(err => console.error(err))
  })
}

exports.postCategory = (req, res) => {
  cors(req, res, () => {

    if (req.body.title.trim() === '') {
      return res.status(400).json({ body: 'field must not be empty' })
    }

    const newCategory = {
      title: req.body.title,
      boardId: req.body.boardId,
      //userHandle: req.user.handle,
      createdAt: new Date().toISOString()
    }
    db
      .collection('categories')
      .add(newCategory)
      .then(doc => {
        res.json({
          category: {
            title: newBoard.title,
            //userHandle: newBoard.userHandle
            id: doc.id,
            boardId: newCategory.boardId,
            createdAt: newCategory.createdAt
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

exports.patchCategory = (req, res) => {
  const updateDocument = {
    title: req.body.title,
    editedAt: new Date().toISOString()
  }
  const categoryDocument = db.doc(`/categories/${req.params.id}`)
  let categoryData

  categoryDocument.get()
    .then(doc => {
      if (doc.exists) {
        categoryData = doc.data()
        categoryData.id = doc.id
        return updateDocument
      } else {
        return res.status(404).json({ error: 'Category not found' })
      }
    })
    .then(() => {
      return categoryDocument.update(updateDocument)
    })
    .then(() => {
      res.json({
        category: {
          title: updateDocument.title,
          //userHandle: 
          id: categoryData.id, //this is wrong
          boardId: categoryData.boardId,
          createdAt: categoryData.createdAt,
          editedAt: updateDocument.editedAt
        },
        message: `Category ${categoryData.id} edited successfuly`
      })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}