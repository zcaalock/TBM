import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard} from '../../actions/boards'
import { editState } from '../../actions/appState'

import Header from './Boards/Header'
import Body from './Boards/Body'

function ItemsMain(props) {

  const dispatch = useDispatch();
  const board = useSelector(state => state.boards[props.match.params.id])

  const renderHeader = () => {
    if (!board) {
      return (
        <div className="article">
          <div className="ui active inline loader"></div>
        </div>
      )
    }
    const { title } = board
    dispatch(editState(props.match.params.id, 'id')) //selected board to appState    
    return (
      <div className="article">
        <Header board={board} delete={() => dispatch(deleteBoard(board.id))} title={title} />
        <Body />
      </div>
    )
  }  
    return renderHeader()  
}

export default ItemsMain
