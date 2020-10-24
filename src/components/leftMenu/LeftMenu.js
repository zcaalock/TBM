import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../history'
import _ from 'lodash'

import { editState } from '../../actions/appState'
import { useTranslation } from 'react-i18next'
import AddBoard from './AddBoard'
import BoardsList from './BoardsList'
import SettingsIcons from './SettingsIcons'
import ModalComponent from '../Forms/modals/Modal'
import EditBoardModal from '../Forms/EditBoardModal'
import Reminders from '../middle/Boards/pulses/Tbody/Reminder'
import ReminderFilter from '../Forms/dropdownColumFilterReminders'


function Boards (props) {

  const [MHide, setMHide] = useState('true')

  const user = useSelector(state => state.user)
  const appState = useSelector(state => state.appState)
  const boards = useSelector(state => Object.values(state.boards))

  const dispatch = useDispatch()
  const { t } = useTranslation()
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

  const handleFiltersOnClick = () => { 
    dispatch(editState('filters', 'id'))   
    history.push(`/filters/`)
  }

  const handleClientsOnClick = () => {
    history.push('/clients/')
    dispatch(editState('clients', 'id'))     
  }

  const handleContactsOnClick = () => {
    history.push('/contacts/')
    dispatch(editState('contacts', 'id'))     
  }

  const handleSelectedItem = (selector) => {
    if (appState.id === selector) return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer', backgroundColor: '#E9E9E9' }    
    return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer' }
  }  

  const renderPrivateBoardList = () => {
    const findPrivateBoards = _.filter(boards, { privateId: user.credentials.userId })

    if (findPrivateBoards.length > 0 && user.credentials.userId === findPrivateBoards[0].privateId)
      return (
        <BoardsList privateId={user.credentials.userId} />
      )
    return <div style={{ display: 'none' }}></div>
  }

  const showEditBoardModal = () => {
    return appState.editBoardOpen === true ? <EditBoardModal /> : null
  }

    return (
      <div        
        className="leftMenu header"
        style={{zIndex: '1'}}>
        <div key='i' className='item leftMenu-main' style={{ textAlign: 'center' }}>
          <div onClick={() => setMHide(MHide === 'true' ? 'false' : 'true')} id="TMenu" style={{ display: 'inline-block' }}><i className='bars icon' /></div>
          <div style={{ display: 'inline-block' }}><h3>Task Manager</h3></div>
        </div>
        <SettingsIcons MHide={showMobileMenu()}/>
        <div className={`${showMobileMenu()} ui secondary text menu`}>
          <div key='d' className="item" style={{ width: '100%', margin: 'auto' }}>
            <div              
              className="menu" style={{ width: '100%' }}>
              <div onClick={() => dispatch(editState(true, 'modalOpen'))} data-position="bottom center" data-tooltip={t("Add pulse, client or calendar event")} className="refreshDB" style={{ paddingTop: '0', paddingBottom: '15px', borderBottom: '1px solid #DDDDDD' }}>
                <i className="plus square outline large icon" />
              </div>
              <div
                onClick={() => handleFiltersOnClick()}
                className="header item headerSelectable"
                style={handleSelectedItem('filters')}>
                {t('Find')}
              </div>
              <div style={{ paddingLeft: '0', borderTop: '1px solid #DDDDDD' }}></div>
              <div
                onClick={() => handleClientsOnClick()}
                className="header item headerSelectable"
                style={handleSelectedItem('clients')}>
                {t('Clients')}
              </div>
              <div style={{ paddingLeft: '0', borderTop: '1px solid #DDDDDD' }}></div>
              <div
                onClick={() => handleContactsOnClick()}
                className="header item headerSelectable"
                style={handleSelectedItem('contacts')}>
                {t('Contacts')}
              </div>
              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px', borderTop: '1px solid #DDDDDD' }}>
                {t('Boards')}:
              </div>
              <BoardsList privateId='' />
              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}>
                <AddBoard name={'New Board'} />
              </div>
              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px' }}>
                {t('Private Boards')}:
              </div>
              {renderPrivateBoardList()}
              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}>
                <AddBoard name={'New Private Board'} />
              </div> 
              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px' }}>
                {t('Reminders')}: 
                <ReminderFilter />               
              </div> 
              <div className="reminders" style={{paddingLeft: '20px', marginLeft: '-20px', height: 'calc(100vh - 680px)', overflowY: 'auto'}}><Reminders/></div>            
            </div>
          </div>
        </div>
        <ModalComponent className={showMobileMenu()} />
        {showEditBoardModal()}
      </div>
    )
}

export default Boards