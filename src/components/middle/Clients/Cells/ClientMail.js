import React, { useState } from 'react';
import EditClientMail from './EditClientMail'

function ClientMail (props) {  
  
  const [state, defState] = useState(
    { itemEditable: false } ) 
   
    return (
      <div onDoubleClick={() => defState({itemEditable: true})}>         
        <div          
          style={{ display: 'inline-block', width: '100%' }}>
          <EditClientMail
            client={props.client}
            editState={state}
            showEdit={() => defState({itemEditable: true})}
            removeEdit={() => defState({itemEditable: false})}
          />          
        </div>
      </div>
    )  
}

export default ClientMail