import React from 'react'
import { useDispatch } from "react-redux"
import { editContact } from '../../../../actions/contacts'
import SingleInput from '../../../Forms/SingleInput'
import { editState } from '../../../../actions/appState'
import { useTranslation } from "react-i18next"

function EditContactMail(props) {
  
  const dispatch = useDispatch();
  const { t } = useTranslation()
  function copyToClipboard() {
    navigator.clipboard.writeText(props.contact.mail)
    dispatch(editState(`${t('Copied')}: ${props.contact.mail}`, 'responseMessage'))
    dispatch(editState(200, 'responseStatus'))
  }

  const onSubmit = (formValues) => {
    //console.log(formValues)
    dispatch(editContact(props.contact.id, { mail: formValues.title }))
    props.removeEdit()
  }

  const renderEditContact = () => {
    var re = /\S+@\S+\.\S+/
    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={{ title: props.contact.mail }}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false && re.test(props.contact.mail)) {
      return (
        <div data-position="top center" data-tooltip={props.contact.mail}>
          <i onClick={() => copyToClipboard()} className="articleIcon clipboard icon"></i>
        </div>
      )
    }

    return <div>{props.contact.mail}</div>
  }

  return (
    <div style={{ width: '100%' }}>
      {renderEditContact()}
    </div>
  )
}

export default EditContactMail
