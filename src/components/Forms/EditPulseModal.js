import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { editPulse} from '../../actions/pulses'
import { fetchLead } from '../../actions/settings'
import { fetchBoards } from '../../actions/boards'
import history from '../../history'
import { useTranslation } from "react-i18next"
let boardsArr = []
let boardsPrivateArr = []
let categoriesArr = []
let leadArr = []

function PulseModal() {

  const pulseIdSelected = useSelector(state => state.appState.pulseId)
  const pulseKey = useSelector(state => _.keyBy(state.pulses, 'id'))
  const categoryKey = useSelector(state => _.keyBy(state.categories, 'id'))
  const boards = useSelector(state => Object.values(state.boards))
  const boardKey = useSelector(state => _.keyBy(state.boards, 'id'))
  const categories = useSelector(state => Object.values(state.categories))
  const lead = useSelector(state => Object.values(state.lead))
  const leadKey = useSelector(state => _.keyBy(state.lead, 'userId'))
  const appState = useSelector(state => state.appState)
  const [makePrivate, setMakeprivate] = useState(false)
  const [boardIsPrivate, setBoardPrivate] = useState(false)

  const privateId = useSelector(state => state.user.credentials.userId)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [boardId, setBoardId] = useState('')

  const dispatch = useDispatch()
const { t, i18n } = useTranslation()
  useEffect(() => {
    if (isEmpty(boards)) dispatch(fetchBoards())
    if (isEmpty(lead)) dispatch(fetchLead())

    setName(pulseKey[appState.pulseId].title)
    //setUserName(leadKey[userId].title)
    setUserId(pulseKey[appState.pulseId].userId)
    //setPrivateId(pulseKey[appState.pulseId].privateId)
    setCategoryId(pulseKey[appState.pulseId].categoryId)
    setBoardId(categoryKey[pulseKey[appState.pulseId].categoryId].boardId)

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
      categoryId: categoryId,
      userId: userId,
      boardId: boardId,
      privateId: makePrivate === true ? userId : ''
    };
    dispatch(editPulse(pulseIdSelected, userData))    
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

  const generateCategoriesList = () => {
    categoriesArr = [];
    if (categories.length > 0) {
      _.filter(categories, { boardId: boardId })
        .map(category => {
          categoriesArr.push({ key: category.id, text: category.title, value: category.id })
          return categoriesArr
        })
    }
    return categoriesArr = _.uniqBy(categoriesArr, 'text')

  }

  const activateSubmit = () => { return categoryId === '' ? true : false }

  const defaulCheck = (bool) => {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  const close = () => {
    dispatch(editState('false', 'editPulseOpen'))
    setName('')
    setBoardId('')
    setCategoryId('')
    setUserId('')
  }

  generateBoardList()
  generateCategoriesList()
  generateLeadList()  
  const { editPulseOpen } = appState  
  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={defaulCheck(editPulseOpen)} onClose={close}>
        <Modal.Header>{t('Edit Pulse')}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              onSubmit={handleSubmit}>
              <Form.Field
                id='name'
                name='name'
                control={Input}
                label={t('Pulse name')}
                placeholder={t('Pulse name')}
                defaultValue={name}
                onChange={(e, { value }) => setName(value)}
              />
              <Form.Field
                search                
                name='userId'
                control={Select}                
                options={leadArr}                
                label={t('Lead Person')}
                placeholder={leadKey[userId] ? leadKey[userId].title : ''}
                searchInput={{ id: 'userId' }}
                onChange={(e, { value }) => setUserId(value)}
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
                  generateCategoriesList()
                  setCategoryId('')
                  if (boardKey[value].privateId === userId) { setBoardPrivate(true); setMakeprivate(true) }
                }}
              />
              <Form.Field
                search
                name='categoryId'
                control={Select}
                options={categoriesArr}
                label={t('Category name')}
                placeholder={t('Cateogry name')}
                searchInput={{ id: 'categoryId' }}
                onChange={(e, { value }) => setCategoryId(value)}
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
            content={t("Edit Pulse")}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default PulseModal