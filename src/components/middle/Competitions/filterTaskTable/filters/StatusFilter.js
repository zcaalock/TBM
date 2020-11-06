import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import history from '../../../../../history'
import _ from 'lodash'
import { editState } from '../../../../../actions/appState'
import { editCompetition } from '../../../../../actions/competitions'
import DropdownAdditions from '../../../../Forms/DropdownAdditions'
import EditCompetitionWeb from '../../Cells/EditCompetitionWeb'

import { useTranslation } from "react-i18next"

function Tbody(props) {

  const competitions = useSelector(state => Object.values(state.competitions));
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))
  }, [])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/competitions/competition/${id}`)
  }

  const renderSelect = (competition) => {
    if (appState.pulseId === competition.id) return { backgroundColor: '#F5F5F5' }
    if (competition.archived === 'true') return { color: '#80808061' }
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

  const sortCompetitionsBy = (arr) => {
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
    if (appState.competitionsSettings && appState.competitionsSettings[selector] === true) return item
  }

  const renderCompetitions = () => {

    let competitionsCol = []
    const showArchived = leadUser.settings ? leadUser.settings.showArchived : ''
    competitionsCol = competitions

    if (showArchived === false) competitionsCol = _.reject(competitionsCol, { archived: 'true' })

    return sortCompetitionsBy(competitionsCol).map(competition => {
      if (
        _.includes(competition.title.toLowerCase(), appState.competitionSearch.toLowerCase()) === true
        || _.includes(competition.phone, appState.competitionSearch) === true
        || _.includes(competition.project.toLowerCase(), appState.competitionSearch.toLowerCase()) === true
        || _.includes(competition.status.toLowerCase(), appState.competitionSearch.toLowerCase()) === true
      ) return (
        <tr key={competition.id} style={renderSelect(competition)} className='tableRow' onClick={() => goLink(competition.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name" onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(competition.title, 'editFieldModalItem'))
            dispatch(editState(competition.id, 'editFieldModalId'))
            dispatch(editState('title', 'editFieldModalSelector'))
            dispatch(editState(editCompetition, 'editFieldModalFunction'))
            dispatch(editState(t('Title'), 'editFieldModalFieldTitle'))
          }}>
            {competition.title}
          </td>
          <td onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(competition.phone, 'editFieldModalItem'))
            dispatch(editState(competition.id, 'editFieldModalId'))
            dispatch(editState('phone', 'editFieldModalSelector'))
            dispatch(editState(editCompetition, 'editFieldModalFunction'))
            dispatch(editState(t('Phone'), 'editFieldModalFieldTitle'))
          }}>
            {competition.phone}
          </td>
          <EditCompetitionWeb
            competition={competition}
          />
          {filterSettings('showProject', <td ><DropdownAdditions item={competition} items={competitions} selector='project' dispatch={editCompetition} /></td>)}
          <td ><DropdownAdditions item={competition} items={competitions} selector='status' dispatch={editCompetition} /></td>
        </tr>
      )
    })
  }

  return (
    <div>
      <table className="ui very basic table">
        <thead>
          <tr >
            <th style={{paddingLeft: '10px' }}>{t('Title')}<i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th style={{ minWidth: '106px' }}>{t('Phone')} </th>
            <th >{t('Web page')} </th>
            {filterSettings('showProject', <th >{t('Project')}</th>)}
            <th >{t('Status')}</th>
          </tr>
        </thead>
        <tbody>
          {renderCompetitions()}
        </tbody>
      </table>
    </div>
  )
}

export default Tbody