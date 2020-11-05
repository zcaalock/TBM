import React from 'react'
import { useDispatch } from "react-redux"
import { editContact } from '../../../../actions/contacts'
import { editState } from '../../../../actions/appState'
import { useTranslation } from "react-i18next"


function EditContactMail(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()  

  function copyToClipboard() {
    navigator.clipboard.writeText(props.contact.mail)
    dispatch(editState(`${t('Copied')}: ${props.contact.mail}`, 'responseMessage'))
    dispatch(editState(200, 'responseStatus'))
  }

  const renderEditContact = () => {
    var re = /\S+@\S+\.\S+/

    if (re.test(props.contact.mail)) {
      return (
        <div data-position="top center" data-tooltip={props.contact.mail}>
          <i onClick={() => copyToClipboard()} className="articleIcon clipboard icon"></i>
        </div>
      )
    }

    return <div>-{props.contact.mail}</div>
  }

  return (
    <div style={{ width: '100%' }}
      onDoubleClick={() => {
        dispatch(editState(true, 'editFieldModalOpen'))
        dispatch(editState(props.contact.mail, 'editFieldModalItem'))
        dispatch(editState(props.contact.id, 'editFieldModalId'))
        dispatch(editState('mail', 'editFieldModalSelector'))
        dispatch(editState(editContact, 'editFieldModalFunction'))
        dispatch(editState(t('E-mail'), 'editFieldModalFieldTitle')) 
      }}
    >
      {renderEditContact()}
    </div>
  )
}

export default EditContactMail
