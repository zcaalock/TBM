import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'

import { editCompetition } from '../../../../actions/competitions'
import { Dropdown } from 'semantic-ui-react'

function StatusList(props) {

  const dispatch = useDispatch();

  const saveField = (title) => {
    dispatch(editCompetition(props.competition.id, { status: title }))
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
    if (props.competition.status === 'Kupujący') return 'Kupujący'
    if (props.competition.status === 'Pośrednik') return 'Pośrednik'
    //return <i className="bullseye icon" style={{ color: props.competition.status }} />
  }

  const statusIcon = () => {
    return <i className="bullseye icon" style={{ color: props.competition.status }} />
  }

  const renderDropDown = () => {
    if (props.competition.archived === 'false') {
      //console.log('project: ', props.competition.project)
      return <Dropdown
          text={statusText()}
          icon={props.competition.status !== 'Pośrednik'&& props.competition.status !== 'Kupujący'?<i className="bullseye icon" style={{ color: props.competition.status }} />:''}
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
              onClick={() => { dispatch(editCompetition(props.competition.id, { archived: 'true' })) }}
            />
          </Dropdown.Menu>
        </Dropdown>      
    }
    if (props.competition.archived === 'true')
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
