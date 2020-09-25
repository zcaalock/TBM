import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Search, Checkbox } from 'semantic-ui-react'
import _ from 'lodash'

import history from '../../../../history'
import { editState } from '../../../../actions/appState'
import { fetchStatus } from '../../../../actions/status'
import { fetchPulses } from '../../../../actions/pulses'
import { fetchCategories } from '../../../../actions/categories'
import { fetchBoards } from '../../../../actions/boards'
import { fetchLead } from '../../../../actions/settings'
import { fetchDetails } from '../../../../actions/details'


let col = []
let colSplited = []


function SearchFilter(props) {

  const [isLoading, setisLoading] = useState(false);
  const [results, setresults] = useState([]);
  const [value, setvalue] = useState('');

  const lead = useSelector(state => Object.values(state.lead));
  const status = useSelector(state => Object.values(state.status));
  const pulses = useSelector(state => Object.values(state.pulses));
  const boards = useSelector(state => Object.values(state.boards));
  const categories = useSelector(state => Object.values(state.categories));  
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
    if (isEmpty(props.boards)) dispatch(fetchBoards())
    if (isEmpty(props.status)) dispatch(fetchStatus())
    if (isEmpty(props.pulses)) dispatch(fetchPulses())
    if (isEmpty(props.details)) dispatch(fetchDetails())
    if (isEmpty(props.lead)) dispatch(fetchLead())
    if (isEmpty(props.categories)) dispatch(fetchCategories())
    makeCollection()
    dispatch(editState(user.credentials.userId, 'selectedUserId'))
  }, [])

  const makeCollection = () => {

    if (status.length > 0 && lead.length > 0 && pulses.length > 0 && categories.length > 0) {
      status.map(status => {
        col.push({ title: status.title, description: 'Status', link: status.title, id: status.id, privateId: '' })
        return col
      })
      lead.map(lead => {
        col.push({ title: lead.title, description: 'LeadPerson', link: lead.userId, id: lead.id, privateId: '' })
        return col
      })

      pulses.map(pulse => {

        col.push({
          title: `${_.keyBy(categories, 'id')[pulse.categoryId].title}/${_.filter(boards, { id: _.keyBy(categories, 'id')[pulse.categoryId].boardId })[0].title}`,
          description: `Category: ${_.filter(boards, { id: _.keyBy(categories, 'id')[pulse.categoryId].boardId })[0].title}`,
          link: pulse.categoryId,
          id: pulse.id,
          privateId: pulse.privateId
          //category: _.filter(this.props.boards, {id: _.keyBy(this.props.categories, 'id')[pulse.categoryId].boardId})[0].title 
        })
        col = _.filter(col, { privateId: '' })
        return col
      })

      col.push({ title: 'Archived', description: 'ArchivedPulses', link: 'true', id: 'Archived', privateId: '' })
      col.push({ title: 'Private', description: 'PrivatePulses', link: user.credentials.userId, id: '', privateId: user.credentials.userId })
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
      if (description === 'ArchivedPulses') {
        dispatch(editState('true', 'showArchived'))
        dispatch(editState(link, 'selectedUserId'))
        dispatch(editState({ selector: description, value: title.split('/')[0] }, 'filter'))
        history.push(`/filters/${description.split(':')[0]}/${link}`)
      }
      else history.push(`/filters/${description.split(':')[0]}/${link}`)
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
        dispatch(editState({ selector: 'ArchivedPulses', value: 'true' }, 'filter'))
        history.push(`/filters/ArchivedPulses/true`)
      }
    }
    if (bool === 'true') {
      dispatch(editState('false', selector))
      if (value === "Archived" && selector === 'showArchived') {
        dispatch(editState({ selector: 'AllActivePulses', value: 'true' }, 'filter'))
        //console.log('go ')
        history.push(`/filters/ArchivedPulses/false`)
      }
    }
  }

  const renderCheckBoxLabelStyle = (selector) => {
    if (selector === 'true')
      return 'archivedColorRed'
    if (selector === 'false')
      return 'archivedColor'
  }

  const renderPrivateCheckBox = () => {
    if (appState.selectedUserId === user.credentials.userId) return (
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => handleOnCheckBoxClick(appState.hidePrivate, 'hidePrivate')}
          checked={defaulCheck(appState.hidePrivate)}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => handleOnCheckBoxClick(appState.hidePrivate, 'hidePrivate')} className={renderCheckBoxLabelStyle(appState.hidePrivate)} >Hide private pulses</label>
      </div>
    )
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
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => handleOnCheckBoxClick(appState.showArchived, 'showArchived')}
          checked={defaulCheck(appState.showArchived)}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => handleOnCheckBoxClick(appState.showArchived, 'showArchived')} className={renderCheckBoxLabelStyle(appState.showArchived)} >Show archived</label>
      </div>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => handleOnCheckBoxClick(appState.hideEmptyDates, 'hideEmptyDates')}
          checked={defaulCheck(appState.hideEmptyDates)}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => handleOnCheckBoxClick(appState.hideEmptyDates, 'hideEmptyDates')} className={renderCheckBoxLabelStyle(appState.hideEmptyDates)} >Hide empty dates</label>
      </div>
      {renderPrivateCheckBox()}
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <Checkbox
          onClick={() => handleOnCheckBoxClick(appState.showNotifications, 'showNotifications')}
          checked={defaulCheck(appState.showNotifications)}
          slider
          style={{ marginBottom: '-4px', }}
        />
        <label onClick={() => handleOnCheckBoxClick(appState.showNotifications, 'showNotifications')} className={renderCheckBoxLabelStyle(appState.showNotifications)} >Show Notifications</label>
      </div>
    </div>
  )

}


export default SearchFilter
