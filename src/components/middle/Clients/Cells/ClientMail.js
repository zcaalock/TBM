import React from 'react'
import { useDispatch } from "react-redux"
import { editClient } from '../../../../actions/clients'
import { editState } from '../../../../actions/appState'
import { useTranslation } from "react-i18next"


function EditClientMail(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()  

  function copyToClipboard() {
    navigator.clipboard.writeText(props.client.mail)
    dispatch(editState(`${t('Copied')}: ${props.client.mail}`, 'responseMessage'))
    dispatch(editState(200, 'responseStatus'))
  }

  const renderEditClient = () => {
    var re = /\S+@\S+\.\S+/

    if (re.test(props.client.mail)) {
      return (
        <div data-position="top center" data-tooltip={props.client.mail}>
          <i onClick={() => copyToClipboard()} className="articleIcon clipboard icon"></i>
        </div>
      )
    }

    return <div>-{props.client.mail}</div>
  }

  return (
    <div style={{ width: '100%' }}
      onDoubleClick={() => {
        dispatch(editState(true, 'editFieldModalOpen'))
        dispatch(editState(props.client.mail, 'editFieldModalItem'))
        dispatch(editState(props.client.id, 'editFieldModalId'))
        dispatch(editState('mail', 'editFieldModalSelector'))
        dispatch(editState(editClient, 'editFieldModalFunction'))
        dispatch(editState(t('E-mail'), 'editFieldModalFieldTitle')) 
      }}
    >
      {renderEditClient()}
    </div>
  )
}

export default EditClientMail
