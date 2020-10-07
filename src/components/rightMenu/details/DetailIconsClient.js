import React, {useEffect} from 'react'
import { useDispatch} from "react-redux";
import { deleteDetail } from '../../../actions/details'
import {editState} from '../../../actions/appState'


function DetailIcon(props) {  

   const dispatch = useDispatch();
    return (
    <div>      
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
