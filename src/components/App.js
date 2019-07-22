import React from 'react'
import { Router, Route } from 'react-router-dom'
import LeftMenu from './leftMenu/LeftMenu'

import history from '../history'
import ItemsMain from './items/ItemsMain'
import Details from './rightMenu/Details'
import LandingPage from './middle/LandingPage'

import MyPulses from './middle/MyPulses'

import Signup from './Forms/Signup'
import Login from './Forms/Login';
import Settings from './middle/Settings'
import unAuth from './middle/unAuth'

const App = () => {
  return (
    <div style={{ margin: '10px' }} className="container">
      <Router history={history}>
        <div>
          <Route >
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/unAuth" component={unAuth} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup} />
            <Route path="/mypulses" exact component={(props)=>(<><LeftMenu {...props}/> <MyPulses {...props}/></>)} />
            <Route path="/settings" exact component={(props)=>(<><LeftMenu {...props}/> <Settings {...props}/></>)} />
            <Route path="/boards/:id" component={(props)=>(<><LeftMenu {...props}/> <ItemsMain {...props}/></>)} />
            <Route path="/boards/:id/pulses/:id" component={Details} />
          </Route>
        </div>
      </Router>
    </div>
  )
}

export default App