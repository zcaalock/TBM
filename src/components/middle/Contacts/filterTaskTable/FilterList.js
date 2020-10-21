import React, { useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Icon, Checkbox, Input, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { editState } from '../../../../actions/appState'
import { fetchContacts } from '../../../../actions/contacts'
import { editLead } from '../../../../actions/settings'
import { useTranslation } from "react-i18next"


function SearchFilter(props) {
  const contacts = useSelector(state => Object.values(state.contacts))
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    if (isEmpty(contacts)) dispatch(fetchContacts())    
  }, [])  

  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === true)
      return 'archivedColorRed'
    if (selector === false)
      return 'archivedColor'
  }

  const renderPrivateCheckBox = () => {
    if (appState.selectedUserId === userId) return (
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editState(!appState.showPrivate, 'showPrivate'))}
          checked={appState.showPrivate}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editState(!appState.showPrivate, 'showPrivate'))} className={renderCheckBoxLabelStyle(appState.showPrivate)} >{t('Show private')}</label>
      </div>
    )
  }

   
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <Input icon placeholder={`${t('Search')}...`}>
          <Label className='mouseHoverBlack' basic style={{ fontSize: '1.1rem', color: '#cecece', cursor: 'pointer' }} onClick={() => dispatch(editState('', 'contactSearch'))}>x</Label>
          <input value={appState.contactSearch} onChange={(v) => { dispatch(editState(v.target.value, 'contactSearch')) }} style={{ borderRadius: '0 25px 25px 0' }} />
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
      {renderPrivateCheckBox()}
    </div>
  )
}

export default SearchFilter
