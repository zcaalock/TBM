import React from 'react'
import { useDispatch } from "react-redux";
import { deleteDetail } from '../../../actions/details'

function DetailIcon(props) {  
  const dispatch = useDispatch();
  return (
    <div>
      <div
        onClick={() => {props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Edit"
        style={{
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          cursor: 'pointer'
        }}>
        <i className=" edit icon" />
      </div>
      <div
        onClick={() => { dispatch(deleteDetail(props.detailId)) }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>
    </div>
  )
}

export default DetailIcon
