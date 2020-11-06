import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createContact } from '../../../actions/contacts'
import history from '../../../history'
import { useTranslation } from "react-i18next"


let leadArr = []

function AddContact() {
  const { t } = useTranslation()
  const contacts = useSelector(state => Object.values(state.contacts))
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [project, setProject] = useState('')
  const [userId, setUserId] = useState(privateId)
  const [newProject, setNewproject] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)


  const dispatch = useDispatch()

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const handleSubmit = () => {

    const userData = {
      title: name,
      company,
      phone,
      mail,
      project,
      userId: userId,
      privateId: isPrivate === true ? privateId : ''
    }
    //console.log(userData)
    dispatch(createContact(userData, userId))
    dispatch(editState(false, 'modalOpen'))
    history.push('/contacts/All/all')
  }

  const generateLeadList = () => {
    if (lead.length > 0)
      lead.map(leadItems => {
        leadArr.push({ key: leadItems.userId, text: leadItems.title, value: leadItems.userId })
        return leadArr
      })
    return leadArr = _.uniqBy(leadArr, 'text')
  }

  const generateProjectList = () => {
    let projectArr = [{ key: t('Create new project'), text: t('Create new project'), value: t('Create new project'), icon: 'edit', 'onClick': () => setNewproject(true) }]
    if (contacts.length > 0)
      contacts.map(contact => {
        projectArr.push({ key: contact.id, text: contact.project, value: contact.project })
        return projectArr
      })
    return projectArr = _.uniqBy(projectArr, 'text')
  }

  const projectOptions = () => {
    if (newProject === false) return (
      <Form.Field
        search
        name='project'
        control={Select}
        options={generateProjectList()}
        label={t('Project')}
        placeholder={t('Select project')}
        searchInput={{ id: 'key' }}
        onChange={(e, { value }) => setProject(value)}
      />
    )

    if (newProject === true) return (
      <Form.Field
        id='project'
        name='project'
        control={Input}
        label={t('Project')}
        placeholder={t('New project name')}
        onChange={(e, { value }) => setProject(value)}
      />
    )
  }
  
  if (isEmpty(leadArr)) generateLeadList() 
  return (
    <>
      <Modal.Header>{t('Create new Contact')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label={t('Contact name')}
              placeholder={t('Contact name')}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='company'
              name='company'
              control={Input}
              label={t('Company')}
              placeholder={t('Company')}
              onChange={(e, { value }) => setCompany(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              control={Input}
              label={t('Contact phone')}
              placeholder={t('Contact phone')}
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label={t('Contact email')}
              placeholder={t('Contact email')}
              onChange={(e, { value }) => setMail(value)}
            />
            {projectOptions()}
            <Form.Field
              search
              defaultValue={leadArr.length > 0 ? _.find(leadArr, { key: privateId }).value : ''}
              name='lead'
              control={Select}
              options={leadArr}
              label={t('Lead Person')}
              placeholder={t('Lead Person')}
              searchInput={{ id: 'text1' }}
              onChange={(e, { value }) => setUserId(value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Form.Checkbox
          style={{ display: 'inline-block', float: 'left', marginTop: '10px', marginLeft: '5px' }}
          onChange={(e, { checked }) => { setIsPrivate(!isPrivate) }
          }
          label={t('Make private')}
        />
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          {t('Cancel')}
            </Button>
        <Button
          disabled={name !== '' && (mail !== '' || phone !== '') ? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Create Contact")}
        />
      </Modal.Actions>
    </>
  )
}

export default AddContact