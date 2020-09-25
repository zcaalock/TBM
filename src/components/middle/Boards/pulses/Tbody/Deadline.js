import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { editPulse } from '../../../../../actions/pulses'
import Calendar from '../../../../Forms/Calendar'
import DaysToDeadline from './DaysToDeadline'


function Deadline(props) {

  const [date, setDate] = useState('');  
  const dispatch = useDispatch();

  useEffect(() => {
    setDate(props.pulse.deadline)
  }, [])

  const submitCalendar = (content) => {
    if (date !== content) setDate(content)
  }

  const updateDb = () => {
    dispatch(editPulse(props.pulse.id, { deadline: date }))
  }

  const renderIconStyle = (content) => {
    if (content !== date) return { color: '#00A569' }
    if (content === date) return { display: 'none' }
  }

  return (
    <div style={{ minWidth: '165px' }} >
      <div style={{ width: '130px' }}><DaysToDeadline deadline={props.pulse.deadline} pulse={props.pulse} /></div>
      <div style={{ display: 'inline-block', width: '145px', paddingRight: '15px' }} ><Calendar value={props.pulse.deadline} readData={submitCalendar} /></div>
      <div data-position="left center" data-tooltip="Save to database" onClick={() => updateDb()} style={{ display: 'inline-block' }} ><i className="save icon" style={renderIconStyle(props.pulse.deadline)} /></div>
    </div>
  )
}

export default Deadline