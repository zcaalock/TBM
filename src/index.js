import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './css/index.css'
import './translations/i18n'
import 'semantic-ui-css/semantic.min.css'

import axios from 'axios'

import { Provider } from 'react-redux'
import store from './reducers/index'
import { SET_AUTHENTICATED } from './actions/types'
import { logoutUser, getUserData } from './actions/users'
import jwtDecode from 'jwt-decode'

axios.defaults.baseURL = 'https://europe-west2-quickstart-1561998550467.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
};

 ReactDOM.render( 

  <div style={{ margin: '0px' }} className="container">
  <Provider store={store}>
  <App />
  </Provider>
</div>    
  
  , document.querySelector('#root')
)

