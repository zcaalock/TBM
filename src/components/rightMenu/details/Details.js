import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { editDetail, fetchDetail } from '../../../actions/details'
import { editPulse } from '../../../actions/pulses'
import DetailIcons from './DetailIcons'
import EditDetailName from './EditDetailName'

function Details(props) {
  const [state, defState] = useState({});  
  const dispatch = useDispatch();
  const details = useSelector(state => Object.values(state.details));  
  const userId = useSelector(state => state.user.credentials.userId);
  const detailArr = []

  const removeEdit = (id) => {
    defState({ [`itemEditable${id}`]: false })
  }

  const showEdit = (id) => {
    defState({ [`itemEditable${id}`]: true })
  }

  const renderCrossOut = (bool) => {
    if (bool === 'true') {
      return { textDecoration: 'line-through' }
    }
    return {}
  }

  const handleOnClick = (id, bool) => {
    if (bool === 'false') {
      dispatch(editPulse(props.pulseId, { readed: [userId] }))
      dispatch(editDetail(id, { check: 'true', editedId: userId }))
    }
    if (bool === 'true') {
      dispatch(editPulse(props.pulseId, { readed: [userId] }))
      dispatch(editDetail(id, { check: 'false', editedId: userId }))
    }
  }

  const defaulCheck = (bool) => {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  const moveUp = (id, created) => {
    // dispatch(editDetail(_.find()))
    //const current = detailArr[_.find(detailArr, { id: id }).number]
    const prev = _.find(detailArr, { number: detailArr[_.find(detailArr, { id: id }).number].number - 1 })    
    if (prev) dispatch(editDetail(id, { createdAt: prev.createdAt }, userId, true))    
    if (prev) dispatch(editDetail(prev.id, { createdAt: created }, userId, true))
  }

  const moveDown = (id, created) => {    
    const next = _.find(detailArr, { number: detailArr[_.find(detailArr, { id: id }).number].number + 1 })    
    if (next) dispatch(editDetail(id, { createdAt: next.createdAt }, userId, true))    
    if (next) dispatch(editDetail(next.id, { createdAt: created }, userId, true))
  }

  const renderDetails = () => {
    const id = props.pulseId
    const detailsFiltered = _.filter(details, { pulseId: id })
    //console.log(_.sortBy(detailsFiltered, 'createdAt'))
    //console.log(detailsFiltered)

    return _.sortBy(detailsFiltered, 'createdAt').map(detail => {
      detailArr.push({ number: detailArr.length, id: detail.id, createdAt: detail.createdAt })

      return (
        <Table.Row key={detail.id}>
          <Table.Cell style={{ width: '25px' }}>
            <Checkbox
              onClick={() => handleOnClick(detail.id, detail.check)}
              defaultChecked={defaulCheck(detail.check)}
              style={{ marginBottom: '-4px' }} />
          </Table.Cell>
          <Table.Cell>
            <div className="blackHover" style={renderCrossOut(detail.check)}>
              <EditDetailName
                title={detail.title}
                detail={detail}
                pulseId={props.pulseId}
                userId={userId}
                editState={state}
                showEdit={() => showEdit(detail.id)}
                removeEdit={() => removeEdit(detail.id)} />
            </div>
          </Table.Cell>
          <Table.Cell style={{
            width: '52px'
          }}>
            <DetailIcons detailArr={detailArr} moveUp={() => moveUp(detail.id, detail.createdAt)} moveDown={() => moveDown(detail.id, detail.createdAt)} showEdit={() => showEdit(detail.id)} detailId={detail.id} detailTitle={detail.title} />
          </Table.Cell>
        </Table.Row>
      )
    })
  }
  //console.log(detailArr)
  return (
    <div className='ui vertical text menu' style={{ minHeight: '0', width: '100%', paddingLeft: '10px' }}>
      <Table basic='very' >
        <Table.Body>
          {renderDetails()}
        </Table.Body>
      </Table>
    </div>
  )

}


export default Details