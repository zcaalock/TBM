import React, { useState } from 'react';
import EditPulseName from './EditPulseName'
//import { useTranslation } from "react-i18next"


function PulseName(props) {
  const [state, defState] = useState(
    { itemEditable: false })
  
  return (
    <div onDoubleClick={() => defState({ itemEditable: true })}>      
      <div
        style={{ display: 'inline-block', width: '100%' }}>
        <EditPulseName
          pulse={props.pulse}
          editState={state}
          showEdit={() => defState({ itemEditable: true })}
          removeEdit={() => defState({ itemEditable: false })}
        />
      </div>
    </div>
  )
}

export default PulseName