import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import { createPulse } from '../../../../../actions/pulses'
import SingleInput from '../../../../Forms/SingleInput'

function AddPulse() {

  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

  const dispatch = useDispatch()

  const removeEdit = () => {
    setItemEditable(false)
  }

  const showEdit = () => {
    setItemEditable(true)
  }

  const hideIcon = () => {
    setIsHovering(false)
  }

  const showIcon = () => {
    setIsHovering(true)
  }

  const showHover = () => {
    if (isHovering === true) {
      return (
        <div
          data-position="bottom center"
          data-tooltip="Create pulse">
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    dispatch(createPulse(formValues, ''))
    removeEdit()
  }

  const renderNewPulse = () => {
    if (itemEditable === true) {
      return (
        <div style={{ width: '100%' }}>
          <SingleInput
            propStyle={{}}
            propChildStyle={{ padding: '5px' }}
            removeEdit={() => removeEdit()}
            onSubmit={onSubmit} />
        </div>
      )
    }

    if (itemEditable === false) {
      return (
        <div style={{ width: '100%' }}
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => showEdit()}>
          <div style={{ display: 'inline-block' }}>{showHover()}</div>
          <div style={{ display: 'inline-block' }}>New</div>
        </div>
      )
    }
  }

  return (
    <tfoot>
      <tr  >
        <td className="tableNewPulse" style={{ paddingLeft: '10px', cursor: 'pointer' }} data-label="Name">
          {renderNewPulse()}
        </td>
        <td colSpan="2">
        </td>
      </tr>
    </tfoot>
  )
}

export default AddPulse