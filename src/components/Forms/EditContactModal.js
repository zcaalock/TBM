import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { editContact } from '../../actions/contacts'
import history from '../../history'
import { useTranslation } from "react-i18next"


let leadArr = []

function AddContact(props) {
  const { t } = useTranslation()
  const contacts = useSelector(state => Object.values(state.contacts))
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))
  const appState = useSelector(state => state.appState)
  const contact = props.contact

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [project, setProject] = useState('')
  const [company, setCompany] = useState('')
  const [newcompany, setNewCompany] = useState('')
  const [userId, setUserid] = useState(privateId)
  const [newProject, setNewproject] = useState(false)


  const dispatch = useDispatch()

  useEffect(() => {
    setName(contact.title)
    setPhone(contact.phone)
    setMail(contact.mail)
    setProject(contact.project)
    setCompany(contact.company)
    generateLeadList()
  }, [])

  // const isEmpty = (obj) => {
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key))
  //       return false;
  //   }
  //   return true;
  // }  

  const handleSubmit = () => {
    const userData = {
      title: name,
      phone,
      mail,
      project,
      company,
      userId: userId,

    }
    dispatch(editContact(contact.id, userData))
    dispatch(editState(false, 'editContactOpen'))
    history.push(`/contacts/contact/${contact.id}`)
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

  const generatecompanyList = () => {
    let companyArr = [{ key: t('Create new company'), text: t('Create new company'), value: t('Create new company'), icon: 'edit', 'onClick': () => setNewCompany(true) }]
    if (contacts.length > 0)
      contacts.map(contact => {
        companyArr.push({ key: contact.id, text: contact.company, value: contact.company })
        return companyArr
      })
    return companyArr = _.uniqBy(companyArr, 'text')
  }

  const projectOptions = () => {
    if (newProject === false) return (
      <Form.Field
        search
        name='project'
        control={Select}
        options={generateProjectList()}
        defaultValue={contact.project}
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
        placeholder={t('New name')}
        onChange={(e, { value }) => setProject(value)}
      />
    )
  }

  const companyOptions = () => {
    if (newcompany === false) return (
      <Form.Field
        search
        name='company'
        defaultValue={company}
        control={Select}
        options={generatecompanyList()}
        label={t('Company')}
        placeholder={t('Select Company')}
        searchInput={{ id: 'text' }}
        onChange={(e, { value }) => setCompany(value)}
      />
    )

    if (newcompany === true) return (
      <Form.Field
        id='company'
        name='company'
        control={Input}
        label={t('Company')}
        value={company}
        placeholder={t("New name")}
        onChange={(e, { value }) => setCompany(value)}
      />
    )
  }
  const close = () => {
    dispatch(editState(false, 'editContactOpen'))
    setName('')    
    setPhone('')
    setMail('')
    setProject('')
    setCompany('')    
  }
  if (leadArr.length > 0) return (
    <Modal size='tiny' dimmer='inverted' open={appState.editContactOpen} onClose={close}>
      <Modal.Header>{t('Edit Contact')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>            
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label={t('Name')}
              placeholder={t('Name')}
              value={name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              value={phone}
              control={Input}
              label={t('Phone')}
              placeholder={t('Phone')}
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label={t('Email')}
              placeholder={t('Email')}
              value={mail}
              onChange={(e, { value }) => setMail(value)}
            />
            {projectOptions()}
            {companyOptions()}            
            <Form.Field
              search
              defaultValue={leadArr.length > 0 ? _.find(leadArr, { key: privateId }).value : ''}
              name='lead'
              control={Select}
              options={leadArr}
              label={t('Lead Person')}
              placeholder={t('Lead Person')}
              searchInput={{ id: 'text1' }}
              onChange={(e, { value }) => setUserid(value.userId)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={name !== '' || mail !== '' || phone !== ''? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Edit Contact")}
        />
      </Modal.Actions>
    </Modal>
  )
  return <div></div>
}

export default AddContact