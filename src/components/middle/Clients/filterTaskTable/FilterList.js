import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Icon, Checkbox, Input, Label, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import { editState } from '../../../../actions/appState'
import { fetchClients } from '../../../../actions/clients';

let col = []
let colSplited = []
function SearchFilter(props) {  
  const lead = useSelector(state => Object.values(state.lead));
  const clients = useSelector(state => Object.values(state.clients))  
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
    if (isEmpty(clients)) dispatch(fetchClients())
    makeCollection()
  }, [])

  const makeCollection = () => {

    if (lead.length > 0 && clients.length > 0) {
      lead.map(lead => {
        col.push({ title: lead.title, description: 'LeadPerson', link: lead.userId, id: lead.id })
        return col
      })

      clients.map(client => {

        col.push({
          title: client.title,
          description: `Project: ${client.project}`,
          link: client.project,
          id: client.id,
        })
        return col
      })

      col.push({ title: 'Archived', description: 'ArchivedClients', link: 'true', id: 'Archived' })
      col = _.uniqBy(col, 'title')
      colSplited = []
      col.map(col => {
        return colSplited.push({ title: col.title.split('/')[0], id: col.id, link: col.link, description: col.description })
      })

      //console.log('col: ', col)

    }
    //console.log('col: ',col)
    //console.log('re: ',colSplited)

  }

  

  

  const defaulCheck = (bool) => {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  const handleOnCheckBoxClick = (bool, selector) => {
    //console.log('props: ', selector)
    if (bool === 'false') {
      dispatch(editState('true', selector))
    }
    if (bool === 'true') {
      dispatch(editState('false', selector))
    }
  }

  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === 'true')
      return 'archivedColorRed'
    if (selector === 'false')
      return 'archivedColor'
  }

  const dropDownSelectable = (name, selector) => {
    return <Dropdown.Item
      style={{ zIndex: 10 }}
      onClick={(event) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        dispatch(editState({ ...appState.clientsSettings, [selector]: !appState.clientsSettings[selector] }, 'clientsSettings'))
      }}
    >
      <Checkbox
        label={name}
        checked={appState.clientsSettings[selector]}
        style={{ zIndex: -1 }}
      />
    </Dropdown.Item>
  }
  //console.log('state: ', this.state)
  if (isEmpty(colSplited)) makeCollection()
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <Input icon placeholder='Search...'>
          <Label className='mouseHoverBlack' basic style={{ fontSize: '1.1rem', color: '#cecece', cursor: 'pointer' }} onClick={() => dispatch(editState('', 'clientSearch'))}>x</Label>
          <input value={appState.clientSearch} onChange={(v) => { dispatch(editState(v.target.value, 'clientSearch')) }} style={{ borderRadius: '0 25px 25px 0' }} />
          <Icon name='search' />
        </Input>
      </div >
      <Dropdown
        style={{ marginLeft: '15px' }}
        text='Collumns'
        icon='filter'
        floating
        labeled
        button
        className='icon'
      >
        <Dropdown.Menu
          onClick={(event) => {
            event.stopPropagation()
            event.nativeEvent.stopImmediatePropagation()
          }}
        >
          <Dropdown.Header icon='tags' content='Choose collumns' />
          <Dropdown.Divider />
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Name'
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Phone'
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Mail'
            />
          </Dropdown.Item>
          {dropDownSelectable('Lead Person', 'showLead')}
          {/* {dropDownSelectable('Project', 'showProject')} */}
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Project'
            />
          </Dropdown.Item>
          {dropDownSelectable('Unit', 'showUnit')}
          {dropDownSelectable('Price', 'showPrice')}
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Date'
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Status'
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => handleOnCheckBoxClick(appState.showArchived, 'showArchived')}
          checked={defaulCheck(appState.showArchived)}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => handleOnCheckBoxClick(appState.showArchived, 'showArchived')} className={renderCheckBoxLabelStyle(appState.showArchived)} >Show archived</label>
      </div>
    </div>
  )
}

export default SearchFilter
