import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createClient } from '../../../actions/clients'
import history from '../../../history'

let leadArr = []

function AddClient() {

  const clients = useSelector(state => Object.values(state.clients))  
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [project, setProject] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState('')
  const [userId, setUserid] = useState(privateId)
  const [newProject, setNewproject] = useState(false)
  const [newUnit, setnewUnit] = useState(false) 

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
      unit,
      price,
      userId: userId
    }
    dispatch(createClient(userData, userId))
    dispatch(editState(false, 'modalOpen'))
    history.push('/clients/All/all')    
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
    let projectArr = [{ key: 'Create new project', text: 'Create new project', value: 'Create new project', icon: 'edit', 'onClick': ()=>setNewproject(true) }]
    if (clients.length > 0)
      clients.map(client => {
        projectArr.push({ key: client.id, text: client.project, value: client.project })
        return projectArr
      })
    return projectArr = _.uniqBy(projectArr, 'text')
  }

  const generateUnitList = () => {
    let unitArr = [{ key: 'Create new unit', text: 'Create new unit', value: 'Create new unit', icon: 'edit', 'onClick': ()=>setnewUnit(true) }]
    if (clients.length > 0)
      clients.map(client => {
        unitArr.push({ key: client.id, text: client.unit, value: client.unit })
        return unitArr
      })
    return unitArr = _.uniqBy(unitArr, 'text')
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

  const unitOptions = () => {
    if (newUnit === false) return (
      <Form.Field
        search
        name='unit'
        control={Select}
        options={generateUnitList()}
        label='Unit'
        placeholder='Select unit'
        searchInput={{ id: 'text' }}
        onChange={(e, { value }) => setUnit(value)}
      />
    )

    if (newUnit === true) return (
      <Form.Field
        id='unit'
        name='unit'
        control={Input}
        label='Unit'
        placeholder='New unit name (fe. "A2")'        
        onChange={(e, { value }) => setUnit(value)}
      />
    )
  }  
  
  if (isEmpty(leadArr)) generateLeadList()
  console.log('name: ', name, 'phone: ', phone, 'mail: ', mail)
  return (
    <>
      <Modal.Header>Create new Client</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label='Client name'
              placeholder='Client name'              
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              control={Input}
              label='Client phone'
              placeholder='Client phone'              
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label='Client email'
              placeholder='Client email'              
              onChange={(e, { value }) => setMail(value)}
            />
            {projectOptions()}
            {unitOptions()}
            <Form.Field
              id='price'
              name='price'
              control={Input}
              label='Proposed price'
              placeholder='Proposed price'              
              onChange={(e, { value }) => setPrice(value)}
            />
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
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          Cancel
            </Button>
        <Button
          disabled={name !== '' || mail !== '' || phone !== '' ? false : true}
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

export default AddClient