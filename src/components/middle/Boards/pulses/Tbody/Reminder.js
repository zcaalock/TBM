import React from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../../../../actions/appState'
import { isEmpty } from '../../../../../actions/helperFunctions'
import differenceInDays from 'date-fns/differenceInBusinessDays'
import differenceInHours from 'date-fns/differenceInHours'
import parseISO from 'date-fns/parseISO'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
function Reminder(props) {

  const user = useSelector(state => state.user.credentials)
  const appState = useSelector(state => state.appState)
  const pulses = useSelector(state => Object.values(state.pulses))
  const boards = useSelector(state => state.boards)
  const details = useSelector(state => state.details)
  const categories = useSelector(state => state.categories)
  const reminderArr = []
  const continousArr = []
  const dispatch = useDispatch()

  if (isEmpty(reminderArr)) makeCollection()
  if (isEmpty(continousArr) && appState.reminderSettings.showContinous === true) makeContinousColection()
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
      ) return reminderArr.push({ id: pulse.id, name: pulse.title, date: pulse.deadline, difference: renderDifs(days), categoryId: pulse.categoryId, privateId: pulse.privateId, color: days < 0 ? '#DC6969' : '', status: pulse.status === 'Done' ? 'line-through' : '' })
      return
    })
    return
  }
  const renderIcon = (arr) => {
    let findFlag = _.filter(details, { pulseId: arr.id, flag: 'true' })//.map(a=>{return `${a.title}, `})
    let flagArr = []
    if (findFlag.length > 0) findFlag.map(a => { return flagArr.push(`${a.title}t | `) })

    if (arr.privateId === user.userId) return <div style={{ position: 'absolute', color: '#00A569', left: '-17px', fontSize: 'smaller' }}><i className=" privacy icon" /></div>
    if (_.find(details, { pulseId: arr.id, flag: 'true' })) return <div data-position="right center" data-tooltip={flagArr} style={{ position: 'absolute', color: 'rgb(220, 105, 105)', left: '-17px', fontSize: 'smaller' }}><i className=" flag icon" /></div>
    // return <Popup style={{ zIndex: 9999999 }}  position='right center' trigger={<i style={{ position: 'absolute', color: 'rgb(220, 105, 105)', left: '-17px', fontSize: 'smaller', zIndex:100  }} className=" flag icon" />}>
    //   <Popup.Content >
    //     test
    //   </Popup.Content>
    // </Popup>
  }

  function makeContinousColection() {
    pulses.map(pulse => {
      if (
        pulse.userId === user.userId &&
        pulse.status === 'Continous' &&
        pulse.archived === 'false'
      ) return continousArr.push({ id: pulse.id, name: pulse.title, date: pulse.deadline, categoryId: pulse.categoryId, privateId: pulse.privateId, status: pulse.status === 'Done' ? 'line-through' : '' })
    })
  }

  const renderReminders = (arr) => {
    const sorted = _.sortBy(arr, 'date')
    return sorted.map(item => {
      return (
        <Link
          onClick={() => {
            dispatch(editState('', 'pulseId'))
            dispatch(editState(item.categoryId, 'expandCategory'))
            dispatch(editState(item.id, 'pulseId'))
          }}
          to={`/boards/${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).id}/pulses/${item.id}`}
          className={`item ${selectedCheck(item.id)}`}
          key={item.name}
          style={selectedStyle(item.id)}>
          {renderIcon(item)}
          <div
            data-position="right center"
            data-tooltip={`"${_.find(categories, { id: item.categoryId }).title}" w "${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).title}" | data: ${item.date}`}
            style={{ width: '140px', textDecoration: item.status }}>{item.name}</div>
          <div style={{ position: 'absolute', right: '0px', color: item.color, textDecoration: item.status }}>{item.difference}</div>
        </Link>

      )
    })
  }

  const renderContinous = (arr) => {
    const sorted = _.sortBy(arr, 'name')
    if (appState.reminderSettings.showContinous === true) return (
      <>
        {sorted.map(item => {
          return (
            <Link
              onClick={() => {
                dispatch(editState('', 'pulseId'))
                dispatch(editState(item.categoryId, 'expandCategory'))
                dispatch(editState(item.id, 'pulseId'))
              }}
              to={`/boards/${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).id}/pulses/${item.id}`}
              className={`item ${selectedCheck(item.id)}`}
              key={item.name}
              style={selectedStyle(item.id)}>
              {renderIcon(item)}
              <div
                data-position="right center"
                data-tooltip={`"${_.find(categories, { id: item.categoryId }).title}" w "${_.find(boards, { id: _.find(categories, { id: item.categoryId }).boardId }).title}" | data: ${item.date}`}
                style={{ width: '140px', textDecoration: item.status }}>{item.name}</div>
              <div style={{ position: 'absolute', right: '0px', color: item.color, textDecoration: item.status }}>∞</div>
            </Link>
          )
        })}
        <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}></div>
      </>
    )
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

  return (
    <>
      {renderContinous(continousArr)}
      {renderReminders(reminderArr)}
    </>
  )
}

export default Reminder



