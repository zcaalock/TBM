const cors = require('cors')({ origin: true });
const {db} = require('../util/admin')

exports.getPulses = (req, res) => {
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
}