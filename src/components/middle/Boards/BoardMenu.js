import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'semantic-ui-react'
import { editBoard, deleteBoard} from '../../../actions/boards'
import { editState } from '../../../actions/appState'

let boardArr = []

function BoardMenu(props) {

  const categories = useSelector(state => Object.values(state.categories))
  const boards = useSelector(state => Object.values(state.boards))
  const userId = useSelector(state => state.user.credentials.userId)  
  //const appState = useSelector(state => state.appState)
  const lead = useSelector(state => _.find(state.lead, { userId: userId })) 
  const dispatch = useDispatch()
  
  const archived = props.boardContent.archived
  const privateId = props.boardContent.privateId

  const id = props.boardContent.id  

  let findBoards = _.sortBy(_.filter(boards, { privateId: '' }), 'createdAt')
  let showArchived = lead.settings.showArchived
  //console.log(findBoards)

  const { t } = useTranslation()

  const moveUp = (id, created, arr) => {
    const prev = (arr && props.boardContent.archived === 'false' && props.boardContent.privateId=== '') ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number - 1 }) : null
    //console.log('prev: ', prev)
    if (prev) dispatch(editBoard(id, { createdAt: prev.createdAt }, true))
    if (prev) dispatch(editBoard(prev.id, { createdAt: created }, true))
  }

  const moveDown = (id, created, arr) => {
    const next = (arr && props.boardContent.archived === 'false' && props.boardContent.privateId=== '') ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number + 1 }) : null
    //console.log('next: ', next)
    if (next) dispatch(editBoard(id, { createdAt: next.createdAt }, true))
    if (next) dispatch(editBoard(next.id, { createdAt: created }, true))
  }
 boardArr = []
  findBoards.map(board => {
    boardArr.push({ number: boardArr.length, id: board.id, createdAt: board.createdAt, archived: board.archived, privateId: board.privateId })
    return showArchived === true ? boardArr = _.uniqBy(boardArr, 'id') :boardArr = _.chain(boardArr).reject({ archived: 'true' }).value()
  })  

  //console.log('showArcjoved: ', showArchived)
  //console.log('boardArr',boardArr)

  const renderUp = () => {
    const prev = (boardArr.length > 0 && props.boardContent.privateId=== '') ? _.find(boardArr, { number: boardArr[_.find(boardArr, { id: id }).number].number - 1 }) : null
    if (prev) return <Dropdown.Item
      icon='chevron up'
      content={t('Move up')}
      onClick={() => moveUp(id, props.boardContent.createdAt, boardArr)}
    />
    return <div></div>
  }

  const renderDown = () => {

    const next = (boardArr.length > 0 && props.boardContent.privateId=== '') ? _.find(boardArr, { number: boardArr[_.find(boardArr, { id: id }).number].number + 1 }) : null
    if (next) return <Dropdown.Item
      icon='chevron down'
      content={t('Move down')}
      onClick={() => moveDown(id, props.boardContent.createdAt, boardArr)}
    />
    return <div></div>
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

  function renderArchived() {
    if (archived === 'true') return (
      <div
        onClick={() => dispatch(editBoard(id, { archived: 'false' }))}
        data-position="left center"
        data-tooltip={t("Unarchive")}
        style={{ color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>)
  }
  
  return (

    <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
      {renderArchived()}
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
            content={archived === 'true' ? t('Unarchive') : t('Archive')}
            icon={archived === 'true' ? <i className=" archive icon" style={{ color: '#DC6969' }} /> : 'archive'}
            onClick={() => archived === 'true' ? dispatch(editBoard(id, { archived: 'false'}, userId, showArchived )) : dispatch(editBoard(id, { archived: 'true' }, userId, showArchived))}
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