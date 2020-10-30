import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { editLead } from '../../../actions/settings'
import _ from 'lodash'
import { Checkbox, Button } from 'semantic-ui-react'
import {fetchClients} from '../../../actions/clients'
import { useTranslation } from "react-i18next"
function AppSettings() {

  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === true)
      return 'archivedColorRed'
    if (selector === false)
      return 'archivedColor'
  }

  const renderDebugButton = () => {
    if (userId === 'dF1vMA4hN0Pc7Fo4V1SXXDPuGmr1') return (
      <div>
        <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}></div>
        <h4>Debug:</h4>
        <Button
        onClick={()=>dispatch(fetchClients())}
        >test</Button>
      </div>
    )
    return <div></div>
  }

  const renderSettings = () => {
    if (leadUser) return (
      <>
        <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}></div>
        <h4>{t('Aplication settings')}:</h4>
        <div style={{ marginBottom: '10px' }}>
          <Checkbox
            onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: !leadUser.settings.showArchived } }))}
            checked={leadUser.settings.showArchived}
            slider
            style={{ marginBottom: '-4px', }}
          />
          <label onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchiveind: !leadUser.settgs.showArchived } }))} className={renderCheckBoxLabelStyle(leadUser.settings.showArchived)} >{t('Show archived')}</label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Checkbox
            onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, notifications: !leadUser.settings.notifications } }))}
            checked={leadUser.settings.notifications}
            slider
            style={{ marginBottom: '-4px', }}
          />
          <label onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, notifications: !leadUser.settings.notifications } }))} className={renderCheckBoxLabelStyle(leadUser.settings.notifications)} >{t('Show notifications')}</label>
        </div>
        <div style={{ margimarginBottomnLeft: '10px' }}>
          <Checkbox
            onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, messages: !leadUser.settings.messages } }))}
            checked={leadUser.settings.messages}
            slider
            style={{ marginBottom: '-4px', }}
          />
          <label onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, messages: !leadUser.settings.messages } }))} className={renderCheckBoxLabelStyle(leadUser.settings.messages)} >{t('Show messages from server')}</label>
        </div>
        {renderDebugButton()}
      </>
    )
  }

  return (
    <>{renderSettings()}</>
  )
}

export default AppSettings