import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Search, Checkbox, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

import history from '../../../../history'
import { editState } from '../../../../actions/appState'
import { fetchClients } from '../../../../actions/clients';


let col = []
let colSplited = []


function SearchFilter(props) {

  const [isLoading, setisLoading] = useState(false);
  const [results, setresults] = useState([]);
  const [value, setvalue] = useState('');

  const lead = useSelector(state => Object.values(state.lead));
  const clients = useSelector(state => Object.values(state.clients))
  const user = useSelector(state => state.user);
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

  const handleOnClick = (link, description, title) => {
    if (results[0])
      if (description === 'ArchivedClients') {
        dispatch(editState('true', 'showArchived'))
        dispatch(editState(link, 'selectedUserId'))
        dispatch(editState({ selector: description, value: title.split('/')[0] }, 'filter'))
        history.push(`/clients/${description.split(':')[0]}/${link}`)
      }
      else history.push(`/clients/${description.split(':')[0]}/${link}`)
    dispatch(editState({ selector: description.split(':')[0], value: title.split('/')[0] }, 'filter'))
    dispatch(editState(link, 'selectedUserId'))
  }

  const handleResultSelect = (e, { result }) => {
    setvalue(result.title.split('/')[0]); handleOnClick(result.link, result.description, result.title.split('/')[0])
  }

  const handleSearchChange = (e, { value }) => {
    setisLoading(true)
    setvalue(value)
    setTimeout(() => {
      if (value.length < 1) {
        setisLoading(false);
        setresults([]);
        setvalue('');
      }

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.title)

      const results = _.filter(colSplited, isMatch).map(result => ({ ...result, key: result.id }));

      setisLoading(false);
      setresults(results);
    }, 300)
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
      if (value === "Archived" && selector === 'showArchived') {
        dispatch(editState({ selector: 'ArchivedClients', value: 'true' }, 'filter'))
        history.push(`/clients/ArchivedClients/true`)
      }
    }
    if (bool === 'true') {
      dispatch(editState('false', selector))
      if (value === "Archived" && selector === 'showArchived') {
        dispatch(editState({ selector: 'AllActiveClients', value: 'true' }, 'filter'))
        //console.log('go ')
        history.push(`/clients/ArchivedClients/false`)
      }
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
    style={{zIndex: 10}}
    onClick={(event) => {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
      dispatch(editState({ ...appState.clientsSettings, [selector]: !appState.clientsSettings[selector] }, 'clientsSettings'))
    }}
  >
    <Checkbox
      label={name}
      checked={appState.clientsSettings[selector]}          
      style={{zIndex: -1}}
    />
  </Dropdown.Item>
  }
  //console.log('state: ', this.state)
  if (isEmpty(colSplited)) makeCollection()
  //const { isLoading, value, results } = this.state
  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
        //{...this.props}
        />
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
          {dropDownSelectable('Uniet', 'showUnit')}
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
