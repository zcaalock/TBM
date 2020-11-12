import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import history from '../../../history'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createPulse, createPrivatePulse } from '../../../actions/pulses'
import { createCategory } from '../../../actions/categories'
import { useTranslation } from "react-i18next"

let boardsArr = []
let boardsPrivateArr = []
let categoriesArr = []
let leadArr = []

function PulseModal() {


  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [boardId, setBoardid] = useState('')
  const [categoryId, setCategoryid] = useState('')
  const [userId, setUserid] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const boards = useSelector(state => Object.values(state.boards))
  const categories = useSelector(state => Object.values(state.categories))
  const lead = useSelector(state => Object.values(state.lead))
  const privateId = useSelector(state => state.user.credentials.userId)

  const dispatch = useDispatch()

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {    
    categoriesArr = []  
  }, [categories])

  const handleSubmit = () => {
    //console.log('formValues', formValues)
    const userData = {
      title: name,
      privateId: privateId
    }
    if (isPrivate === false) dispatch(createPulse(userData, categoryId, userId))
    if (isPrivate === true) dispatch(createPrivatePulse(userData, categoryId, userId))
    dispatch(editState(false, 'modalOpen'))
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
    if (categories.length > 0) {
      _.filter(categories, { boardId: boardId, archived: 'false' })
        .map(category => {
          categoriesArr.push({ key: category.id, text: category.title, value: category.id, className: category.privateId === privateId ? 'colorGreen' : '', icon: category.privateId === privateId ? 'privacy' : '' })
          return categoriesArr
        })
    }
    return categoriesArr = _.uniqBy(categoriesArr, 'text')
  }

  const activateLeadField = () => { return name === '' ? true : false }
  const activateBoardField = () => { return userId === '' ? true : false }
  const activateCategoryField = () => { return boardId === '' ? true : false }
  const activateSubmit = () => { return categoryId === '' ? true : false }

  if (isEmpty(boardsArr)) generateBoardList()
  if (isEmpty(categoriesArr)) generateCategoriesList()
  if (isEmpty(leadArr)) generateLeadList()

  return (
    <>
      <Modal.Header>{t('Create new Pulse')}</Modal.Header>
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
              //value={this.state.name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              search
              disabled={activateLeadField()}
              name='userId'
              control={Select}
              //onFocus={this.handleBoardList()}
              options={leadArr}
              label={t('Lead Person')}
              placeholder={t('Lead Person')}
              searchInput={{ id: 'userId' }}
              onChange={(e, { value }) => setUserid(value)}
            />
            <Form.Field
              search
              disabled={activateBoardField()}
              name='boardId'
              control={Select}
              //onFocus={this.handleBoardList()}
              options={boardsArr}
              label={t('Board name')}
              placeholder={t('Board name')}
              searchInput={{ id: 'boardId' }}
              onChange={(e, { value }) => { setBoardid(value); categoriesArr = [] }}
            />

            <Form.Field
              search
              disabled={activateCategoryField()}
              name='categoryId'
              control={Select}
              //onFocus={this.handleBoardList()}
              options={categoriesArr}
              label={t('Category name')}
              placeholder={t('Cateogry name')}
              searchInput={{ id: 'categoryId' }}
              onChange={(e, { value }) => setCategoryid(value)}
              allowAdditions              
              value={categoriesArr.currentValue}
              onAddItem={(e, { value },d) => dispatch(createCategory({ title: value, privateId: isPrivate === true ? privateId : '' }, boardId))}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Form.Checkbox
          style={{ display: 'inline-block', float: 'left', marginTop: '10px', marginLeft: '5px' }}
          onChange={(e, { checked }) => { setIsPrivate(!isPrivate) }
          }
          label={t('Make private')}
        />
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={activateSubmit()}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Create pulse")}
        />
      </Modal.Actions>
    </>
  )
}

export default PulseModal