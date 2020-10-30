import React from 'react'
import { useSelector } from "react-redux";

import Header from '../../../items/Header'
import Body from './Body'

function ItemsMain (ownProps) {  
  const board = useSelector(state => state.boards[ownProps.match.params.id]);
  const renderHeader = () => {
    if (!board) {
      return (
        <div className="article">
          <div className="ui active inline loader"></div>
        </div>
      )
    }    
    return (
      <div className="article">
        <Header board={board}  />
        <Body />
      </div>
    )
  }
  return renderHeader()
}
export default ItemsMain
