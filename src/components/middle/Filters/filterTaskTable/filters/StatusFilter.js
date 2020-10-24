import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import PulseName from '../../../Boards/pulses/Tbody/PulseName'
import LeadPerson from '../../../Boards/pulses/Tbody/LeadPerson'
import DetailProgrsBar from '../../../../Forms/DetailProgrsBar'
import Deadline from '../../../Boards/pulses/Tbody/Deadline'
import StatusList from '../../../Boards/pulses/Tbody/StatusList'

import { useTranslation } from "react-i18next"

function Tbody() {

  const pulses = useSelector(state => Object.values(state.pulses));
  const boards = useSelector(state => Object.values(state.boards));
  const lead = useSelector(state => Object.values(state.lead));
  const categories = useSelector(state => Object.values(state.categories));
  const details = useSelector(state => Object.values(state.details));
  const userId = useSelector(state => state.user.credentials.userId);
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))
  const appState = useSelector(state => state.appState);

  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))
  }, [])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/filters/pulse/${id}`)
  }

  const renderSelect = (pulseId) => {
    if (appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
  }

  const handleFilterClick = (name) => {
    //console.log(name)
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') dispatch(editState({ name: 'title', direction: 'asc' }, 'sortBy'))
    if (name === 'deadline' && sortBy.name === 'createdAt') dispatch(editState({ name: 'deadline', direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'desc') dispatch(editState({ name: name, direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'asc') dispatch(editState({ name: name, direction: 'desc' }, 'sortBy'))
  }

  const renderRemoveSortIcon = (name) => {
    const sortBy = appState.sortBy
    if (sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={() => dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))} style={{ paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer' }}>x</label>
  }

  const sortPulsesBy = (arr) => {
    var data = ''
    if (appState.sortBy.direction === 'asc') {
      data = _.sortBy(arr, [appState.sortBy.name])
      return data
    }
    if (appState.sortBy.direction === 'desc') {
      data = _.sortBy(arr, [appState.sortBy.name]).reverse()
      return data
    }
  }

  const sortIconClass = (name) => {
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') return 'articleIcon sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort alphabet up icon'
    if (name === 'deadline' && sortBy.name === 'createdAt') return 'articleIcon sort numeric down icon'
    if (name === 'deadline' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort numeric down icon'
    if (name === 'deadline' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort numeric up icon'
  }

  const renderPulses = () => {
    let pulsesCol = []
    pulses.map(item => {
      if (item.privateId === '') pulsesCol.push(item)
    })

    let pulseColPrivate = []

    pulses.map(item => {
      if (item.privateId === userId) pulseColPrivate.push(item)
    })

    pulsesCol = pulsesCol.concat(pulseColPrivate)

    const showArchived = leadUser.settings.showArchived
    const showPrivate = appState.showPrivate
    const showEmptyDates = appState.showEmptyDates
    const onlyPrivate = appState.filterSettings.onlyPrivate
    const onlyArchived = appState.filterSettings.onlyArchived
    const future = appState.filterSettings.Future
    const past = appState.filterSettings.Past

    if (showArchived === false) {
      pulsesCol = _.chain(pulsesCol).reject({ archived: 'true' }).value()
    }

    if (showPrivate === false) {
      pulsesCol = _.chain(pulsesCol).reject({ privateId: userId }).value()
    }

    if (showEmptyDates === false) {
      pulsesCol = _.chain(pulsesCol).reject({ deadline: '' }).value()
    }

    if (onlyPrivate === true) {
      pulsesCol = _.filter(pulsesCol, { privateId: userId })
    }

    if (onlyArchived === true) {
      pulsesCol = _.filter(pulsesCol, { archived: 'true' })
    }

    if (future !== '' && past !=='') {
      let newArr = []
      pulsesCol.map(p=>{
        if(new Date(p.deadline).getTime() < new Date(future).getTime() && new Date(p.deadline).getTime() > new Date(past).getTime()||p.deadline==='') newArr.push(p)
      })
      pulsesCol = newArr
    }

    if (future !== '' && past ==='') {
      let newArr = []
      pulsesCol.map(p=>{
        if(new Date(p.deadline).getTime() < new Date(future).getTime()||p.deadline==='') newArr.push(p)
      })
      pulsesCol = newArr
    }

    if (future === '' && past !=='') {
      let newArr = []
      pulsesCol.map(p=>{
        if(new Date(p.deadline).getTime() > new Date(past).getTime()||p.deadline==='') newArr.push(p)
      })
      pulsesCol = newArr
    }  

    return sortPulsesBy(pulsesCol).map(pulse => {
      let category = _.find(categories, { id: pulse.categoryId })
      let board = _.find(boards, { id: category.boardId })
      let leadCol = _.find(lead, { userId: pulse.userId })      

      if (
        (_.includes(pulse.title.toLowerCase(), appState.pulseSearch.toLowerCase()) === true && appState.filterSettings.searchTitle === true)
        || (_.includes(board.title.toLowerCase(), appState.pulseSearch.toLowerCase()) === true && appState.filterSettings.searchBoard === true)
        || (_.includes(category.title.toLowerCase(), appState.pulseSearch.toLowerCase()) === true && appState.filterSettings.searchCategory === true)
        || (pulse.userId && _.includes(leadCol.title.toLowerCase(), appState.pulseSearch.toLowerCase()) === true && appState.filterSettings.searchLead === true)
        || (_.includes(pulse.status.toLowerCase(), appState.pulseSearch.toLowerCase()) === true && appState.filterSettings.searchStatus === true)        

      )
      
        return (
          <tr key={pulse.id} style={renderSelect(pulse.id)} className='tableRow' onClick={() => goLink(pulse.id)}>
            <td data-label="Name" style={{ paddingLeft: '10px' }}>
              <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} privateId={userId} />
            </td>
            <td >
              {board.title}
            </td>
            <td>
              {category.title}
            </td>
            <td data-label="LeadPerson" style={{ overflow: "visible"}}>
              <LeadPerson pulse={pulse} />
            </td>
            <td data-label="Status" style={{ overflow: "visible" }}>
              <StatusList pulse={pulse} />
            </td>
            <td >
              <Deadline pulse={pulse} />
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
      <table className="ui very basic table">
        <thead>
          <tr>
            <th style={{ paddingLeft: '10px', width: '30%' }}>{t('Title')}<i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th style={{ minWidth: '15%' }}>{t('Board')}</th>
            <th style={{ width: '10%' }}>{t('Category')}</th>
            <th style={{ width: '10%' }}>{t('Lead Person')}</th>
            <th style={{ minWidth: '145px' }}>{t('Status')}</th>
            <th style={{ width: '10%' }}>{t('Deadline')} <i onClick={() => handleFilterClick('deadline')} className={sortIconClass('deadline')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('deadline')}</th>
            <th style={{ width: '10%' }}>{t('Details')}</th>
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