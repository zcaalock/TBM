import React, {useEffect} from 'react'
import { useDispatch} from "react-redux";
import { deleteDetail } from '../../../actions/details'
import {editState} from '../../../actions/appState'


function DetailIcon(props) {  

   const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(editState('false', 'gCalendarOpen'))
  },[])
  
  return (
    <div>
      <div
        onClick={
          () => {
            dispatch(editState('true', 'gCalendarOpen')) 
            dispatch(editState(props.detailId, 'detailId'))
            dispatch(editState(props.detailTitle, 'detailName'))
            //console.log(`detailTittle: `, props.detailTitle)
          }
        }
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Export to Google Calendar"
        style={{
          display: 'inline-block',
          paddingLeft: '28px',
          paddingRight: '5px',
          cursor: 'pointer'
        }}>
        <i className="calendar plus outline icon" />
      </div>
      <div
        onClick={() => {props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Edit"
        style={{
          display: 'inline-block',
          paddingLeft: '0px',
          paddingRight: '5px',
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
