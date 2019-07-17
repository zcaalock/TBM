import axios from 'axios'

export default axios.create({
  //baseURL: 'https://quickstart-1561998550467.firebaseapp.com/api/'
  //baseURL: 'http://localhost:3001'
  //baseURL: 'https://tbm-api.herokuapp.com/'
  baseURL: 'https://europe-west2-quickstart-1561998550467.cloudfunctions.net/api'
})