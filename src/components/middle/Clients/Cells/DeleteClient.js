import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import {deleteClient} from '../../../../actions/clients'

function DeleteClient (props) {
  
  const details = useSelector(state => Object.values(state.details))
  const notepad = useSelector(state => Object.values(state.notepad))
    

  const dispatch = useDispatch();

  const renderDelete = () => {    
    const detailsFiltered = _.filter(details, {pulseId: props.clientId})
    const notepadFiltered = _.filter(notepad, {pulseId: props.clientId})    
    
    if (detailsFiltered.length>0 || notepadFiltered.length > 0){
      return (
        <div               
        data-position="left center"
        data-tooltip="Remove all items before delete"
        style={{ display: 'inline-block' }}>
        <i className="trash icon" style={{ paddingLeft: '10px', color: '#cecece'}} />        
      </div>
      )
    } return (
      <div
        onClick={() => dispatch(deleteClient(props.clientId))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block',cursor: 'pointer', paddingLeft: '10px' }}>
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

export default DeleteClient
