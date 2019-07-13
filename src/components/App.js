import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Boards from '../components/leftMenu/Boards'
import history from '../history'
import ItemsMain from './items/ItemsMain'
import Details from './rightDetails/Details'

const App = () => {
  return (
    <div style={{margin: '10px'}} className="container">
      <Router history={history}>
        <div>
        <Boards />
        <Route >          
          <Route path="/boards/:id" component={ItemsMain}/>
          <Route path="/boards/:id/pulses/:id" component={Details}/>
        </Route>        
        </div>
      </Router>
    </div>
  )
}

export default App