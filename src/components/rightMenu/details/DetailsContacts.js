import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { editDetail } from '../../../actions/details'
import DetailIconsContact from './DetailIconsContact'
import EditDetailNameContact from './EditDetailNameContact'
import { editContact } from '../../../actions/contacts';

function DetailsContacts(props) {
  const [state, defState] = useState({});
  const dispatch = useDispatch();
  const details = useSelector(state => Object.values(state.details));
  const userId = useSelector(state => state.user.credentials.userId);
  
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
      dispatch(editDetail(id, { check: 'true' }))
      dispatch(editContact(props.contactId, { readed: [userId] }))
    }
    if (bool === 'true') {
      dispatch(editDetail(id, { check: 'false' }))
      dispatch(editContact(props.contactId, { readed: [userId] }))
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

    return detailsFiltered.map(detail => {
      //key={detail.id} basic='very'
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
            width: '52px' 
            }}>
            <DetailIconsContact showEdit={() => showEdit(detail.id)} detailId={detail.id} detailTitle={detail.title}  />
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


export default DetailsContacts