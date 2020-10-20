import React from 'react'
import { Router, Route } from 'react-router-dom'
import axios from 'axios'

import history from '../history'
import Loading from '../components/Forms/Loading'

import LeftMenu from './leftMenu/LeftMenu'
import Boards from './middle/Boards'
import Details from './rightMenu/Details'
import DetailsClients from './rightMenu/DetailsClients'
import DetailsContacts from './rightMenu/DetailsContacts'
import LandingPage from './middle/LandingPage'
import Filters from './middle/Filters'
import Clients from './middle/Clients'
import Contacts from './middle/Contacts'

import Signup from './Forms/Signup'
import Login from './Forms/Login'
import Settings from './middle/Settings'
import unAuth from './middle/unAuth'
import jwtDecode from 'jwt-decode'

import Message from './Message'

import { Provider } from 'react-redux'
import store from '../reducers/index'
import { SET_AUTHENTICATED } from '../actions/types'
import { logoutUser, getUserData } from '../actions/users'

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

const App = () => {
  return (
    <div style={{ margin: '0px' }} className="container">
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Message/>
            <Route >
              <Route exact path="/loading" component={Loading} />
              <Route exact path="/" component={LandingPage} />              
              <Route exact path="/unAuth" component={unAuth} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/settings" component={(props) => (<><LeftMenu {...props} /> <Settings {...props} /></>)} />                           
              <Route path='/filters/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Filters {...props} /></div></>)} />
              <Route path='/filters/pulse/:id' component={Details} />              
              <Route path='/clients/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Clients {...props} /></div></>)} />
              <Route path='/clients/client/:id' component={DetailsClients} />
              <Route path='/contacts/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Contacts {...props} /></div></>)} />
              <Route path='/contacts/contact/:id' component={DetailsContacts} />
              <Route path="/boards/:id" component={(props) => (<><LeftMenu {...props} /> <Boards {...props} /></>)} />
              <Route path="/boards/:id/pulses/:id" component={Details} />              
            </Route>
          </div>
        </Router>
      </Provider>
    </div>
  )
}

export default App