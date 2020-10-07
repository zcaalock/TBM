import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { editClient } from '../../../../actions/clients'


function ArchiveClient(props) {

  const clients = useSelector(state => Object.values(state.clients))
  
  const dispatch = useDispatch()

  const renderArchive = () => {
    const findClient = _.filter(Object.assign(clients, clients), { id: props.clientId })
    const isArchived = findClient[0].archived

    if (isArchived === 'true') {
      return (
        <div
          onClick={() => dispatch(editClient(props.clientId, { archived: 'false' }))}
          data-position="left center"
          data-tooltip="unarchive client"
          style={{ display: 'inline-block', color: '#DC6969', cursor: 'pointer' }}>
          <i className=" archive icon" /> archived
        </div>
      )
    } else return (
      <div
        onClick={() => dispatch(editClient(props.clientId, { archived: 'true' }))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Archive"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>
    )
  }

  return (
    <>
      {renderArchive()}
    </>
  )
}

export default ArchiveClient
