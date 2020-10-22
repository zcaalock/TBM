import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Input, Label, Icon, Checkbox, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

import { editState } from '../../../../actions/appState'
import { fetchStatus } from '../../../../actions/status'
import { fetchPulses } from '../../../../actions/pulses'
import { editLead } from '../../../../actions/settings'
import { fetchCategories } from '../../../../actions/categories'
import { fetchBoards } from '../../../../actions/boards'
import { fetchLead } from '../../../../actions/settings'
import { fetchDetails } from '../../../../actions/details'

import { useTranslation } from "react-i18next"

function SearchFilter(props) {
  const { t } = useTranslation()
  const userId = useSelector(state => state.user.credentials.userId);
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))
  const appState = useSelector(state => state.appState);

  const dispatch = useDispatch();

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    if (isEmpty(props.boards)) dispatch(fetchBoards())
    if (isEmpty(props.status)) dispatch(fetchStatus())
    if (isEmpty(props.pulses)) dispatch(fetchPulses())
    if (isEmpty(props.details)) dispatch(fetchDetails())
    if (isEmpty(props.lead)) dispatch(fetchLead())
    if (isEmpty(props.categories)) dispatch(fetchCategories())
    dispatch(editState(leadUser.title, 'pulseSearch'))

    dispatch(editState(userId, 'selectedUserId'))
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

  const renderDropdownFilter = () => {
    return (
      <Dropdown
        style={{
          //marginLeft: '15px', 
          color: '#cecece',
          border: '1px solid rgba(34,36,38,.15)',
          borderRadius: '5px',
          padding: '.5833em .833em',
          margin: '0 .14285714em'
        }}
        compact
        className='mouseHoverBlack'
        icon='filter'
        floating
      //className='icon'
      >
        <Dropdown.Menu
          onClick={(event) => {
            event.stopPropagation()
            event.nativeEvent.stopImmediatePropagation()
          }}
        >
          <Dropdown.Header icon='tags' content={`${t("Search in")}:`} />
          <Dropdown.Divider />
          {dropDownSelectable(t('Title'), 'searchTitle')}
          {dropDownSelectable(t('Board'), 'searchBoard')}
          {dropDownSelectable(t('Category'), 'searchCategory')}
          {dropDownSelectable(t('Lead'), 'searchLead')}
          {dropDownSelectable('Status', 'searchStatus')}
          <Dropdown.Divider />
          {dropDownSelectable(t('Only archived'), 'onlyArchived')}
          {dropDownSelectable(t('Only private'), 'onlyPrivate')}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const dropDownSelectable = (name, selector) => {
    return <Dropdown.Item
      style={{ zIndex: 10 }}
      onClick={(event) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        dispatch(editState({ ...appState.filterSettings, [selector]: !appState.filterSettings[selector] }, 'filterSettings'))
        if (selector === 'onlyPrivate' && appState.filterSettings.onlyPrivate === false) dispatch(editState(true, 'showPrivate'))
        if (selector === 'onlyArchived' && leadUser.settings.showArchived === false) dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: true } }))
      }}
    >
      <Checkbox
        label={name}

        checked={appState.filterSettings[selector]}
        style={{ zIndex: -1, color: 'red !important' }}
      />
    </Dropdown.Item>
  }
  //console.log('debug: ', leadUser.title)
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <Input icon placeholder={`${t('Search')}...`}>
          {renderDropdownFilter()}
          <Label className='mouseHoverBlack' basic style={{ fontSize: '1.1rem', color: '#cecece', cursor: 'pointer' }} onClick={() => dispatch(editState('', 'pulseSearch'))}>x</Label>
          <input 
          value={appState.pulseSearch} 
          initlialvalue={leadUser?leadUser.title:''} 
          onChange={(v) => { dispatch(editState(v.target.value, 'pulseSearch')) }} 
          style={{ borderRadius: '0 25px 25px 0' }} />
          <Icon name='search' />
        </Input>
      </div >

      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: !leadUser.settings.showArchived } }))}
          checked={leadUser.settings.showArchived}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() =>
          dispatch(editLead(leadUser.id, { settings: { ...leadUser.settings, showArchived: !leadUser.settings.showArchived } }))} className={renderCheckBoxLabelStyle(leadUser.settings.showArchived)} >{t('Show archived')}</label>
      </div>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => dispatch(editState(!appState.showEmptyDates, 'showEmptyDates'))}
          checked={appState.showEmptyDates}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => dispatch(editState(!appState.showEmptyDates, 'showEmptyDates'))} className={renderCheckBoxLabelStyle(appState.showEmptyDates)} >{t('Show empty dates')}</label>
      </div>
      {renderPrivateCheckBox()}
    </div>
  )
}


export default SearchFilter
