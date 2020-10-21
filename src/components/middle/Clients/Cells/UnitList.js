import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { editClient } from '../../../../actions/clients'
import { Dropdown } from 'semantic-ui-react'
import EditClientUnit from './EditClientUnit'
import { useTranslation } from "react-i18next"


function UnitList(props) {

  const [state, defState] = useState(
    { itemEditable: false })
  const clients = useSelector(state => Object.values(state.clients))
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()
  const saveField = (title) => {
    //console.log('title: ', title)
    if (title === 'Create name') defState({ itemEditable: true })
    else dispatch(editClient(props.client.id, { unit: title }))
  }

  const CreateNewUnitName = () => {
    if (state.itemEditable === true) return <div
      style={{ display: 'inline-block', width: '100%' }}>
      <EditClientUnit
        client={props.client}
        editState={state}
        showEdit={() => defState({ itemEditable: true })}
        removeEdit={() => defState({ itemEditable: false })}
      />
    </div>

    if (state.itemEditable === false) return <div>{renderDropDown()}</div>
  }

  function renderItems() {
    let list = []
    clients.map(client => {

      list.push({ key: client.id, text: client.unit, icon: '', value: client.unit })
    })

    return _.uniqBy(list, 'text').map(unit => {
      return <Dropdown.Item
        key={unit.key}
        onClick={() => saveField(unit.text)}
        style={{ paddingLeft: '28px' }}
        text={unit.text}
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
            text={props.client.unit}
            floating
            labeled
          >
            <Dropdown.Menu>
            
              <Dropdown.Item icon='edit' content={t('Create new unit')} onClick={() => saveField('Create name')} />
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
          {props.client.unit}
        </div>
      )
  }
  return <div>{CreateNewUnitName()}</div>
}

export default UnitList
