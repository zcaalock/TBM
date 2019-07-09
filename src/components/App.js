import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Boards from '../components/boards/Boards'
import history from '../history'
import ItemsMain from './items/ItemsMain'

const App = () => {
  return (
    <div style={{margin: '10px'}} className="container">
      <Router history={history}>
        <div>
        <Boards />
        <Switch>          
          <Route path="/boards/:id" component={ItemsMain}/>
        </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App