import React from 'react'
import { useDispatch } from "react-redux";
import { editClient } from '../../../../actions/clients'
import { DateInput } from 'semantic-ui-calendar-react'
import { useTranslation } from "react-i18next"

function FilingDate(props) {
  
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const filingDate = props.client.filingDate
  const id = props.client.id  

  return (
    <div >      
      <DateInput
        style={{width: '130px'}}
        clearable
        closable
        name="date"
        placeholder="Date"
        value={filingDate ? filingDate : ''}
        iconPosition="left"
        onChange={(e, { value }) => { dispatch(editClient(id, { filingDate: value })) }}
        dateFormat={'YYYY-MM-DD'}
      />
    </div>
  )
}

export default FilingDate