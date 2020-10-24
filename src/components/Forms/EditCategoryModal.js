import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { fetchLead } from '../../actions/settings'
import { fetchBoards } from '../../actions/boards'
import history from '../../history'
import { useTranslation } from "react-i18next"
import { editCategory } from '../../actions/categories';
let boardsArr = []
let boardsPrivateArr = []
let leadArr = []

function CategoryModal() {

  const boards = useSelector(state => Object.values(state.boards))
  const boardKey = useSelector(state => _.keyBy(state.boards, 'id'))
  const lead = useSelector(state => Object.values(state.lead))
  const appState = useSelector(state => state.appState)
  const [makePrivate, setMakeprivate] = useState(false)

  const id = appState.categoryId.id
  const category = appState.categoryId

  const privateId = useSelector(state => state.user.credentials.userId)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [boardId, setBoardId] = useState('')

  const dispatch = useDispatch()
  const { t } = useTranslation()
  useEffect(() => {
    if (isEmpty(boards)) dispatch(fetchBoards())
    if (isEmpty(lead)) dispatch(fetchLead())

    setName(category.title)
    setCategoryId(category.id)
    setBoardId(category.boardId)
    setUserId(privateId)
    generateBoardList()
    generateLeadList()
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
      boardId: boardId,
      privateId: makePrivate === true ? userId : ''
    };
    dispatch(editCategory(id, userData, true))
    close()
    dispatch(editState(categoryId, 'expandCategory'))
    history.push(`/boards/${boardId}/pulses/${categoryId}`)
  }

  const generateLeadList = () => {
    if (lead.length > 0)
      lead.map(leadItems => {
        leadArr.push({ key: leadItems.userId, text: leadItems.title, value: leadItems.userId })
        return leadArr
      })
    return leadArr = _.uniqBy(leadArr, 'text')
  }

  const generateBoardList = () => {
    if (boards.length > 0)
      boards.map(board => {
        boardsArr.push({ key: board.id, text: board.title, value: board.id, private: board.privateId, className: board.privateId === privateId ? 'colorGreen' : '', icon: board.privateId === privateId ? 'privacy' : '' })
        return boardsArr
      })
    boardsPrivateArr = _.filter(boardsArr, { private: privateId })
    boardsArr = _.filter(boardsArr, { private: '' })
    return boardsArr = _.uniqBy(boardsArr.concat(boardsPrivateArr), 'text')
  }

  const activateSubmit = () => { return (name === '') ? true : false }

  const close = () => {
    dispatch(editState(false, 'editCategoryOpen'))
    dispatch(editState('', 'categoryId'))
    setName('')
    setBoardId('')
    setCategoryId('')
    setUserId('')
  }



  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={appState.editCategoryOpen} onClose={close}>
        <Modal.Header>{t('Edit Category')}</Modal.Header>
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
              <Form.Field
                search
                name='boardId'
                control={Select}
                options={boardsArr}
                label={t('Board name')}
                placeholder={boardKey[boardId] ? boardKey[boardId].title : ''}
                onChange={(e, { value }) => {
                  setBoardId(value)
                  if (boardKey[value].privateId === userId) setMakeprivate(true)
                  if (boardKey[value].privateId === '') setMakeprivate(false)
                }}
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
            checked={(boardKey[boardId] && boardKey[boardId].privateId === userId) || makePrivate === true ? true : false}
            label={t('Make private')}
            disabled={boardKey[boardId] && boardKey[boardId].privateId === userId ? true : false}
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
            content={t("Edit Category")}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default CategoryModal