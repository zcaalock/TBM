import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history'
import { Dimmer, Loader } from 'semantic-ui-react'
import ProgressBar from './ProgressBar'

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

function Loading() {
  const appState = useSelector(state => state.appState)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoards('loading', true))
    dispatch(fetchStatus('loading', true))
    dispatch(fetchPulses('loading', true))
    dispatch(fetchDetails('loading', true))
    dispatch(fetchLead('loading', true))
    dispatch(fetchCategories('loading', true))
    dispatch(fetchNotepads('loading', true))
    dispatch(fetchClients('loading', true))
    dispatch(fetchCompetitions('loading', true))
    dispatch(fetchContacts('loading', true))
    dispatch(editState('filters', 'id'))

  }, [])
  
  if (appState
    && appState.fetchedBoards === true
    && appState.fetchedCategories === true
    && appState.fetchedClients === true
    && appState.fetchedCompetitions === true
    && appState.fetchedContacts === true
    && appState.fetchedDetails === true
    && appState.fetchedNotepad === true
    && appState.fetchedPulses === true
    && appState.fetchedStatus === true
    && appState.fetchedSettings === true
  ) history.push(`/filters`)

  function renderPercent() {
    let boards = appState.fetchedBoards === true ? 1 : 0
    let categories = appState.fetchedCategories === true ? 1: 0
    let clients =appState.fetchedClients === true ? 1: 0
    let competitions = appState.fetchedCompetitions === true ? 1: 0
    let contacts = appState.fetchedContacts === true ? 1: 0
    let details = appState.fetchedDetails === true ? 1: 0
    let notepad = appState.fetchedNotepad === true ? 1: 0
    let pulses = appState.fetchedPulses === true ? 1: 0
    let status = appState.fetchedStatus === true ? 1: 0
    let settings = appState.fetchedSettings === true ? 1: 0

    let sum = (boards+categories+clients+competitions+contacts+details+notepad+pulses+status+settings)*10
    //console.log(sum)
    return sum

  }

  
  return (
    <div >
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
        <div style={{width: '50vw', marginTop: '80vh'}}><ProgressBar  size={'tiny'} value={renderPercent()} color='red' /></div>
      </Dimmer>
    </div>
  )
}


export default Loading