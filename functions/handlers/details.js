const cors = require('cors')({ origin: true });
const {db} = require('../util/admin')

exports.getDetails = (req, res) => {
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
}