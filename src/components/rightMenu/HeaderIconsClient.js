import React from 'react'
import DeleteClient from '../middle/Clients/Cells/DeleteClient'
import ArchiveClient from '../middle/Clients/Cells/ArchiveClient'
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
      <ArchiveClient clientId={props.clientId} />
      <DeleteClient clientId={props.clientId} />       
    </div>
  )

}

export default HeaderIcons
