import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { createPulse, createPrivatePulse } from '../../../../../actions/pulses'
import SingleInput from '../../../../Forms/SingleInput'
import { useTranslation } from "react-i18next"

function AddPulse(props) {
  const boards = useSelector(state => _.keyBy(Object.values(state.boards), 'id'))
  const userId = useSelector(state => state.user.credentials.userId)

  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

  const dispatch = useDispatch()
  const { t } = useTranslation()
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
          data-tooltip={t("Create pulse")}>
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    if (boards[props.boardId].privateId === '') dispatch(createPulse(formValues, props.categoryId, userId))
    if (boards[props.boardId].privateId === userId) dispatch(createPrivatePulse(formValues, props.categoryId, userId))
    removeEdit()
  }

  const renderName = () => {
    if (boards[props.boardId].privateId === '')
      return <div>{renderNewPulse(t("Create pulse"))}</div>
    if (boards[props.boardId].privateId === userId)
      return <div>{renderNewPulse(t('New Private Pulse'))}</div>
  }

  const renderNewPulse = (name) => {
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
        <div style={{ width: '100%', paddingBottom: '15px' }}
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => showEdit()}>
          <div style={{ display: 'inline-block' }}>{showHover()}</div>
          <div style={{ display: 'inline-block' }}>{name}</div>
        </div>
      )
    }
  }

  return (
    <tfoot>
      <tr  >
        <td className="tableNewPulse" style={{ paddingLeft: '10px', cursor: 'pointer' }} data-label="Name">
          {/* {this.renderNewPulse()} */}
          {renderName()}
        </td>
        <td colSpan="2">
        </td>
      </tr>
    </tfoot>
  )
}

export default AddPulse