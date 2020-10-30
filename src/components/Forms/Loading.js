import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import history from '../../history'
import { Dimmer, Loader } from 'semantic-ui-react'

import { editState } from '../../actions/appState'
import { fetchStatus } from '../../actions/status'
import { fetchPulses } from '../../actions/pulses'
import { fetchCategories } from '../../actions/categories'
import { fetchBoards } from '../../actions/boards'
import { fetchLead } from '../../actions/settings'
import { fetchDetails } from '../../actions/details'
import { fetchNotepads } from '../../actions/notepad'
import { fetchClients } from '../../actions/clients'
import { fetchCompetitions } from '../../actions/competitions'
import { fetchContacts } from '../../actions/contacts'

function Loading () {  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchBoards())
    dispatch(fetchStatus())
    dispatch(fetchPulses())
    dispatch(fetchDetails())
    dispatch(fetchLead())
    dispatch(fetchCategories())
    dispatch(fetchNotepads())
    dispatch(fetchClients())
    dispatch(fetchCompetitions())
    dispatch(fetchContacts())
    dispatch(editState('filters', 'id'))
    setTimeout(() => { history.push(`/filters`) }, 4000);
  },[])
  
    return (
      <div >
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      </div>
    )  
}


export default Loading