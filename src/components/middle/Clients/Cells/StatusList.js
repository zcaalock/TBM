import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'

import { editClient } from '../../../../actions/clients'
import { Dropdown } from 'semantic-ui-react'

function StatusList(props) {

  const dispatch = useDispatch();

  const saveField = (title) => {
    dispatch(editClient(props.client.id, { status: title }))
  }

  function renderItems() {
    let list = [
      { key: '#00A569', text: 'Rokujący', icon: 'bullseye', value: '#00A569' },
      { key: '#EDC15C', text: 'Niezdecydowany', icon: 'bullseye', value: '#EDC15C' },
      { key: '#DC6969', text: 'Nierokujący', icon: 'bullseye', value: '#DC6969' },
      { key: 'black', text: 'Kupujący', value: 'Kupujący' },
      { key: 'Pośrednik', text: 'Pośrednik', value: 'Pośrednik' }

    ]

    return _.uniqBy(list, 'key').map(unit => {
      return <Dropdown.Item
        key={unit.key}
        onClick={() => saveField(unit.value)}
        style={{ paddingLeft: '0px', color: unit.value }}
        text={unit.text}
      //floating
      />
    })

  }

  const statusText = () => {
    if (props.client.status === 'Kupujący') return 'Kupujący'
    if (props.client.status === 'Pośrednik') return 'Pośrednik'
    //return <i className="bullseye icon" style={{ color: props.client.status }} />
  }

  // const statusIcon = () => {
  //   return <i className="bullseye icon" style={{ color: props.client.status }} />
  // }

  const renderDropDown = () => {
    if (props.client.archived === 'false') {
      //console.log('project: ', props.client.project)
      return <Dropdown
          text={statusText()}
          icon={props.client.status !== 'Pośrednik'&& props.client.status !== 'Kupujący'?<i className="bullseye icon" style={{ color: props.client.status }} />:''}
          floating
          labeled
          style={{ marginLeft: '0px', marginRight: '10px' }}
        >
          <Dropdown.Menu>
            {renderItems()}
            <Dropdown.Divider />
            <Dropdown.Item
              icon='archive'
              style={{ color: '#DC6969' }}
              text='Archive'
              onClick={() => { dispatch(editClient(props.client.id, { archived: 'true' })) }}
            />
          </Dropdown.Menu>
        </Dropdown>      
    }
    if (props.client.archived === 'true')
      return (
        <div
          data-position="bottom center"
          data-tooltip="Archived"
          style={{ color: '#DC6969', textAlign: 'left', paddingLeft: '6.5px' }}>
          <i className=" archive icon" />
        </div>
      )
  }
  return <div>{renderDropDown()}</div>
}

export default StatusList
