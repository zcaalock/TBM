import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { Dimmer, Loader} from 'semantic-ui-react'

import { editState } from '../../actions/appState'
import { fetchStatus } from '../../actions/status'
import { fetchPulses } from '../../actions/pulses'
import { fetchCategories } from '../../actions/categories'
import { fetchBoards } from '../../actions/boards'
import { fetchLead } from '../../actions/settings'
import { fetchDetails } from '../../actions/details'
import { fetchNotepads } from '../../actions/notepad'




class Loading extends React.Component {

 

  handleAuth() {
    if (this.props.user.loading === false) {
      if (this.props.user.authenticated === false)
        history.push('/unAuth')
    }
  }
  componentDidMount() {
    this.props.fetchBoards()
      this.props.fetchStatus()
      this.props.fetchPulses()
      this.props.fetchDetails()
      this.props.fetchLead()
      this.props.fetchCategories()
      this.props.fetchNotepads()
      
    setTimeout(() => { history.push(`/filters`) }, 4000);
  }

  

  render() {
    return (
      <div >
        
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      
    
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  return {    
    appState: state.appState,
    user: state.user
  }
}

export default connect(mapStateToProps, { editState, fetchBoards, fetchCategories, fetchDetails, fetchLead, fetchPulses, fetchStatus, fetchNotepads })(Loading)