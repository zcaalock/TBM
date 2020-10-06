import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import LeadPerson from '../../Cells/LeadPerson'
import ClientName from '../../Cells/ClientName';
import ClientNumber from '../../Cells/ClientNumber'
import ClientMail from '../../Cells/ClientMail'
import ProjectList from '../../Cells/ProjectList'

function Tbody(props) {

  const clients = useSelector(state => Object.values(state.clients));
  const details = useSelector(state => Object.values(state.details));
  const user = useSelector(state => state.user.credentials);
  const appState = useSelector(state => state.appState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))
  }, [])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/clients/${props.params.selector}/${props.params.item}/clients/${id}`)
  }

  const renderSelect = (pulseId) => {
    if (appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
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

  //Calendar

  const renderClients = () => {
    //console.log('selector: ', this.props.selector, this.props.item)   
    let clientsCol = {}
    const showArchived = appState.showArchived

    if (showArchived === 'true') {
      clientsCol = clients    

    }

    if (showArchived === 'false') {
      //clientsCol = _.chain(clients).filter({ [props.selector]: props.item }).reject({ archived: 'true' }).value()  
      clientsCol = _.chain(clients).reject({ archived: 'true' }).value()  

    }

  
    return sortClientsBy(clientsCol).map(client => {    
       
      return (
        <tr key={client.id} style={renderSelect(client.id)} className='tableRow' onClick={() => goLink(client.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name">
          <ClientName clientId={client.id} clientName={client.title} client={client}/>
          </td>
          <td >
          <ClientNumber clientId={client.id} clientName={client.phone} client={client}/>
          </td>
          <td>
          <ClientMail clientId={client.id} clientName={client.phone} client={client}/> 
          </td>
          <td data-label="LeadPerson" style={{ overflow: "visible", width: '10%' }}>
            <LeadPerson client={client} />
          </td>
          <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
          <ProjectList client={client} />
          </td>
          <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
            {client.status}
          </td>
          <td >
            {client.createdAt}
          </td>          
        </tr>
      )
    })
  }

  return (
    <div>
      <table className="ui very basic table" style={{ paddingLeft: '15px' }}>
        <thead>
          <tr>
            <th style={{ paddingLeft: '10px', width: '30%' }}>Name <i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th style={{ minWidth: '15%' }}>Phone </th>
            <th style={{ width: '10%' }}>Mail</th>
            <th style={{ width: '10%' }}>Lead Person</th>
            <th style={{ width: '120px' }}>Project</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%' }}>Date <i onClick={() => handleFilterClick('created')} className={sortIconClass('created')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('created')}</th>
            
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