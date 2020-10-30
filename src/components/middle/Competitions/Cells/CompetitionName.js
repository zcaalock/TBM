import React, { useState } from 'react';
import EditCompetitionName from './EditCompetitionName'

function CompetitionNumber (props) {  
  
  const [state, defState] = useState(
    { itemEditable: false } ) 
   
    return (
      <div onDoubleClick={() => defState({itemEditable: true})}>         
        <div          
          style={{ display: 'inline-block', width: '100%' }}>
          <EditCompetitionName
            competition={props.competition}
            editState={state}
            showEdit={() => defState({itemEditable: true})}
            removeEdit={() => defState({itemEditable: false})}
          />          
        </div>
      </div>
    )  
}

export default CompetitionNumber