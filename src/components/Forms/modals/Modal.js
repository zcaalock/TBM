import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Modal, Menu } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'

import AddPulseModal from './AddPulseModal'
import AddClient from './AddClient'
import AddCompetition from './AddCompetition'
import AddContact from './AddContact'
import GCalendarModal from './GCalendarModal'

import { useTranslation } from "react-i18next"


function ModalComponent() {
  const { t } = useTranslation()
  const appState = useSelector(state => state.appState)
  const [activeItem, setActive] = useState(t('New pulse'))
  const dispatch = useDispatch()
  
  const renderModal = () => {
    if (activeItem === t('New pulse')) return <AddPulseModal/>
    if (activeItem === t('New client')) return <AddClient/>
    if (activeItem === t('New contact')) return <AddContact/>
    if (activeItem === t('New competition')) return <AddCompetition/>
    if (activeItem === t('New Calendar Event')) return <GCalendarModal/>
  }

  if(appState.modalOpen===true)return (
    <div>
      <Modal size='small' dimmer='inverted' open={appState.modalOpen} onClose={() => dispatch(editState(false, 'modalOpen'))}>
        <Menu pointing secondary>
          <Menu.Item
            name={t('New pulse')}
            active={activeItem === t('New pulse')}
            onClick={() => setActive(t('New pulse'))}
          />
          <Menu.Item
            name={t('New client')}
            active={activeItem === t('New client')}
            onClick={() => setActive(t('New client'))}
          />
          <Menu.Item
            name={t('New contact')}
            active={activeItem === t('New contact')}
            onClick={() => setActive(t('New contact'))}
          />
          <Menu.Item
            name={t('New competition')}
            active={activeItem === t('New competition')}
            onClick={() => setActive(t('New competition'))}
          />
          <Menu.Item
            name={t('New Calendar Event')}
            active={activeItem === t('New Calendar Event')}
            onClick={() => setActive(t('New Calendar Event'))}
          />          
        </Menu>
        {renderModal()}
      </Modal>
    </div>
  )
  return <div></div>

}


export default ModalComponent