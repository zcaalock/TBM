import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import history from '../../history'
import { useTranslation } from "react-i18next"
import { editBoard } from '../../actions/boards'

function BoardModal() {
  
  const appState = useSelector(state => state.appState) 

  const id = appState.boardId.id
  const board = appState.boardId

  const privateId = useSelector(state => state.user.credentials.userId)
  const [name, setName] = useState(board.title)
  const [userId, setUserId] = useState(board.id)
  const [boardId, setBoardId] = useState(privateId)
  const [makePrivate, setMakeprivate] = useState(board.privateId === privateId?true:false)

  const dispatch = useDispatch()
  const { t } = useTranslation()  

  // const isEmpty = (obj) => {
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key))
  //       return false;
  //   }
  //   return true;
  // }

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