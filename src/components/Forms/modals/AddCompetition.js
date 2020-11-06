import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { Button, Modal, Form, Input, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import { createCompetition } from '../../../actions/competitions'
import history from '../../../history'
import { useTranslation } from "react-i18next"

function AddCompetition() {
  const { t } = useTranslation()
  const competitions = useSelector(state => Object.values(state.competitions))
  const privateId = useSelector(state => state.user.credentials.userId)  

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [web, setWeb] = useState('')
  const [project, setProject] = useState('')   
  const userId = privateId
  const [newProject, setNewproject] = useState(false) 

  const dispatch = useDispatch()

  useEffect(() => {
    generateProjectList()    
  }, []) 

  const handleSubmit = () => {
    const userData = {
      title: name,
      phone,
      web,
      project,            
      userId: userId,      
    }
    dispatch(createCompetition(userData, userId))
    dispatch(editState(false, 'modalOpen'))
    history.push('/competitions/All/all')
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

  return (
    <>
      <Modal.Header>{t('Create Competition')}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={handleSubmit}>            
            <Form.Field
              id='name'
              name='name'
              control={Input}
              label={t('Title')}
              placeholder={t('Title')}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Field
              id='phone'
              name='phone'
              control={Input}
              label={t('Phone')}
              placeholder={t('Phone')}
              onChange={(e, { value }) => setPhone(value)}
            />
            <Form.Field
              id='web'
              name='web'
              control={Input}
              label={t('Web page')}
              placeholder={t('Web page')}
              onChange={(e, { value }) => setWeb(value)}
            />
            {projectOptions()}            
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => dispatch(editState(false, 'modalOpen'))}>
          {t('Cancel')}
        </Button>
        <Button
          disabled={(name !== '' || web !== '') && project !== '' ? false : true}
          form='my-form'
          onClick={() => handleSubmit()}
          icon='checkmark'
          labelPosition='right'
          content={t("Create Competition")}
        />
      </Modal.Actions>
    </>
  )
  return <div></div>
}

export default AddCompetition