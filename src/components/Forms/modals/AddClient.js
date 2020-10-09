import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createClient } from '../../../actions/clients'
import history from '../../../history'


let leadArr = []
//let projectArr = []

function AddClient() {

  const clients = useSelector(state => Object.values(state.clients))
  const appState = useSelector(state => state.appState)
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
  //const [privateId, setPrivateid] = useState('')

  

  const dispatch = useDispatch()

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  useEffect(() => {
    //setNewproject(false)
  }, [])

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
    //console.log(userData)
  }

  const generateLeadList = () => {
    //console.log('lead: ', this.props.lead)
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
        //value={this.state.name}
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
        //value={this.state.name}
        onChange={(e, { value }) => setUnit(value)}
      />
    )
  }

  const activateSubmit = () => { return name === '' ? true : false }
  
  if (isEmpty(leadArr)) generateLeadList()
  
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
              //value={this.state.name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              control={Input}
              label='Client phone'
              placeholder='Client phone'
              //value={this.state.name}
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label='Client email'
              placeholder='Client email'
              //value={this.state.name}
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
              //value={this.state.name}
              onChange={(e, { value }) => setPrice(value)}
            />
            <Form.Field
              search
              //disabled={activateLeadField()}
              defaultValue={leadArr.length > 0 ? _.find(leadArr, { key: privateId }).value : ''}
              name='lead'
              control={Select}
              //onFocus={this.handleBoardList()}
              options={leadArr}
              label='Lead Person'
              placeholder='Lead Person'
              searchInput={{ id: 'text' }}
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
          disabled={activateSubmit()}
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