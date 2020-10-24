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
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )

}

export default BoardMenu