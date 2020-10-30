import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { editContact } from '../../../../actions/contacts'
import { Dropdown } from 'semantic-ui-react'
import EditContactProject from './EditContactProject'
import { useTranslation } from "react-i18next"

function UserName(props) {

  const [state, defState] = useState(
    { itemEditable: false })
  const contacts = useSelector(state => Object.values(state.contacts))
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const saveField = (title) => {
    //console.log('title: ', title)
    if (title === 'Create name') defState({ itemEditable: true })
    else dispatch(editContact(props.contact.id, { project: title }))
  }

  const CreateNewProjectName = () => {
    if (state.itemEditable === true) return <div
      style={{ display: 'inline-block', width: '100%' }}>
      <EditContactProject
        contact={props.contact}
        editState={state}
        showEdit={() => defState({ itemEditable: true })}
        removeEdit={() => defState({ itemEditable: false })}
      />
    </div>

    if (state.itemEditable === false) return <div>{renderDropDown()}</div>
  }

  function renderItems() {
    let projectList = []
    contacts.map(contact => {

      projectList.push({ key: contact.id, text: contact.project, icon: '', value: contact.project })
    })

    return _.uniqBy(projectList, 'text').map(project => {
      return <Dropdown.Item
        key={project.key}
        onClick={() => saveField(project.text)}
        style={{ paddingLeft: '28px' }}
        text={project.text}
      //floating
      />
    })
  }
  const renderDropDown = () => {
    if (props.contact.archived === 'false') {
      //console.log('project: ', props.contact.project)
      return <Dropdown
        text={props.contact.project}
        floating
        labeled
      >
        <Dropdown.Menu>
          <Dropdown.Item icon='edit' content={t('Dodaj nowy projekt')} onClick={() => saveField('Create name')} />
          <Dropdown.Divider />
          {renderItems()}
        </Dropdown.Menu>
      </Dropdown>
    }
    if (props.contact.archived === 'true')
      return (
        <div>
          {props.contact.project}
        </div>
      )
  }
  return <div>{CreateNewProjectName()}</div>
}

export default UserName
