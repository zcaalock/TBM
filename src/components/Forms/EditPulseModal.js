import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import _, { set } from 'lodash'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { editPulse, fetchPulses } from '../../actions/pulses'
import { fetchLead } from '../../actions/settings'
import { fetchBoards } from '../../actions/boards'
import { fetchCategories } from '../../actions/categories'


let boardsArr = []
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


  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [privateId, setPrivateId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [boardId, setBoardId] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(boards)) dispatch(fetchBoards())
    if (isEmpty(lead)) dispatch(fetchLead())

    setName(pulseKey[appState.pulseId].title)
    //setUserName(leadKey[userId].title)
    setUserId(pulseKey[appState.pulseId].userId)
    setPrivateId(pulseKey[appState.pulseId].privateId)
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
    //console.log('formValues', formValues)
    const userData = {
      title: name,
      categoryId: categoryId,
      userId: userId,
      boardId: boardId
    };

    dispatch(editPulse(pulseIdSelected, userData))
    dispatch(fetchPulses())
    close()
    
  }

  const generateLeadList = () => {
    //console.log('lead: ', this.props.lead)
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
        boardsArr.push({ key: board.id, text: board.title, value: board.id, private: board.privateId })
        return boardsArr
      })

    boardsArr = _.filter(boardsArr, { private: '' })

    return boardsArr = _.uniqBy(boardsArr, 'text')
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
  const activateLeadField = () => { return name === '' ? true : false }
  const activateBoardField = () => { return userId === '' ? true : false }
  const activateCategoryField = () => { return boardId === '' ? true : false }
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
  //console.log('name: ', name, 'userId: ', 'boardId:', boardId, 'catId: ', categoryId)
  const { editPulseOpen } = appState
  //console.log('boards: ', categoriesArr )
  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={defaulCheck(editPulseOpen)} onClose={close}>
        <Modal.Header>Create new Pulse</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              onSubmit={handleSubmit}>
              <Form.Field
                id='name'
                name='name'
                control={Input}
                label='Pulse name'
                placeholder='Pulse name'
                defaultValue={name}
                onChange={(e, { value }) => setName(value)}
              />
              <Form.Field
                search
                //disabled={activateLeadField()}
                name='userId'
                control={Select}
                //onFocus={this.handleBoardList()}
                options={leadArr}
                //value='Alek'
                label='Lead Person'
                placeholder={leadKey[userId] ? leadKey[userId].title : ''}
                searchInput={{ id: 'userId' }}
                onChange={(e, { value }) => setUserId(value)}
              />
              <Form.Field
                search
                //disabled={activateBoardField()}
                name='boardId'
                control={Select}
                //onFocus={this.handleBoardList()}
                options={boardsArr}
                label='Board name'
                placeholder={boardKey[boardId] ? boardKey[boardId].title : ''}
                searchInput={{ id: 'boardId' }}
                onChange={(e, { value }) => {
                  setBoardId(value)
                  generateCategoriesList()
                  setCategoryId('')
                }

                }
              />
              <Form.Field
                search
                //disabled={activateCategoryField()}
                name='categoryId'
                control={Select}
                //onFocus={this.handleBoardList()}
                options={categoriesArr}
                label='Category name'
                placeholder='Cateogry name'
                searchInput={{ id: 'categoryId' }}
                onChange={(e, { value }) => setCategoryId(value)}
              />


              {/* <Form.Field
                  id='form-button-control-public'
                  control={Button}
                  content='Confirm'
                  label='Label with htmlFor'
                /> */}
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close}>
            Cancel
            </Button>
          <Button
            disabled={activateSubmit()}
            form='my-form'
            onClick={() => handleSubmit()}
            icon='checkmark'
            labelPosition='right'
            content="Edit pulse"
          />
        </Modal.Actions>
      </Modal>
    </div>
  )

}

export default PulseModal