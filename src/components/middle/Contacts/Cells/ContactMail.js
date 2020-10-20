import React, { useState } from 'react';
import EditContactMail from './EditContactMail'

function ContactMail (props) {  
  
  const [state, defState] = useState(
    { itemEditable: false } ) 
   
    return (
      <div onDoubleClick={() => defState({itemEditable: true})}>         
        <div          
          style={{ display: 'inline-block', width: '100%' }}>
          <EditContactMail
            contact={props.contact}
            editState={state}
            showEdit={() => defState({itemEditable: true})}
            removeEdit={() => defState({itemEditable: false})}
          />          
        </div>
      </div>
    )  
}

export default ContactMail