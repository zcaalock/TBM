import React from 'react'
import DeleteContact from '../middle/Contacts/Cells/DeleteContact'
import ArchiveContact from '../middle/Contacts/Cells/ArchiveContact'
import PrivateContact from '../middle/Contacts/Cells/PrivateContact'


function HeaderIcons(props) { 
     
  return (
    <div>
      <div
          onClick={() => { 
            props.showEdit()
            //dispatch(editState('true', 'editClientOpen'))
           }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>
        <PrivateContact contact={props.contact}/>      
      <ArchiveContact contactId={props.contactId} />
      <DeleteContact contactId={props.contactId} />       
    </div>
  )

}

export default HeaderIcons
