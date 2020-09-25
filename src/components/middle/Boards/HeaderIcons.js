import React from 'react'
import DeleteBoard from './DeleteBoard'

function HeaderIcons(props) {

  return (
    <div>
      <div
        onClick={() => { props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Edit"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" edit icon" />
      </div>
      <DeleteBoard />
    </div>
  )
}

export default HeaderIcons
