import React from 'react'

import Header from '../categories/Header'
import Thead from './Thead'
import Tbody from './Tbody'
import AddPulse from './Tbody/AddPulse'

function Table(props) {

  return (
    <div>
      <Header
        expandCollapse={() => props.collapse()}
        id={props.categoryKey}
        categoryKey={props.categoryKey}
        categoryTitle={props.categoryTitle}
        category={props.category} />
      <table className="ui very basic table" style={{ paddingLeft: '15px' }}>
        <Thead categoryId={props.categoryKey} />
        <Tbody categoryId={props.categoryKey} />
        <AddPulse boardId={props.boardId} categoryId={props.categoryKey} />
      </table>
    </div>
  )
}

export default Table