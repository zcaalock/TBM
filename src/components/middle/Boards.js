import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard } from '../../actions/boards'
import { editState } from '../../actions/appState'

import Header from './Boards/Header'
import Body from './Boards/Body'

function Boards(props) {

  const dispatch = useDispatch();
  const board = useSelector(state => state.boards[props.match.params.id])
  useEffect(() => {
    dispatch(editState(props.match.params.id, 'id')) //selected board to appState  
  }, [dispatch,props.match.params.id])

  const renderHeader = () => {
    if (board) {
      return (
        <div className="article">
          <Header boardContent={board} board={board.title} delete={() => dispatch(deleteBoard(board.id))} title={board.title} />
          <Body />
        </div>
      )
    }

    return (
      <div className="article">
        <div className="ui active inline loader"></div>
      </div>

    )
  }
  return renderHeader()
}

export default Boards
