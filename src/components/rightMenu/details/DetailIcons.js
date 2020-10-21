import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { deleteDetail, editDetail } from '../../../actions/details'
import { editState } from '../../../actions/appState'
import { Popup } from 'semantic-ui-react'
import { format } from 'date-fns'


function DetailIcon(props) {
  const userId = useSelector(state => state.user.credentials.userId)
  const dispatch = useDispatch();

  const handleOnClick = (id, bool) => {
    console.log(bool)
    if (bool === 'false' || !bool) {      
      dispatch(editDetail(id, { flag: 'true' }, userId, true))    }
    if (bool === 'true') {      
      dispatch(editDetail(id, { flag: 'false' }, userId, true))
    }
  }

  return (
    <div>
      <div
        onClick={() => { handleOnClick(props.detailId, props.detail.flag) }}
        className="hideDetailArrows"
        data-position="bottom center"
        data-tooltip="Flag detail"
        style={{
          display: 'inline-block',
          //paddingLeft: '0px',
          //color: '#DC6969',
          //color: props.detail.flag === 'true' ? '#DC6969' : '',
          cursor: 'pointer'
        }}>
        <i style={{color: props.detail.flag === 'true' ? '#DC6969' : ''}} className="flag icon" />
      </div>
      <Popup position='top right' style={{ display: 'inline-block' }} trigger={<i className="articleIcon info icon" />}>
        {/* <Popup.Header>User Rating</Popup.Header> */}
        <Popup.Content>
          Created by: {props.createdUser ? props.createdUser.title : 'no info'} <br />
              Edited by: {props.editedUser ? props.editedUser.title : 'no info'} <br />
              Edited at: {props.editedAt ? format(new Date(props.editedAt), 'dd/MM/yyyy | HH:mm:ss') : 'no info'}
        </Popup.Content>
      </Popup>
      <div
        onClick={() => { props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Edit"
        style={{
          display: 'inline-block',
          //paddingLeft: '0px',
          //paddingRight: '5px',
          cursor: 'pointer'
        }}>
        <i className=" edit icon" />
      </div>
      <div
        onClick={() => { dispatch(deleteDetail(props.detailId)) }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>
    </div>
  )
}

export default DetailIcon
