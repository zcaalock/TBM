import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {editLead} from '../../../actions/settings'
import _ from 'lodash'
import { Checkbox } from 'semantic-ui-react'

function AppSettings() {
  
  const userId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => _.find(state.lead, {userId:userId}))
  const dispatch = useDispatch()

  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === true)
      return 'archivedColorRed'
    if (selector === false)
      return 'archivedColor'
  }

  const renderSettings = () => {
    if(lead) return (
      <>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}></div>
      <h4>Aplication settings:</h4>
      <div style={{ marginBottom: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editLead(lead.id, { settings: {...lead.settings, notifications: !lead.settings.notifications} }))}
          checked={lead.settings.notifications}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editLead(lead.id, { settings: {...lead.settings, notifications: !lead.settings.notifications} }))} className={renderCheckBoxLabelStyle(lead.settings.notifications)} >Show notifications</label>
      </div>
      <div style={{ margimarginBottomnLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editLead(lead.id, { settings: {...lead.settings, messages: !lead.settings.messages} }))}
          checked={lead.settings.messages}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editLead(lead.id, { settings: {...lead.settings, messages: !lead.settings.messages} }))} className={renderCheckBoxLabelStyle(lead.settings.messages)} >Show messages from server</label>
      </div>
    </>
    )
  }

  return (
    <>{renderSettings()}</>
  )
}

export default AppSettings