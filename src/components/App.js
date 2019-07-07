import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Boards from '../components/boards/Boards'
import history from '../history'
import ItemsList from './items/ItemsList'

const App = () => {
  return (
    <div className="container">
      <Router history={history}>
        <div>
        <Boards />
        <Switch>          
          <Route path="/boards/:id" component={ItemsList}/>
        </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App