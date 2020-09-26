import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteDetail } from '../../../actions/details'
import {editState} from '../../../actions/appState'
import GCalendarModal from '../../Forms/GCalendarModal'

function DetailIcon(props) {  

   const dispatch = useDispatch();
  const appState = useSelector(state => state.appState) 
  useEffect(()=>{
    dispatch(editState('false', 'gCalendarOpen'))
  },[])
  const ShowGCalendarModal = () => {
    return appState.gCalendarOpen === 'true' ?  <GCalendarModal detailId={props.detailId}/> : null
  }
  return (
    <div>
      <div
        onClick={() => {dispatch(editState('true', 'gCalendarOpen')) }}
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
      
      {ShowGCalendarModal()}
    </div>
  )
}

export default DetailIcon
