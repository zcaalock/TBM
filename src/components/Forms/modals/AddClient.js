import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { editState } from '../../../actions/appState'
import { createClient } from '../../../actions/clients'
import history from '../../../history'
import { useTranslation } from "react-i18next"
import { format } from 'date-fns'


let leadArr = []
let clientNames = []
let clientPhones = []

function AddClient() {
  const { t } = useTranslation()
  const clients = useSelector(state => Object.values(state.clients))
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [project, setProject] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState('')
  const [filingDate, setFillingdate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [userId, setUserid] = useState(privateId)
  const [newProject, setNewproject] = useState(false)
  const [newUnit, setnewUnit] = useState(false)

  const [clientNameExists, setClientnameexists] = useState(false)
  const [clientPhoneExists, setClientphoneexists] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    generateLeadList()
    clientNames = generateClientNames()
    clientPhones = generateClientPhones()
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
      unit,
      price,
      userId: userId,
      filingDate
    }
    dispatch(createClient(userData, userId))
    dispatch(editState(false, 'modalOpen'))
    history.push('/clients/All/all')
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
    if (clients.length > 0)
      clients.map(client => {
        projectArr.push({ key: client.id, text: client.project, value: client.project })
        return projectArr
      })
    return projectArr = _.uniqBy(projectArr, 'text')
  }

  const generateClientNames = () => {
    let clientNames = []
    if (clients.length > 0)
      clients.map(client => {
        clientNames.push(client.title.toLowerCase())
        return clientNames
      })
    return clientNames = _.uniq(clientNames)
  }

  const generateClientPhones = () => {
    let clientPhones = []
    if (clients.length > 0)
      clients.map(client => {
        clientPhones.push(client.phone)
        return clientPhones
      })
    return clientPhones = _.uniq(clientPhones)
  }

  const generateUnitList = () => {
    let unitArr = [{ key: t('Create new unit'), text: t('Create new unit'), value: t('Create new unit'), icon: 'edit', 'onClick': () => setnewUnit(true) }]
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
        required
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

  const unitOptions = () => {
    if (newUnit === false) return (
      <Form.Field
        search
        name='unit'
        control={Select}
        options={generateUnitList()}
        label={t('Unit')}
        placeholder={t('Select unit')}
        searchInput={{ id: 'text' }}
        onChange={(e, { value }) => setUnit(value)}
      />
    )

    if (newUnit === true) return (
      <Form.Field
        id='unit'
        name='unit'
        control={Input}
        label={t('Unit')}
        placeholder={t("New unit name (fe. 'A2')")}
        onChange={(e, { value }) => setUnit(value)}
      />
    )
  }

  if (leadArr.length > 0) return (
    <>
      <Modal.Header>{t('Create new Client')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <DateInput
              required
              style={{ marginTop: '-.28571429rem' }}
              label={t('Filing Date')}
              clearable
              closable
              name="date"
              placeholder="Date"
              value={filingDate}
              iconPosition="left"
              onChange={(e, { value }) => { setFillingdate(value) }}
              dateFormat={'YYYY-MM-DD'}
            />
            <Form.Field
              error={clientNameExists === true ? {
                content: t('This name already exists'),
                pointing: 'below',
              } : false}
              id='name'
              name='name'
              control={Input}
              label={t('Client name')}
              placeholder={t('Client name')}
              onChange={(e, { value }) => {
                setName(value)
                _.includes(clientNames, value.toLowerCase()) === true ? setClientnameexists(true) : setClientnameexists(false)
              }}
            />
            <Form.Field
              error={clientPhoneExists === true ? {
                content: t('This number already exists'),
                pointing: 'below',
              } : false}
              id='phone'
              name='phone'
              control={Input}
              label={t('Client phone')}
              placeholder={t('Client phone')}
              onChange={(e, { value }) => {
                setPhone(value)
                _.includes(clientPhones, value) === true ? setClientphoneexists(true) : setClientphoneexists(false)
              }}
            />
            <Form.Field
              id='mail'
              name='mail'
              control={Input}
              label={t('Client email')}
              placeholder={t('Client email')}
              onChange={(e, { value }) => setMail(value)}
            />
            {projectOptions()}
            {unitOptions()}
            <Form.Field
              id='price'
              name='price'
              control={Input}
              label={t('Proposed price')}
              placeholder={t('Proposed price')}
              onChange={(e, { value }) => setPrice(value)}
            />
            <Form.Field
              search
              defaultValue={leadArr.length > 0 ? _.find(leadArr, { key: privateId }).value : ''}
              name='lead'
              control={Select}
              options={leadArr}
              label={t('Lead Person')}
              placeholder={t('Lead Person')}
              searchInput={{ id: 'text1' }}
              onChange={(e, { value }) => setUserid(value)}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={(name !== '' || mail !== '' || phone !== '') && (project !== '' && filingDate !== '') && clientNameExists === false && clientPhoneExists === false ? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Create Client")}
        />
      </Modal.Actions>
    </>
  )
  return <div></div>
}

export default AddClient