import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { fetchLead } from '../../../../actions/settings'
import { editClient } from '../../../../actions/clients'
import DropDownMenu from '../../../Forms/DropDownMenu'

function UserName(props) {

  const lead = useSelector(state => Object.values(state.lead))
  //console.log('lead: ', lead)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(lead)) dispatch(fetchLead())
  })

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const saveField = (title) => {
    const leadPerson = _.filter(lead, { title: title })
    if (leadPerson[0].userId)
      dispatch(editClient(props.client.id, { userId: leadPerson[0].userId }))
  }

  const findLeadPersonById = () => {
    const userId = props.client.userId
    const leadPerson = _.filter(lead, { userId: userId })
    if (leadPerson.length > 0)
      return leadPerson[0].title
  }

  const renderDropDown = () => {
    if (props.client.archived === 'false')
      return (
        <div>
          <DropDownMenu
            onSave={(title) => saveField(title)}
            id={props.client.id}
            values={lead}
            text={findLeadPersonById()} />
        </div>
      )
    if (props.client.archived === 'true')
      return (
        <div>
          {findLeadPersonById()}
        </div>
      )
  }
  return (
    <div>{renderDropDown()}</div>
  )
}

export default UserName
