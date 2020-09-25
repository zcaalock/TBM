import React, { useState } from 'react'
import EditLeadName from './EditLeadName'
import LeadNameIcons from './LeadNameIcons'


function LeadName(props) {

  const [itemEditable, setitemEditable] = useState(false);
 
  const removeEdit = () => {
    setitemEditable(false)
  }

  const showEdit = () => {
    setitemEditable(true)
  }

  return (
    <div >
      <div style={{ display: 'inline-block' }}>
        <EditLeadName lead={props.lead} userId={props.userId} editState={itemEditable} showEdit={() => showEdit()} removeEdit={() => removeEdit()} />
      </div>
      <div className="articleIcon" style={{ display: 'inline-block' }}>
        <LeadNameIcons showEdit={() => showEdit()} />
      </div>
    </div>
  )
}

export default LeadName