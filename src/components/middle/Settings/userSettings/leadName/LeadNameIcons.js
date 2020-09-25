import React from 'react'

function LeadNameIcons(props) {

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
    </div>
  )
}

export default LeadNameIcons
