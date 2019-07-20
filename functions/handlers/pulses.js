const cors = require('cors')({ origin: true });
const { db } = require('../util/admin')

exports.getPulses = (req, res) => {
  cors(req, res, () => {
    db
      .collection('pulses')
      .orderBy('createdAt')
      .get()
      .then(data => {
        let pulse = [];
        data.forEach((doc) => {
          pulse.push({
            id: doc.id,
            title: doc.data().title,
            categoryId: doc.data().categoryId,            
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
            userInitials: doc.data().userInitials, //TODO update with user handle
            status: doc.data().status
          });
        })
        return res.json(pulse)
      })
      .catch(err => console.error(err))
  })
}

exports.postPulse = (req, res) => {
  cors(req, res, () => {

    req.body.forEach(pulse => {
      if (pulse.trim() === '') {
        return res.status(400).json({ body: `Field ${pulse} must not be empty` })
      }
    })

    const newPulse = {
      title: req.body.title,
      userInitials: req.body.userInitials, //TODO update with user handle
      status: req.body.status,
      categoryId: req.body.categoryId,      
      createdAt: new Date().toISOString()
    }
    db
      .collection('pulses')
      .add(newPulse)
      .then(doc => {
        res.json({
          pulse: {
            id: doc.id,
            title: newPulse.title,
            userInitials: newPulse.userInitials, //TODO update with user handle
            status: newPulse.status,            
            categoryId: newPulse.categoryId,
            createdAt: newPulse.createdAt
          },
          message: `Pulse ${doc.id} created successfuly`
        })
      })
      .catch(err => {
        res.status(500).json({ error: 'something went wrong' })
        console.error(err)
      })
  })
}