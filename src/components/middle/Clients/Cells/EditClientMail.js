import React from 'react'
import { useDispatch } from "react-redux"
import { editClient } from '../../../../actions/clients'
import { editState } from '../../../../actions/appState'
import SingleInput from '../../../Forms/SingleInput'
import { useTranslation } from "react-i18next"


function EditClientMail(props) {  
  const dispatch = useDispatch();
  const { t } = useTranslation() 
  const onSubmit = (formValues) => {
    //console.log(formValues)
    dispatch(editClient(props.client.id, { mail: formValues.title }))
    props.removeEdit()
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(props.client.mail)
    dispatch(editState(`${t('Copied')}: ${props.client.mail}`, 'responseMessage'))
    dispatch(editState(200, 'responseStatus'))

  }

  const renderEditClient = () => {
    var re = /\S+@\S+\.\S+/
    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={{ title: props.client.mail }}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false && re.test(props.client.mail)) {
      return (
        <div data-position="top center" data-tooltip={props.client.mail}>
          <i onClick={()=>copyToClipboard()} className="articleIcon clipboard icon"></i>
        </div>
      )
    }

    return <div>{props.client.mail}</div>
  }

  return (
    <div style={{ width: '100%' }}>
      {renderEditClient()}
    </div>
  )
}

export default EditClientMail
