import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import PulseName from '../../../Boards/pulses/Tbody/PulseName'
import LeadPerson from '../../../Boards/pulses/Tbody/LeadPerson'
import Status from '../../../Boards/pulses/Tbody/Status'
import DetailProgrsBar from '../../../../Forms/DetailProgrsBar'
import Deadline from '../../../Boards/pulses/Tbody/Deadline'

function Tbody (props) {
  
  const pulses = useSelector(state => Object.values(state.pulses));
  const boards = useSelector(state => Object.values(state.boards));
  const categories = useSelector(state => Object.values(state.categories));  
  const details = useSelector(state => Object.values(state.details)); 
  const user = useSelector(state => state.user.credentials);
  const appState = useSelector(state => state.appState);  

  const dispatch = useDispatch();
  
  useEffect( () => {    
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))    
  },[])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/filters/${props.params.selector}/${props.params.item}/pulses/${id}`)
  }  

  const renderSelect = (pulseId) => {
    if (appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
  }

  //sorting collumns

  const handleFilterClick = (name) =>{
    //console.log(name)
    const sortBy = appState.sortBy
    if(name === 'title' && sortBy.name === 'createdAt') dispatch(editState({ name: 'title', direction: 'asc' }, 'sortBy'))
    if(name === 'deadline' && sortBy.name === 'createdAt') dispatch(editState({ name: 'deadline', direction: 'asc' }, 'sortBy'))
    if(sortBy.name === name && sortBy.direction === 'desc') dispatch(editState({ name: name, direction: 'asc' }, 'sortBy'))
    if(sortBy.name === name && sortBy.direction === 'asc') dispatch(editState({ name: name, direction: 'desc' }, 'sortBy'))
  }

  const renderRemoveSortIcon = (name) => {
    const sortBy = appState.sortBy
    if(sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={()=> dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))} style={{paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer'}}>x</label>
    // if(sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={()=> this.props.editState({ name: 'createdAt', direction: 'asc' }, 'sortBy')} style={{paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer'}}>x</label>  
  }

  const sortPulsesBy = (arr) => {
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
  }}

  const sortIconClass = (name) => {
    const sortBy = appState.sortBy
    if(name === 'title' && sortBy.name === 'createdAt')return 'articleIcon sort alphabet down icon'
    if(name === 'title' && sortBy.direction === 'asc' && sortBy.name === name)return 'articleIconSelected sort alphabet down icon'
    if(name === 'title' && sortBy.direction === 'desc' && sortBy.name === name)return 'articleIconSelected sort alphabet up icon'
    if(name === 'deadline' && sortBy.name === 'createdAt')return 'articleIcon sort numeric down icon'
    if(name === 'deadline' && sortBy.direction === 'asc' && sortBy.name === name)return 'articleIconSelected sort numeric down icon'
    if(name === 'deadline' && sortBy.direction === 'desc' && sortBy.name === name)return 'articleIconSelected sort numeric up icon'
  }

  //Calendar

  const renderPulses = () => {
    //console.log('selector: ', this.props.selector, this.props.item)   
    let pulsesCol = {}
    const showArchived = appState.showArchived 
    const hideEmptyDates = appState.hideEmptyDates
    const hidePrivate = appState.hidePrivate  
    
    if (showArchived === 'true') { 
      pulsesCol = _.filter(pulses, { [props.selector]: props.item })
      if (hideEmptyDates === 'true' && hidePrivate === 'true') { pulsesCol = _.chain(pulses).filter({ userId: appState.selectedUserId}).reject({deadline: ''}).reject({privateId: user.userId}).value() }
      if (hideEmptyDates === 'true' && hidePrivate === 'false') { pulsesCol = _.chain(pulses).filter({ userId: appState.selectedUserId}).reject({deadline: ''}).value() }
      if (hideEmptyDates === 'false' && hidePrivate === 'true') { pulsesCol = _.chain(pulses).filter({ userId: appState.selectedUserId}).reject({privateId: user.userId}).value() }
      
    }

    if (showArchived === 'false') { 
      pulsesCol = _.chain(pulses).filter({[props.selector]: props.item}).reject({archived: 'true' }).value() 
      //console.log('pulses: ', pulses)
      if (hideEmptyDates === 'true' && hidePrivate === 'true') { pulsesCol = _.chain(pulsesCol).filter({ userId: appState.selectedUserId}).reject({deadline: ''}).reject({privateId: user.userId}).value() }
      if (hideEmptyDates === 'true' && hidePrivate === 'false') { pulsesCol = _.chain(pulsesCol).filter({ userId: appState.selectedUserId}).reject({deadline: ''}).value() }
      if (hideEmptyDates === 'false' && hidePrivate === 'true') { pulsesCol = _.chain(pulsesCol).filter({ userId: appState.selectedUserId}).reject({privateId: user.userId}).value() } 
         
    }
      
    
    if (boards.length > 0 && pulses.length > 0 && categories.length > 0)
    pulsesCol = _.filter(pulsesCol, (pulse) => {
      return pulse.privateId === '' || pulse.privateId === user.userId;
  }); 
    return sortPulsesBy(pulsesCol).map(pulse => {
      
      let category = _.find(categories, { id: pulse.categoryId })
      let board = _.find(boards, { id: category.boardId })
      //console.log('pulse: ', pulse.archived)
      //console.log('sdfsf: ',category.title)
      return (
        <tr key={pulse.id} style={renderSelect(pulse.id)} className='tableRow' onClick={() => goLink(pulse.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name">
            <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} privateId={user.userId} />
          </td>
          <td >
            {board.title}
          </td>
          <td>
            {category.title}
          </td>
          <td data-label="LeadPerson" style={{ overflow: "visible", width: '10%' }}>
            <LeadPerson pulse={pulse} />
          </td>
          <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
            <Status pulse={pulse} />
          </td>
          <td >
            <Deadline pulse={pulse}/>
          </td>
          <td >
            <DetailProgrsBar key={pulse.id} details={details} pulse={pulse} />
            {/* {this.renderProgressBar(pulse.id)} */}
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
              <th style={{ paddingLeft: '10px', width: '30%' }}>Name <i onClick={()=>handleFilterClick('title')} className={sortIconClass('title')} style={{cursor: 'pointer'}}/>{renderRemoveSortIcon('title')}</th>
              <th style={{ minWidth: '15%' }}>Board </th>
              <th style={{ width: '10%' }}>Category</th>
              <th style={{ width: '10%' }}>Lead Person</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '10%' }}>Deadline <i onClick={()=>handleFilterClick('deadline')} className={sortIconClass('deadline')} style={{cursor: 'pointer'}}/>{renderRemoveSortIcon('deadline')}</th>
              <th style={{ width: '10%' }}>Details</th>              
            </tr>
          </thead>
          <tbody>
            {renderPulses()}
          </tbody>
        </table>
      </div>
    )  
}

export default Tbody