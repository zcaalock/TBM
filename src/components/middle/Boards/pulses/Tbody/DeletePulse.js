import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import {deletePulse} from '../../../../../actions/pulses'

function DeletePulse (props) {
  
  const details = useSelector(state => Object.values(state.details))
  const notepad = useSelector(state => Object.values(state.notepad))
  const boardId = useSelector(state => state.appState.id)  

  const dispatch = useDispatch();

  const renderDelete = () => {    
    const detailsFiltered = _.filter(details, {pulseId: props.pulseId})
    const notepadFiltered = _.filter(notepad, {pulseId: props.pulseId})    
    
    if (detailsFiltered.length>0 || notepadFiltered.length > 0){
      return (
        <div               
        data-position="left center"
        data-tooltip="Remove all items before delete"
        style={{ display: 'inline-block' }}>
        <i className="trash icon" style={{ 
          //paddingLeft: '10px', 
          color: '#cecece'
          }} />        
      </div>
      )
    } return (
      <div
        onClick={() => {
          dispatch(deletePulse(props.pulseId, boardId)); 
          //history.push(`/boards/${boardId}`)
        }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block',cursor: 'pointer' }}>
        <i className=" trash icon" />        
      </div>
    )
  }  
      
    return (
      <>        
        {renderDelete()}
      </>
    ) 
}

export default DeletePulse
