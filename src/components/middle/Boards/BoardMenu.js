import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'semantic-ui-react'
import { editBoard, deleteBoard} from '../../../actions/boards'
import { editState } from '../../../actions/appState'


function BoardMenu(props) {

  const categories = useSelector(state => Object.values(state.categories))
  const userId = useSelector(state => state.user.credentials.userId)  
  const dispatch = useDispatch()
  
  const privateId = props.board.privateId

  const id = props.board.id  

  const { t } = useTranslation()

  const moveUp = (id, created, arr) => {
    const prev = arr && props.board.archived === 'false' ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number - 1 }) : null
    if (prev) dispatch(editBoard(id, { createdAt: prev.createdAt }, true))
    if (prev) dispatch(editBoard(prev.id, { createdAt: created }, true))
  }

  const moveDown = (id, created, arr) => {
    const next = arr && props.board.archived === 'false' ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number + 1 }) : null
    if (next) dispatch(editBoard(id, { createdAt: next.createdAt }, true))
    if (next) dispatch(editBoard(next.id, { createdAt: created }, true))
  }

  boardArr = []
  findBoards.map(board => {
    boardArr.push({ number: boardArr.length, id: board.id, createdAt: board.createdAt, archived: board.archived, privateId: board.privateId })
    if (showArchived === false) boardArr = _.chain(boardArr).reject({ archived: 'true' }).value()
    return boardArr = _.uniqBy(boardArr, 'id')
  })

  const renderUp = () => {

    const prev = boardArr.length > 0 ? _.find(boardArr, { number: boardArr[_.find(boardArr, { id: id }).number].number - 1 }) : null
    if (prev) return <Dropdown.Item
      icon='chevron up'
      content={t('Move up')}
      onClick={() => moveUp(id, props.board.createdAt, boardArr)}
    />
  }

  const renderDown = () => {

    const next = boardArr.length > 0 ? _.find(boardArr, { number: boardArr[_.find(boardArr, { id: id }).number].number + 1 }) : null
    if (next) return <Dropdown.Item
      icon='chevron down'
      content={t('Move down')}
      onClick={() => moveDown(id, props.board.createdAt, boardArr)}
    />
  }



  const renderDelete = () => {
    const cat = _.filter(categories, { boardId: id })

    if (cat.length > 0) {
      return (
        <Dropdown.Item
          disabled
          data-position="left center"
          data-tooltip={t("Remove all items before delete")}
          content={t("Delete")}
          icon="trash"
        />
      )
    } return (
      <Dropdown.Item
        onClick={() => { dispatch(deleteBoard(id)) }}
        content={t("Delete")}
        icon="trash"
      />
    )
  }  

  function renderPrivate() {
    if (privateId === userId) return (
      <div
        //onClick={() => dispatch(editCategory(id, { privateId: '' }))}
        data-position="left center"
        data-tooltip={t("Private")}
        style={{ color: '#00A569', paddingRight: '5px', cursor: 'pointer' }}>
        <i className=" privacy icon" />
      </div>)
  }  

  return (

    <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
      {renderPrivate()}            
      <Dropdown icon='bars' pointing='right' className='articleIcon'>
        <Dropdown.Menu>
          <Dropdown.Header icon='bars' content={`${t('Board')} menu:`} />
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              dispatch(editState(props.board, 'boardId'))
              dispatch(editState(true, 'editBoardOpen'))              
            }
            }
            content={t("Edit")}
            icon='edit'
          />          
          <Dropdown.Item
            content={privateId === userId ? t('Make public') : t('Make private')}
            onClick={() => privateId === userId ? dispatch(editBoard(id, { privateId: '' })) : dispatch(editBoard(id, { privateId: userId }))}
            icon={privateId === userId ? <i className="privacy icon" style={{ color: '#00A569' }} /> : 'privacy'}
          />
          {renderDelete()}
          <Dropdown.Header content={`${t('Move')}:`} />
          {renderUp()}
          {renderDown()}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )

}

export default BoardMenu