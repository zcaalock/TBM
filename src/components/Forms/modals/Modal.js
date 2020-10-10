import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Modal, Menu } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'

import AddPulseModal from './AddPulseModal'
import AddClient from './AddClient'
import GCalendarModal from './GCalendarModal'

function ModalComponent() {

  const appState = useSelector(state => state.appState)
  const [activeItem, setActive] = useState('New pulse')
  const dispatch = useDispatch()

  const renderModal = () => {
    if (activeItem === 'New pulse') return <AddPulseModal/>
    if (activeItem === 'New client') return <AddClient/>
    if (activeItem === 'Calendar') return <GCalendarModal/>
  }

  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={appState.modalOpen} onClose={() => dispatch(editState(false, 'modalOpen'))}>
        <Menu pointing secondary>
          <Menu.Item
            name='New pulse'
            active={activeItem === 'New pulse'}
            onClick={() => setActive('New pulse')}
          />
          <Menu.Item
            name='New client'
            active={activeItem === 'New client'}
            onClick={() => setActive('New client')}
          />
          <Menu.Item
            name='Calendar'
            active={activeItem === 'Calendar'}
            onClick={() => setActive('Calendar')}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='Close'
              active={activeItem === 'Close'}
              onClick={() => dispatch(editState(false, 'modalOpen'))}
            />
          </Menu.Menu>
        </Menu>
        {renderModal()}
      </Modal>
    </div>
  )

}


export default ModalComponent