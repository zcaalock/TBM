import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Icon, Checkbox, Input, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { editState } from '../../../../actions/appState'
import { editLead } from '../../../../actions/settings'
import { useTranslation } from "react-i18next"
import DropdownColumnFilter from '../../../Forms/dropdownColumFilterClients'

function SearchFilter(props) {  
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();
  const { t } = useTranslation()  

  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === true)
      return 'archivedColorRed'
    if (selector === false)
      return 'archivedColor'
  }
   
  return (
    <div>
      
      <div style={{ display: 'inline-block' }}>

        <Input icon placeholder={`${t('Search')}...`}>
        <DropdownColumnFilter />
          <Label className='mouseHoverBlack' basic style={{ fontSize: '1.1rem', color: '#cecece', cursor: 'pointer' }} onClick={() => dispatch(editState('', 'clientSearch'))}>x</Label>
          <input value={appState.clientSearch} onChange={(v) => { dispatch(editState(v.target.value, 'clientSearch')) }} style={{ borderRadius: '0 25px 25px 0' }} />
          <Icon name='search' />
        </Input>
      </div >      
      <div style={{ marginBottom: '10px', display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: !leadUser.settings.showArchived } }))}
          checked={leadUser.settings.showArchived}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: !leadUser.settings.showArchived } }))} className={renderCheckBoxLabelStyle(leadUser.settings.showArchived)} >{t('Show archived')}</label>
      </div>
      <div style={{ marginBottom: '10px', display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editState({ ...appState.clientsSettings, onlyPromising: !appState.clientsSettings.onlyPromising }, 'clientsSettings'))}
          checked={appState.clientsSettings.onlyPromising}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editState({ ...appState.clientsSettings, onlyPromising: !appState.clientsSettings.onlyPromising }, 'clientsSettings'))} className={renderCheckBoxLabelStyle(appState.clientsSettings.onlyPromising)} >{t('Only promising')}</label>
      </div>
    </div>
  )
}

export default SearchFilter
