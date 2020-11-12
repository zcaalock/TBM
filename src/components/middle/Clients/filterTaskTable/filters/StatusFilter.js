import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import { editClient } from '../../../../../actions/clients'
import LeadPerson from '../../Cells/LeadPerson'
import ClientMail from '../../Cells/ClientMail'
import DropdownAdditions from '../../../../Forms/DropdownAdditions'
import StatusList from '../../Cells/StatusList'
import ClientReminder from '../../Cells/Reminder'
import ClientFilingDate from '../../Cells/FilingDate'

import { useTranslation } from "react-i18next"

function Tbody(props) {

  const clients = useSelector(state => Object.values(state.clients));
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(editState({ name: 'filingDate', direction: 'asc' }, 'sortBy'))
  }, [dispatch])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/clients/client/${id}`)
  }

  const renderSelect = (client) => {
    if (appState.pulseId === client.id) return { backgroundColor: '#F5F5F5' }
    if (client.archived === 'true') return { color: '#80808061' }
  }

  //sorting collumns

  const handleFilterClick = (name) => {
    //console.log(name)
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') dispatch(editState({ name: 'title', direction: 'asc' }, 'sortBy'))
    if (name === 'created' && sortBy.name === 'createdAt') dispatch(editState({ name: 'created', direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'desc') dispatch(editState({ name: name, direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'asc') dispatch(editState({ name: name, direction: 'desc' }, 'sortBy'))
  }

  const renderRemoveSortIcon = (name) => {
    const sortBy = appState.sortBy
    if (sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={() => dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))} style={{ paddingLeft: '5px', color: '#DC6969', cursor: 'pointer' }}>x</label>
    // if(sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={()=> this.props.editState({ name: 'createdAt', direction: 'asc' }, 'sortBy')} style={{paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer'}}>x</label>  
  }

  const sortClientsBy = (arr) => {
    var data = ''
    if (appState.sortBy.direction === 'asc') {
      data = _.sortBy(arr, [appState.sortBy.name])
      //onsole.log('sorted: ', data)
      return data
    }
    if (appState.sortBy.direction === 'desc') {
      data = _.sortBy(arr, [appState.sortBy.name]).reverse()
      //console.log('sorted: ', data)
      return data
    }
  }

  const sortIconClass = (name) => {
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') return 'articleIcon sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort alphabet up icon'
    if (name === 'created' && sortBy.name === 'createdAt') return 'articleIcon sort numeric down icon'
    if (name === 'created' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort numeric down icon'
    if (name === 'created' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort numeric up icon'
  }

  function filterSettings(selector, item) {
    if (appState.clientsSettings[selector] === true) return item
  }

  const renderClients = () => {

    let clientsCol = []
    const showArchived = leadUser.settings ? leadUser.settings.showArchived : ''
    const onlyPromising = appState.clientsSettings.onlyPromising ? appState.clientsSettings.onlyPromising : false
    clientsCol = clients

    if (showArchived === false) clientsCol = _.reject(clientsCol, { archived: 'true' })
    if (onlyPromising === true) clientsCol = _.filter(clientsCol, { status: '#00A569' })


    return sortClientsBy(clientsCol).map(client => {
      if (
        _.includes(client.title.toLowerCase(), appState.clientSearch.toLowerCase()) === true
        || _.includes(client.phone, appState.clientSearch) === true
        || _.includes(client.mail.toLowerCase(), appState.clientSearch.toLowerCase()) === true
        || _.includes(client.project.toLowerCase(), appState.clientSearch.toLowerCase()) === true
        || _.includes(client.unit.toLowerCase(), appState.clientSearch.toLowerCase()) === true
        || _.includes(client.status.toLowerCase(), appState.clientSearch.toLowerCase()) === true
      ) return (
        <tr key={client.id} style={renderSelect(client)} className='tableRow' onClick={() => goLink(client.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name" onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(client.title, 'editFieldModalItem'))
            dispatch(editState(client.id, 'editFieldModalId'))
            dispatch(editState('title', 'editFieldModalSelector'))
            dispatch(editState(editClient, 'editFieldModalFunction'))
            dispatch(editState(t('Title'), 'editFieldModalFieldTitle'))
          }}>
            {client.title}
          </td>
          <td onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(client.phone, 'editFieldModalItem'))
            dispatch(editState(client.id, 'editFieldModalId'))
            dispatch(editState('phone', 'editFieldModalSelector'))
            dispatch(editState(editClient, 'editFieldModalFunction'))
            dispatch(editState(t('Phone'), 'editFieldModalFieldTitle'))
          }}>
            {client.phone}
          </td>
          <td>
            <ClientMail client={client} />
          </td>

          {filterSettings('showLead', <td><LeadPerson client={client} /></td>)}

          <td >
            <DropdownAdditions item={client} items={clients} selector='project' dispatch={editClient} />
          </td>
          {filterSettings('showUnit', <td ><DropdownAdditions item={client} items={clients} selector='unit' dispatch={editClient} /></td>)}
          {filterSettings('showPrice', <td onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(client.price, 'editFieldModalItem'))
            dispatch(editState(client.id, 'editFieldModalId'))
            dispatch(editState('price', 'editFieldModalSelector'))
            dispatch(editState(editClient, 'editFieldModalFunction'))
            dispatch(editState(t('Price'), 'editFieldModalFieldTitle'))
          }}>{client.price}</td>)}
          {filterSettings('showReminder', <td ><ClientReminder client={client} /></td>)}
          {filterSettings('showFilingDate', <td ><ClientFilingDate client={client} /></td>)}
          <td data-label="Status" style={{ overflow: "visible", paddingLeft: '0px' }}>
            <StatusList client={client} />
          </td>
        </tr>
      )
      return null
    })
  }

  return (
    <div>

      <table className="ui very basic table">
        <thead>
          <tr >
            <th style={{ paddingLeft: '10px' }}>{t('Title')}<i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th style={{ minWidth: '106px' }}>{t('Phone')} </th>
            <th style={{ minWidth: '65px' }}>{t('Mail')}</th>
            {filterSettings('showLead', <th >{t('Lead Person')}</th>)}
            <th >{t('Project')}</th>
            {filterSettings('showUnit', <th >{t('Unit')}</th>)}
            {filterSettings('showPrice', <th >{t('Price')}</th>)}
            {filterSettings('showReminder', <th >{t('Reminder')} <i onClick={() => handleFilterClick('created')} className={sortIconClass('created')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('created')}</th>)}
            {filterSettings('showFilingDate', <th >{t('Filing Date')}</th>)}
            <th style={{ paddingLeft: '0px' }}>{t('Status')}</th>
          </tr>
        </thead>
        <tbody>
          {renderClients()}
        </tbody>
      </table>
    </div>
  )
}

export default Tbody