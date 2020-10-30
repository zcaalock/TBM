import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'

import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { editCompetition } from '../../actions/competitions'
import history from '../../history'
import { useTranslation } from "react-i18next"

function AddCompetition(props) {
  const { t } = useTranslation()
  const competitions = useSelector(state => Object.values(state.competitions))
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => Object.values(state.lead))
  const appState = useSelector(state => state.appState)
  const competition = props.competition

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')  
  const [project, setProject] = useState('')
  const [status, setStatus] = useState('')  
  const [userId, setUserid] = useState(privateId)
  const [newProject, setNewproject] = useState(false)
  const [newStatus, setNewStatus] = useState(false)
  const [web, setWeb] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setName(competition.title)
    setPhone(competition.phone)
    setProject(competition.project)
    setStatus(competition.status)
    setWeb(competition.web)
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
      project,
      status,
      web,
      userId: userId,

    }
    dispatch(editCompetition(competition.id, userData))
    dispatch(editState(false, 'editCompetitionOpen'))
    history.push(`/competitions/competition/${competition.id}`)
  }

  const generateProjectList = () => {
    let projectArr = [{ key: t('Create new project'), text: t('Create new project'), value: t('Create new project'), icon: 'edit', 'onClick': () => setNewproject(true) }]
    if (competitions.length > 0)
      competitions.map(competition => {
        projectArr.push({ key: competition.id, text: competition.project, value: competition.project })
        return projectArr
      })
    return projectArr = _.uniqBy(projectArr, 'text')
  }

  const generateStatusList = () => {
    let statusArr = [{ key: t('Create new status'), text: t('Create new status'), value: t('Create new status'), icon: 'edit', 'onClick': () => setNewStatus(true) }]
    if (competitions.length > 0)
      competitions.map(competition => {
        statusArr.push({ key: competition.id, text: competition.status, value: competition.status })
        return statusArr
      })
    return statusArr = _.uniqBy(statusArr, 'text')
  }

  const projectOptions = () => {
    if (newProject === false) return (
      <Form.Field
        search
        name='project'
        control={Select}
        options={generateProjectList()}
        defaultValue={competition.project}
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

  const statusOptions = () => {
    if (newStatus === false) return (
      <Form.Field
        search
        name='status'        
        value={status}
        control={Select}
        options={generateStatusList()}
        label={t('Status')}
        placeholder={t('Select status')}
        searchInput={{ id: 'text' }}
        onChange={(e, { value }) => setStatus(value)}
      />
    )

    if (newStatus === true) return (
      <Form.Field
        id='status'
        name='status'
        control={Input}
        label={t('Status')}        
        placeholder={t("New status")}
        onChange={(e, { value }) => setStatus(value)}
      />
    )
  }
  const close = () => {
    dispatch(editState(false, 'editCompetitionOpen'))
    setName('')
    setPhone('')
    setProject('')
    setStatus('')
  }

  return (
    <Modal size='tiny' dimmer='inverted' open={appState.editCompetitionOpen} onClose={close}>
      <Modal.Header>{t('Edit Competition')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label={t('Competition name')}
              placeholder={t('Competition name')}
              value={name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              value={phone}
              control={Input}
              label={t('Competition phone')}
              placeholder={t('Competition phone')}
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='web'
              name='web'
              control={Input}
              label={t('Web page')}
              placeholder={t('Web page')}
              value={web}
              onChange={(e, { value }) => setWeb(value)}
            />
            {projectOptions()}
            {statusOptions()}
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={name !== '' && project !== '' ? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Edit Competition")}
        />
      </Modal.Actions>
    </Modal>
  )
  return <div></div>
}

export default AddCompetition