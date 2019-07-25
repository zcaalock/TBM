import React from 'react'
import { Router, Route } from 'react-router-dom'

import history from '../history'

import LeftMenu from './leftMenu/LeftMenu'
import Boards from './middle/Boards'
import Details from './rightMenu/Details'
import LandingPage from './middle/LandingPage'
import Filters from './middle/Filters'
import FilterTable from './middle/Filters/filterTaskTable/FilterTable'

import Signup from './Forms/Signup'
import Login from './Forms/Login'
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
            <Route exact path="/settings" component={(props)=>(<><LeftMenu {...props}/> <Settings {...props}/></>)} />            
            <Route exact path="/filters" component={(props)=>(<><LeftMenu {...props}/> <div className='article'><Filters {...props}/></div></>)} />
            <Route path='/filters/:selector/:item' component={(props)=>(<><LeftMenu {...props}/> <div className='article'><Filters {...props}/><FilterTable {...props}/></div></>)}/>
            <Route path='/filters/:selector/:item/pulses/:id' component={Details}/>                      
            <Route path="/boards/:id" component={(props)=>(<><LeftMenu {...props}/> <Boards {...props}/></>)} />            
            <Route path="/boards/:id/pulses/:id" component={Details} />
          </Route>
        </div>
      </Router>
    </div>
  )
}

export default App