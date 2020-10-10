import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../history'
import _ from 'lodash'

import { editState } from '../../actions/appState'
import { fetchStatus } from '../../actions/status'
import { fetchPulses } from '../../actions/pulses'
import { fetchCategories } from '../../actions/categories'
import { fetchBoards } from '../../actions/boards'
import { fetchLead } from '../../actions/settings'
import { fetchDetails } from '../../actions/details'
import { fetchNotepads } from '../../actions/notepad'
import { fetchClients } from '../../actions/clients'

import AddBoard from './AddBoard'
import BoardsList from './BoardsList'
import SettingsIcons from './SettingsIcons'
import ModalComponent from '../Forms/modals/Modal'


function Boards (props) {

  const [MHide, setMHide] = useState('true')

  const user = useSelector(state => state.user)
  const appState = useSelector(state => state.appState)
  const boards = useSelector(state => Object.values(state.boards))

  const dispatch = useDispatch()

  useEffect(()=>{
    handleAuth()
  })  

  const showMobileMenu = () => {
    return MHide === 'false' ? '' : 'MHide'
  }

  const handleAuth = () => {
    if (user.loading === false) {
      if (user.authenticated === false)
        history.push('/unAuth')
    }
  }  

  const refreshDB = () => {
    if (appState.refreshed === 'false') {
      dispatch(fetchBoards())
      dispatch(fetchStatus())
      dispatch(fetchPulses())
      dispatch(fetchDetails())
      dispatch(fetchLead())
      dispatch(fetchCategories())
      dispatch(fetchNotepads())
      dispatch(fetchClients())
    }
    dispatch(editState('true', 'refreshed'))
    setTimeout(() => { dispatch(editState('false', 'refreshed')) }, 20000)
  }

  // const handleMyPulsesOnClick = () => {
  //   dispatch(editState('', 'pulseId'))
  //   dispatch(editState(props.match.params.id, 'id'))
  //   history.push(`/filters/LeadPerson/${user.credentials.userId}`)    
  // }

  const handleFiltersOnClick = () => { 
    dispatch(editState('filters', 'id'))   
    history.push(`/filters/`)
  }

  const handleClientsOnClick = () => {
    history.push('/clients/')
    dispatch(editState('clients', 'id'))     
  }

  const handleSelectedItem = (selector) => {
    if (appState.id === selector) return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer', backgroundColor: '#E9E9E9' }    
    return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer' }
  }

  const renderRefreshClass = () => {
    if (appState.refreshed === "false") return <div onClick={() => refreshDB()} data-position="bottom center" data-tooltip="Refresh database" className='refreshDB'><i className='refreshDBspin large refresh icon' /></div>
    if (appState.refreshed === "true") return <div onClick={() => refreshDB()} data-position="bottom center" data-tooltip="Cannot refresh database now" className='greyedDB'><i className='large refresh icon' /></div>
  }

  const renderPrivateBoardList = () => {
    const findPrivateBoards = _.filter(boards, { privateId: user.credentials.userId })

    if (findPrivateBoards.length > 0 && user.credentials.userId === findPrivateBoards[0].privateId)
      return (
        <BoardsList privateId={user.credentials.userId} />
      )
    return <div style={{ display: 'none' }}></div>
  }

    return (
      <div        
        className="leftMenu header">
        <div key='i' className='item leftMenu-main' style={{ textAlign: 'center' }}>
          <div onClick={() => setMHide(MHide === 'true' ? 'false' : 'true')} id="TMenu" style={{ display: 'inline-block' }}><i className='bars icon' /></div>
          <div style={{ display: 'inline-block' }}><h3>Task Manager</h3></div>
        </div>
        <SettingsIcons MHide={showMobileMenu()}/>
        <div className={`${showMobileMenu()} ui secondary text menu`}>
          <div key='d' className="item" style={{ width: '100%', margin: 'auto' }}>
            <div              
              className="menu" style={{ width: '100%' }}>
              <div onClick={() => dispatch(editState(true, 'modalOpen'))} data-position="bottom center" data-tooltip="Add Pulse, client or calendar event " className="refreshDB" style={{ paddingTop: '0', borderBottom: '1px solid #DDDDDD' }}>
                <i className="plus square outline large icon" />
              </div>
              <div
                onClick={() => handleFiltersOnClick()}
                className="header item headerSelectable"
                style={handleSelectedItem('filters')}>
                Find Task
              </div>
              <div style={{ paddingLeft: '0', borderTop: '1px solid #DDDDDD' }}></div>
              <div
                onClick={() => handleClientsOnClick()}
                className="header item headerSelectable"
                style={handleSelectedItem('clients')}>
                Clients
              </div>
              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px', borderTop: '1px solid #DDDDDD' }}>
                Boards:
              </div>
              <BoardsList privateId='' />
              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}>
                <AddBoard name={'New Board'} />
              </div>
              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px' }}>
                Private Boards:
              </div>
              {renderPrivateBoardList()}
              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}>
                <AddBoard name={'New Private Board'} />
              </div>
              {renderRefreshClass()}
            </div>
          </div>
        </div>
        <ModalComponent className={showMobileMenu()} />

      </div>
    )
}

export default Boards