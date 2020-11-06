import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from '../history'
import Loading from '../components/Forms/Loading'
import LeftMenu from './leftMenu/LeftMenu'
import Boards from './middle/Boards'
import Details from './rightMenu/Details'
import DetailsClients from './rightMenu/DetailsClients'
import DetailsCompetitions from './rightMenu/DetailsCompetitions'
import DetailsContacts from './rightMenu/DetailsContacts'
import LandingPage from './middle/LandingPage'
import Filters from './middle/Filters'
import Clients from './middle/Clients'
import Charts from './middle/Charts'
import Competitions from './middle/Competitions'
import Contacts from './middle/Contacts'
import Signup from './Forms/Signup'
import Login from './Forms/Login'
import Settings from './middle/Settings'
import unAuth from './middle/unAuth'
import Message from './Message'

const App = () => {
  return (
    <div style={{ margin: '0px' }} className="container">
      <Message />
      <Router history={history}>
        <div>

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
            <Route path='/competitions/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Competitions {...props} /></div></>)} />
            <Route path='/competitions/competition/:id' component={DetailsCompetitions} />
            <Route path='/contacts/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Contacts {...props} /></div></>)} />
            <Route path='/contacts/contact/:id' component={DetailsContacts} />
            <Route path="/boards/:id" component={(props) => (<><LeftMenu {...props} /> <Boards {...props} /></>)} />
            <Route path="/boards/:id/pulses/:id" component={Details} />
            <Route path='/charts/' component={(props) => (<><LeftMenu {...props} /> <div className='article'><Charts {...props} /></div></>)} />
          </Route>
        </div>
      </Router>
    </div>
  )
}

export default App