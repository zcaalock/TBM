import React from 'react'
import { deleteBoard, editBoard } from '../../../../actions/boards'
import { useDispatch, useSelector } from "react-redux";

import Header from '../../../items/Header'
import Body from './Body'

function ItemsMain (ownProps) {
  const dispatch = useDispatch();
  const board = useSelector(state => state.boards[ownProps.match.params.id]);
  const renderHeader = () => {
    if (!board) {
      return (
        <div className="article">
          <div className="ui active inline loader"></div>
        </div>
      )
    }
    const { title } = board
    return (
      <div className="article"
      // style={{display: 'inline-block', width: '70%'}} 
      >
        <Header board={board} delete={() =>  dispatch(deleteBoard(board.id)) } title={title} />
        <Body />
      </div>
    )
  }
  return renderHeader()
}
export default ItemsMain
