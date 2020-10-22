import React from 'react'
import DeleteContact from '../middle/Contacts/Cells/DeleteContact'
import ArchiveContact from '../middle/Contacts/Cells/ArchiveContact'
import PrivateContact from '../middle/Contacts/Cells/PrivateContact'
import { useTranslation } from "react-i18next"

function HeaderIcons(props) { 
  const { t } = useTranslation()  
  return (
    <div>
      <div
          onClick={() => { 
            props.showEdit()
            //dispatch(editState('true', 'editClientOpen'))
           }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip={t("Edit")}
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
