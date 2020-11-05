import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Modal, Form, Button, Input } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { useTranslation } from "react-i18next"


function ModalComponent(props) {
  const appState = useSelector(state => state.appState)
  const [newValue, setNewvalue] = useState(appState.editFieldModalItem)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const userData = {
      [appState.editFieldModalSelector]: newValue
    }
    dispatch(appState.editFieldModalFunction(appState.editFieldModalId, userData))
    close()
  }

  const close = () => {
    dispatch(editState(false, 'editFieldModalOpen'))
    dispatch(editState('', 'editFieldModalItem'))
    dispatch(editState('', 'editFieldModalId'))
    dispatch(editState('', 'editFieldModalSelector'))
    dispatch(editState('', 'editFieldModalFunction'))  
    dispatch(editState('', 'editFieldModalFieldTitle')) 
  }

  const activateSubmit = () => { return newValue === appState.editFieldModalItem ? true : false }  

  if (appState.editFieldModalOpen === true) return (
    <Modal size='small' dimmer='inverted' open={appState.editFieldModalOpen} onClose={() => close()}>
      <Modal.Header>{t('Edit')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label={appState.editFieldModalFieldTitle}
              placeholder={appState.editFieldModalFieldTitle}
              defaultValue={newValue}
              onChange={(e, { value }) => setNewvalue(value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => close()}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={activateSubmit()}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Edit")}
        />
      </Modal.Actions>
    </Modal>
  )
  return null
}


export default ModalComponent