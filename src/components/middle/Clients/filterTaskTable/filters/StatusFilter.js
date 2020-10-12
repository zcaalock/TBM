import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns'
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import LeadPerson from '../../Cells/LeadPerson'
import ClientName from '../../Cells/ClientName';
import ClientNumber from '../../Cells/ClientNumber'
import ClientMail from '../../Cells/ClientMail'
import ClientPrice from '../../Cells/ClientPrice'
import ProjectList from '../../Cells/ProjectList'
import UnitList from '../../Cells/UnitList'
import StatusList from '../../Cells/StatusList'

import DropdownColumnFilter from '../../../../Forms/dropdownColumFilter'

function Tbody(props) {

  const clients = useSelector(state => Object.values(state.clients));
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))
  }, [])

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
    if (sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={() => dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))} style={{ paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer' }}>x</label>
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

  const checkShowCollumns = (name, content) => {
    if (appState.clientsSettings[name] === true) return content
  }

  const renderClients = () => {
     
    let clientsCol = []
    const showArchived = leadUser.settings.showArchived

    clientsCol = clients  

    if (showArchived === false) clientsCol = _.reject(clientsCol,{ archived: 'true' })    

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
          <td style={{ paddingLeft: '10px' }} data-label="Name">
            <ClientName clientId={client.id} clientName={client.title} client={client} />
          </td>
          <td >
            <ClientNumber clientId={client.id} clientName={client.phone} client={client} />
          </td>
          <td>
            <ClientMail clientId={client.id} clientName={client.phone} client={client} />
          </td>
          {checkShowCollumns(
            'showLead',
            <td data-label="LeadPerson" style={{ overflow: "visible" }}>
              <LeadPerson client={client} />
            </td>
          )}
          <td data-label="Project" style={{ overflow: "visible" }}>
            <ProjectList client={client} />
          </td>
          {checkShowCollumns(
            'showUnit',
            <td data-label="Unit" style={{ overflow: "visible" }}>
              <UnitList client={client} />
            </td>
          )}
          {checkShowCollumns(
            'showPrice',
            <td data-label="Price" style={{ overflow: "visible" }}>
              <ClientPrice clientId={client.id} clientName={client.price} client={client} />
            </td>
          )}
          <td >
            {format(new Date(client.createdAt), 'yyyy/MM/dd')}
          </td>
          <td data-label="Status" style={{ overflow: "visible", paddingLeft: '0px', textAlign: 'center' }}>
            {/* <i className="bullseye icon" style={{ color: client.status }} /> */}
            <StatusList client={client} />
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <DropdownColumnFilter/>
      <table className="ui very basic table">
        <thead>
          <tr>
            <th style={{ minWidth: '10%', paddingLeft: '10px' }}>Name <i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th style={{ minWidth: '10%' }}>Phone </th>
            <th style={{ minWidth: '10%' }}>Mail</th>
            {checkShowCollumns('showLead', <th style={{ minWidth: '10%' }}>Lead Person</th>)}
            <th style={{ minWidth: '10%' }}>Project</th>
            {checkShowCollumns('showUnit', <th style={{ minWidth: '10%' }}>Unit</th>)}
            {checkShowCollumns('showPrice', <th style={{ minWidth: '10%' }}>Price</th>)}
            <th style={{ minWidth: '10%' }}>Date <i onClick={() => handleFilterClick('created')} className={sortIconClass('created')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('created')}</th>
            <th style={{ paddingLeft: '0px', minWidth: '10%' }}>Status</th>
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