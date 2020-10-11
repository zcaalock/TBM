import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { editContact } from '../../../../actions/contacts'


function ArchiveContact(props) {

  const contacts = useSelector(state => Object.values(state.contacts))
  
  const dispatch = useDispatch()

  const renderArchive = () => {
    const findContact = _.filter(Object.assign(contacts, contacts), { id: props.contactId })
    const isArchived = findContact[0].archived

    if (isArchived === 'true') {
      return (
        <div
          onClick={() => dispatch(editContact(props.contactId, { archived: 'false' }))}
          data-position="left center"
          data-tooltip="unarchive contact"
          style={{ display: 'inline-block', color: '#DC6969', cursor: 'pointer' }}>
          <i className=" archive icon" /> archived
        </div>
      )
    } else return (
      <div
        onClick={() => dispatch(editContact(props.contactId, { archived: 'true' }))}
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

export default ArchiveContact
