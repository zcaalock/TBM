import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { editDetail } from '../../../actions/details'
import { editContact } from '../../../actions/contacts'
import DetailMenuContact from './DetailMenuContact'
import EditDetailNameContact from './EditDetailNameContact'

function Details(props) {
  const [state, defState] = useState({});
  const dispatch = useDispatch();
  const details = useSelector(state => Object.values(state.details))
  const lead = useSelector(state => state.lead)
  const userId = useSelector(state => state.user.credentials.userId)
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
      dispatch(editContact(props.contactId, { readed: [userId] }))
      dispatch(editDetail(id, { check: 'true' }, userId, true))
    }
    if (bool === 'true') {
      dispatch(editContact(props.contactId, { readed: [userId] }))
      dispatch(editDetail(id, { check: 'false' }, userId, true))
    }
  }

  const defaulCheck = (bool) => {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  const renderDetails = () => {
    const id = props.contactId
    const detailsFiltered = _.filter(details, { pulseId: id })    

    return _.sortBy(detailsFiltered, 'createdAt').map(detail => {
      detailArr.push({ number: detailArr.length, id: detail.id, createdAt: detail.createdAt })
      const createdUser = _.find(lead, { userId: detail.userId })
      const editedUser = _.find(lead, { userId: detail.editedId })
      return (
        <Table.Row key={detail.id}>
          <Table.Cell style={{ width: '25px' }}>
            <Checkbox
              onClick={() => handleOnClick(detail.id, detail.check)}
              defaultChecked={defaulCheck(detail.check)}
              style={{ marginBottom: '-4px' }} />
          </Table.Cell>
          <Table.Cell>
            <div
              className="blackHover"
              style={renderCrossOut(detail.check)}
            >
              <EditDetailNameContact
                title={detail.title}
                detail={detail}
                contactId={props.contactId}
                userId={userId}
                editState={state}
                showEdit={() => showEdit(detail.id)}
                removeEdit={() => removeEdit(detail.id)} />
            </div>
          </Table.Cell>
          <Table.Cell style={{
            width: '92px'
          }}>
            <DetailMenuContact detail={detail} showEdit={() => showEdit(detail.id)} contactId={detail.id} editedAt={detail.editedAt} detailTitle={detail.title} createdUser={createdUser} editedUser={editedUser} detailArr={detailArr} />
          </Table.Cell>
        </Table.Row>
      )
    })
  }

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