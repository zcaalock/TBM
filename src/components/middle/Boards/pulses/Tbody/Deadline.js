import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { editPulse } from '../../../../../actions/pulses'
import Calendar from '../../../../Forms/Calendar'
import DaysToDeadline from './DaysToDeadline'
import { useTranslation } from "react-i18next"

function Deadline(props) {

  const [date, setDate] = useState(props.pulse.deadline);  
  const dispatch = useDispatch()
  const { t } = useTranslation()  

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
      <div data-position="left center" data-tooltip={t("Save")} onClick={() => updateDb()} style={{ display: 'inline-block' }} ><i className="save icon" style={renderIconStyle(props.pulse.deadline)} /></div>
    </div>
  )
}

export default Deadline