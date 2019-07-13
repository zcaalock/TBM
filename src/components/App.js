import React from 'react'
import { Router, Route } from 'react-router-dom'
import Boards from '../components/leftMenu/Boards'
import history from '../history'
import ItemsMain from './items/ItemsMain'
import Details from './rightMenu/Details'
import LandingPage from './landingPage/LandingPage'

const App = () => {
  return (
    <div style={{ margin: '10px' }} className="container">
      <Router history={history}>
        <div>
          <Route >
            <Route path="/" exact component={LandingPage}/>
            <Route path="/boards" component={Boards} />
            <Route path="/boards/:id" component={ItemsMain} />
            <Route path="/boards/:id/pulses/:id" component={Details} />
          </Route>
        </div>
      </Router>
    </div>
  )
}

export default App