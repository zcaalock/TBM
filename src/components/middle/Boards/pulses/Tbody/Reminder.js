import React, { useState, useEffect } from 'react'
import _, { map } from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../../../../actions/appState'
import { isEmpty } from '../../../../../actions/helperFunctions'
import differenceInDays from 'date-fns/differenceInBusinessDays'
import differenceInHours from 'date-fns/differenceInHours'
import parseISO from 'date-fns/parseISO'
import { Link } from 'react-router-dom'

function Reminder(props) {

  const user = useSelector(state => state.user.credentials)
  const appState = useSelector(state => state.appState)
  const pulses = useSelector(state => Object.values(state.pulses))
  const boards = useSelector(state => state.boards)
  const categories = useSelector(state => state.categories)
  const reminderArr = []
  const dispatch = useDispatch()

  if (isEmpty(reminderArr)) makeCollection()
  function makeCollection() {
    pulses.map(pulse => {
      const days = differenceInDays(parseISO(pulse.deadline), new Date())
      const hours = differenceInHours(parseISO(pulse.deadline), new Date())
      const renderDifs = (x) => {
        if (x < -1) return `${days} d`
        if (1 > x && x >= -1) return `${hours + 24} h` 
        if (x >= 1) return `${days} d`
      }
      if (
        pulse.userId === user.userId &&
        pulse.deadline.length > 0 &&
        pulse.archived === 'false'
        && days < appState.reminderSettings.futureDays
        && days >= appState.reminderSettings.pastDays
        //&& hours > -96
      ) reminderArr.push({ id: pulse.id, name: pulse.title, date: pulse.deadline, difference: renderDifs(days), categoryId: pulse.categoryId, privateId: pulse.privateId, color: days<0?'#DC6969':'' })
    })
  }
  console.log(appState.reminderSettings.futureDays)
  const renderPrivateIcon = (arr) => {

    if (arr.privateId === user.userId) return <div style={{ position: 'absolute', color: '#00A569', left: '-17px', fontSize: 'smaller' }}><i className=" privacy icon" /></div>
  }

  const renderReminders = (arr) => {
    const sorted = _.sortBy(arr, 'date')
    return sorted.map(item => {
      return (
        <Link
          data-position="right center"
          data-tooltip={`"${_.find(categories, { id: item.categoryId }).title}" w "${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).title}" | data: ${item.date}`}
          onClick={() => {
            dispatch(editState('', 'pulseId'))
            dispatch(editState(item.categoryId, 'expandCategory'))
            dispatch(editState(item.id, 'pulseId'))
            //dispatch(editState(item.name, 'id'))
          }}
          to={`/boards/${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).id}/pulses/${item.id}`}
          className={`item ${selectedCheck(item.id)}`}
          key={item.name}
          style={selectedStyle(item.id)}>
          {renderPrivateIcon(item)}
          <div style={{ width: '140px' }}>{item.name}</div>
          <div style={{ position: 'absolute', right: '0px', color: item.color }}>{item.difference}</div>
        </Link>

      )
    })
  }

  const selectedCheck = (id) => {
    if (id === appState.id) {
      return 'active'
    }
    return ''
  }
  const selectedStyle = (id) => {
    if (id === appState.id)
      return { backgroundColor: '#E9E9E9', paddingLeft: '0', justifyContent: 'space-between' }
    return { paddingLeft: '0', justifyContent: 'space-between' }
  }




  //console.log(reminderArr)
  return (
    <>
      {renderReminders(reminderArr)}
    </>
  )
}

export default Reminder



