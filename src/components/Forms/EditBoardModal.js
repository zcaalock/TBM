import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
//import _ from 'lodash'
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { fetchLead } from '../../actions/settings'
import history from '../../history'
import { useTranslation } from "react-i18next"
import { editBoard } from '../../actions/boards'

function BoardModal() {

  const lead = useSelector(state => Object.values(state.lead))
  const appState = useSelector(state => state.appState)
  const [makePrivate, setMakeprivate] = useState(false)

  const id = appState.boardId.id
  const board = appState.boardId

  const privateId = useSelector(state => state.user.credentials.userId)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [boardId, setBoardId] = useState('')

  const dispatch = useDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    if (isEmpty(lead)) dispatch(fetchLead())
    setName(board.title)
    setBoardId(board.id)
    setUserId(privateId)
    setMakeprivate(board.privateId === privateId?true:false)

  }, [])

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const handleSubmit = () => {
    const userData = {
      title: name,      
      privateId: makePrivate === true ? userId : ''
    };

    console.log(userData, boardId)
    dispatch(editBoard(id, userData))
    close()
    history.push(`/boards/${boardId}`)
  }

  const activateSubmit = () => { return (name === '') ? true : false }

  const close = () => {
    dispatch(editState(false, 'editBoardOpen'))
    dispatch(editState('', 'boardId'))
    setName('')
    setBoardId('')
    setUserId('')
  }

  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={appState.editBoardOpen} onClose={close}>
        <Modal.Header>{t('Edit Board')}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              onSubmit={handleSubmit}>
              <Form.Field
                id='name'
                name='name'
                control={Input}
                label={t('Title')}
                placeholder={t('Title')}
                defaultValue={name}
                onChange={(e, { value }) => setName(value)}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Form.Checkbox
            style={{ display: 'inline-block', float: 'left', marginTop: '10px', marginLeft: '5px' }}
            onChange={(e, { checked }) => {
              setMakeprivate(!makePrivate)
            }}
            checked={makePrivate }
            label={t('Make private')}
          />
          <Button onClick={close}>
            {t('Cancel')}
          </Button>
          <Button
            disabled={activateSubmit()}
            form='my-form'
            onClick={() => handleSubmit()}
            icon='checkmark'
            labelPosition='right'
            content={t("Edit Board")}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default BoardModal