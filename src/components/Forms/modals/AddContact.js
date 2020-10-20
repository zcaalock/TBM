import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createContact } from '../../../actions/contacts'
import history from '../../../history'

let leadArr = []

function AddContact() {

  const contacts = useSelector(state => Object.values(state.contacts))
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [project, setProject] = useState('')
  const [userId, setUserid] = useState(privateId)
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
      phone,
      mail,
      project,
      userId: userId,
      privateId: isPrivate === true ? privateId : ''
    }
    dispatch(createContact(userData, userId))
    dispatch(editState(false, 'modalOpen'))
    history.push('/contacts/All/all')
  }

  const generateLeadList = () => {
    if (lead.length > 0)
      lead.map(leadItems => {
        leadArr.push({ key: leadItems.userId, text: leadItems.title, value: leadItems })
        return leadArr
      })
    return leadArr = _.uniqBy(leadArr, 'text')
  }

  const generateProjectList = () => {
    let projectArr = [{ key: 'Create new project', text: 'Create new project', value: 'Create new project', icon: 'edit', 'onClick': () => setNewproject(true) }]
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
        label='Project'
        placeholder='Select project'
        searchInput={{ id: 'key' }}
        onChange={(e, { value }) => setProject(value)}
      />
    )

    if (newProject === true) return (
      <Form.Field
        id='project'
        name='project'
        control={Input}
        label='Project'
        placeholder='New project name'
        onChange={(e, { value }) => setProject(value)}
      />
    )
  }

  if (isEmpty(leadArr)) generateLeadList()
  return (
    <>
      <Modal.Header>Create new Contact</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label='Contact name'
              placeholder='Contact name'
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              control={Input}
              label='Contact phone'
              placeholder='Contact phone'
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label='Contact email'
              placeholder='Contact email'
              onChange={(e, { value }) => setMail(value)}
            />
            {projectOptions()}
            <Form.Field
              search
              defaultValue={leadArr.length > 0 ? _.find(leadArr, { key: privateId }).value : ''}
              name='lead'
              control={Select}
              options={leadArr}
              label='Lead Person'
              placeholder='Lead Person'
              searchInput={{ id: 'text1' }}
              onChange={(e, { value }) => setUserid(value.userId)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Form.Checkbox
          style={{ display: 'inline-block', float: 'left', marginTop: '10px', marginLeft: '5px' }}
          onChange={(e, { checked }) => { setIsPrivate(!isPrivate) }
          }
          label='Make private'
        />
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          Cancel
            </Button>
        <Button
          disabled={name !== '' && (mail !== '' || phone !== '') ? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content="Create pulse"
        />
      </Modal.Actions>
    </>
  )
}

export default AddContact