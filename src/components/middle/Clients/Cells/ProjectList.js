import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { editClient } from '../../../../actions/clients'
import { Dropdown } from 'semantic-ui-react'
import EditClientProject from './EditClientProject'


function UserName(props) {

  const [state, defState] = useState(
    { itemEditable: false })
  const clients = useSelector(state => Object.values(state.clients))
  const dispatch = useDispatch(); 

  const saveField = (title) => {
    //console.log('title: ', title)
    if (title === 'Create name') defState({ itemEditable: true })
    else dispatch(editClient(props.client.id, { project: title }))
  }

  const CreateNewProjectName = () => {
    if (state.itemEditable === true) return <div
      style={{ display: 'inline-block', width: '100%' }}>
      <EditClientProject
        client={props.client}
        editState={state}
        showEdit={() => defState({ itemEditable: true })}
        removeEdit={() => defState({ itemEditable: false })}
      />
    </div>

    if (state.itemEditable === false) return <div>{renderDropDown()}</div>
  }

  function renderItems () {
    let projectList = []
    clients.map(client => {

      projectList.push({ key: client.id, text: client.project, icon: '', value: client.project })
    })
    
    return _.uniqBy(projectList, 'text').map(project => {
      return <Dropdown.Item
        key={project.key}
        onClick={() => saveField(project.text)}
        style={{paddingLeft: '28px'}}
        text={project.text}
        //floating
      />
    })

    

  }

  const renderDropDown = () => {
    if (props.client.archived === 'false') {
      //console.log('project: ', props.client.project)
      return (
        <div>
          <Dropdown
            text={props.client.project}
            floating
            labeled
          >
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' content='Create name' onClick={() => saveField('Create name')} />
              <Dropdown.Divider />              
              {renderItems()}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    }
    if (props.client.archived === 'true')
      return (
        <div>
          {props.client.project}
        </div>
      )
  }
  return <div>{CreateNewProjectName()}</div>
}

export default UserName
