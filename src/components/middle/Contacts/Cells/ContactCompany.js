import React, { useState } from 'react';
import EditContactCompany from './EditContactCompany'

function ContactCompany (props) {  
  
  const [state, defState] = useState(
    { itemEditable: false } ) 
   
    return (
      <div onDoubleClick={() => defState({itemEditable: true})}>         
        <div          
          style={{ display: 'inline-block', width: '100%' }}>
          <EditContactCompany
            contact={props.contact}
            editState={state}
            showEdit={() => defState({itemEditable: true})}
            removeEdit={() => defState({itemEditable: false})}
          />          
        </div>
      </div>
    )  
}

export default ContactCompany