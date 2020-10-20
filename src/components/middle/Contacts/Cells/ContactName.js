import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import EditContactName from './EditContactName'

function ContactNumber (props) {  

  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const renderPrivateIcon = () => {    
    if (props.contact.privateId === leadUser.userId) {
      return (
        <div
          data-position="bottom center"
          data-tooltip="Private Pulse"          
        >
          <i className="privacy icon" />
        </div>)
    }
  }  
  
  const [state, defState] = useState(
    { itemEditable: false } ) 
   
    return (
      <div onDoubleClick={() => defState({itemEditable: true})}> 
      <div
          style={{cursor:'auto', position: 'absolute', marginLeft: '-25px', display: 'inline-block', color: '#00A569' }}>           
          {renderPrivateIcon()}
        </div>        
        <div          
          style={{ display: 'inline-block', width: '100%' }}>
          <EditContactName
            contact={props.contact}
            editState={state}
            showEdit={() => defState({itemEditable: true})}
            removeEdit={() => defState({itemEditable: false})}
          />          
        </div>
      </div>
    )  
}

export default ContactNumber