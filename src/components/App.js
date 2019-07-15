import React from 'react'
import { Router, Route } from 'react-router-dom'
import LeftMenu from './leftMenu/LeftMenu'
import Boards from './middle/Boards'
import history from '../history'
import ItemsMain from './items/ItemsMain'
import Details from './rightMenu/Details'
import LandingPage from './middle/LandingPage'

const App = () => {
  return (
    <div style={{ margin: '10px' }} className="container">
      <Router history={history}>
        <div>
          <Route >
            <Route path="/" exact component={LandingPage}/>
            <Route path="/boards" exact component={(props)=>(<><LeftMenu {...props}/> <Boards {...props}/></>)} />
            <Route path="/boards/:id" component={(props)=>(<><LeftMenu {...props}/> <ItemsMain {...props}/></>)} />
            <Route path="/boards/:id/pulses/:id" component={Details} />
          </Route>
        </div>
      </Router>
    </div>
  )
}

export default App