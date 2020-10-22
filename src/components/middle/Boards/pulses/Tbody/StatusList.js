import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { useTranslation } from "react-i18next"
import { editPulse } from '../../../../../actions/pulses'
import { Dropdown } from 'semantic-ui-react'

function StatusList(props) {
  
  const dispatch = useDispatch();
const { t } = useTranslation()
  const saveField = (value) => {    
    dispatch(editPulse(props.pulse.id, { status: value }))
  }

  function renderItems() {
    let list = [
      { key: 'Before Start', text: t('Before Start'), value: 'Before Start' },
      { key: 'In Progress', text: t('In Progress'), value: 'In Progress' },
      { key: 'Done', text: t('Done'), value: 'Done' },
      { key: 'Canceled', text: t('Canceled'), value: 'Canceled' },
      { key: 'On Hold', text: t('On Hold'), value: 'On Hold' },
      { key: 'Continous', text: t('Continous'), value: 'Continous' },      

    ]

    return _.uniqBy(list, 'key').map(unit => {
      return <Dropdown.Item
        key={unit.key}
        onClick={() => saveField(unit.value)}        
        text={unit.text}
      //floating
      />
    })

  }

  const renderDropDown = () => {
    if (props.pulse.archived === 'false') {      
      return (
        <div>
          <Dropdown
            text={t(props.pulse.status)}
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
                text={t('Archive')}
                onClick={() => { dispatch(editPulse(props.pulse.id, { archived: 'true' })) }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    }
    if (props.client.archived === 'true')
      return (
        <div
          data-position="bottom center"
          data-tooltip={t("Archived")}
          style={{ color: '#DC6969', textAlign: 'left', paddingLeft: '6.5px' }}>
          <i className=" archive icon" />
        </div>
      )
  }
  return <div>{renderDropDown()}</div>
}

export default StatusList
