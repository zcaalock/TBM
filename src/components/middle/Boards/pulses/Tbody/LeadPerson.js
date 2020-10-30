import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { fetchLead } from '../../../../../actions/settings'
import { editPulse } from '../../../../../actions/pulses'
import DropDownMenu from '../../../../Forms/DropDownMenu'

function UserName(props) {

  const lead = useSelector(state => Object.values(state.lead))
  const privateId = useSelector(state => state.user.credentials.userId)

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
      dispatch(editPulse(props.pulse.id, { userId: leadPerson[0].userId }))
  }

  const findLeadPersonById = () => {
    const userId = props.pulse.userId
    const leadPerson = _.filter(lead, { userId: userId })
    if (leadPerson.length > 0)
      return leadPerson[0].title
  }

  const renderDropDown = () => {
    if (props.pulse.archived === 'false' && props.pulse.privateId !== privateId)
      return (
        <div>
          <DropDownMenu
            style={{zIndex: -10}}
            onSave={(title) => saveField(title)}
            id={props.pulse.id}
            values={lead}
            text={findLeadPersonById()} />
        </div>
      )
    if (props.pulse.archived === 'true')
      return (
        <div>
          {findLeadPersonById()}
        </div>
      )
    if (props.pulse.archived === 'false' && props.pulse.privateId === privateId)
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
