import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { deleteBoard } from '../../../actions/boards'
import { useTranslation } from "react-i18next"


function DeleteBoard() {

  const categories = useSelector(state => Object.values(state.categories))
  const boardId = useSelector(state => state.appState.id)
  const user = useSelector(state => state.user.credentials)

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()
  const renderDelete = () => {
    const board = _.filter(categories, { boardId: boardId })
    if (board.length > 0) {
      return (
        <div
          data-position="bottom left"
          data-tooltip={t("Remove all items before delete")}
          style={{ display: 'inline-block' }}>
          <i className="trash icon" style={{ paddingLeft: '9px', color: '#cecece' }} />
        </div>
      )
    } return (
      <div
        onClick={() => dispatch(deleteBoard(boardId, user.userId))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip={t("Delete")}
        style={{ display: 'inline-block', cursor: 'pointer', paddingLeft: '9px' }}>
        <i className=" trash icon" />
      </div>
    )
  }

  return (
    <>
      {renderDelete()}
    </>
  )
}

export default DeleteBoard
