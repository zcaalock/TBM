import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchStatus } from '../../../../../actions/status'
import { editPulse } from '../../../../../actions/pulses'
import DropDownMenu from '../../../../Forms/DropDownMenu'

function UserName(props) {

  const status = useSelector(state => Object.values(state.status))

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(status)) dispatch(fetchStatus())
  }, [])

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const saveField = (title) => {
    dispatch(editPulse(props.pulse.id, { status: title }))
  }

  if (props.pulse.archived === 'false')
    return (
      <div>
        <DropDownMenu
          onSave={(title) => saveField(title)}
          id={props.pulse.id}
          values={status}
          text={props.pulse.status} />
      </div>
    )
  if (props.pulse.archived === 'true')
    return (
      <div>
        {props.pulse.status}
      </div>
    )
}

export default UserName
