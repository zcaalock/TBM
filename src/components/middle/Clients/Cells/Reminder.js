import React from 'react'
import { useDispatch } from "react-redux";
import { editClient } from '../../../../actions/clients'
import { DateInput } from 'semantic-ui-calendar-react'
import DaysToDeadline from '../../../Forms/DaysToDeadline'
//import { useTranslation } from "react-i18next"

function Reminder(props) {
  
  const dispatch = useDispatch();
  //const { t } = useTranslation()
  const reminder = props.client.reminder
  const id = props.client.id  

  return (
    <div  >
      <DaysToDeadline deadline={reminder} item={reminder} />
      <DateInput
        style={{width: '130px'}}
        clearable
        closable
        name="date"
        placeholder="Date"
        value={reminder ? reminder : ''}
        iconPosition="left"
        onChange={(e, { value }) => { dispatch(editClient(id, { reminder: value })) }}
        dateFormat={'YYYY-MM-DD'}
      />
    </div>
  )
}

export default Reminder