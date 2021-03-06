import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns'
import history from '../../../../../history'
import _ from 'lodash'

import { editState } from '../../../../../actions/appState'
import LeadPerson from '../../Cells/LeadPerson'
import ContactMail from '../../Cells/ContactMail'
import DropdownAdditions from '../../../../Forms/DropdownAdditions'
import { useTranslation } from "react-i18next"
import { editContact } from '../../../../../actions/contacts';


function Tbody(props) {

  const contacts = useSelector(state => Object.values(state.contacts));
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const leadUser = useSelector(state => _.find(state.lead, { userId: userId }))

  const dispatch = useDispatch();
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))
  }, [dispatch])

  const goLink = (id) => {
    dispatch(editState(id, 'pulseId'))
    history.push(`/contacts/contact/${id}`)
  }

  const renderSelect = (contact) => {
    if (appState.pulseId === contact.id) return { backgroundColor: '#F5F5F5' }
    if (contact.archived === 'true') return { color: '#80808061' }
  }

  //sorting collumns

  const handleFilterClick = (name) => {
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') dispatch(editState({ name: 'title', direction: 'asc' }, 'sortBy'))
    if (name === 'created' && sortBy.name === 'createdAt') dispatch(editState({ name: 'created', direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'desc') dispatch(editState({ name: name, direction: 'asc' }, 'sortBy'))
    if (sortBy.name === name && sortBy.direction === 'asc') dispatch(editState({ name: name, direction: 'desc' }, 'sortBy'))
  }

  const renderRemoveSortIcon = (name) => {
    const sortBy = appState.sortBy
    if (sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={() => dispatch(editState({ name: 'createdAt', direction: 'asc' }, 'sortBy'))} style={{ paddingLeft: '5px', color: '#DC6969', cursor: 'pointer' }}>x</label>

  }

  const sortContactsBy = (arr) => {
    var data = ''
    if (appState.sortBy.direction === 'asc') {
      data = _.sortBy(arr, [appState.sortBy.name])
      //onsole.log('sorted: ', data)
      return data
    }
    if (appState.sortBy.direction === 'desc') {
      data = _.sortBy(arr, [appState.sortBy.name]).reverse()
      //console.log('sorted: ', data)
      return data
    }
  }

  const sortIconClass = (name) => {
    const sortBy = appState.sortBy
    if (name === 'title' && sortBy.name === 'createdAt') return 'articleIcon sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort alphabet down icon'
    if (name === 'title' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort alphabet up icon'
    if (name === 'created' && sortBy.name === 'createdAt') return 'articleIcon sort numeric down icon'
    if (name === 'created' && sortBy.direction === 'asc' && sortBy.name === name) return 'articleIconSelected sort numeric down icon'
    if (name === 'created' && sortBy.direction === 'desc' && sortBy.name === name) return 'articleIconSelected sort numeric up icon'
  }

  // const checkShowCollumns = (name, content) => {
  //   if (appState.contactsSettings[name] === true) return content
  // }

  const renderArchivedIcon = (archived) => {
    if (archived === 'true')
      return (
        <div
          data-position="bottom center"
          data-tooltip="Archived"
          style={{ color: '#DC6969', display: 'inline-block' }}>
          <i className=" archive icon" />
        </div>
      )
  }

  const renderPrivateIcon = (privateId) => {
    if (privateId === userId)
      return (
        <div
          data-position="bottom center"
          data-tooltip="Private"
          style={{ color: 'rgb(0, 165, 105)', display: 'inline-block' }}>
          <i className=" privacy icon" />
        </div>
      )
  }

  const renderContacts = () => {

    let contactsCol = []
    contacts.map(item => {
      if (item.privateId === '') return contactsCol.push(item)
      return null
    })

    let constactsColPrivate = []

    contacts.map(item => {
      if (item.privateId === userId) return constactsColPrivate.push(item)
      return null
    })

    contactsCol = contactsCol.concat(constactsColPrivate)

    const showArchived = leadUser.settings.showArchived
    const showPrivate = appState.showPrivate

    if (showArchived === false) contactsCol = _.reject(contactsCol, { archived: 'true' })
    if (showPrivate === false) contactsCol = _.reject(contactsCol, { privateId: userId })

    return sortContactsBy(contactsCol).map(contact => {
      //console.log(_.includes(contact.title,'tes'))
      if (
        _.includes(contact.title.toLowerCase(), appState.contactSearch.toLowerCase()) === true
        || (contact.phone && _.includes(contact.phone, appState.contactSearch) === true)
        || (contact.mail && _.includes(contact.mail.toLowerCase(), appState.contactSearch.toLowerCase()) === true)
        || (contact.project && _.includes(contact.project.toLowerCase(), appState.contactSearch.toLowerCase()) === true)
        || (contact.company && _.includes(contact.company.toLowerCase(), appState.contactSearch.toLowerCase()) === true)
      ) return (
        <tr key={contact.id} style={renderSelect(contact)} className='tableRow' onClick={() => goLink(contact.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name" onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(contact.title, 'editFieldModalItem'))
            dispatch(editState(contact.id, 'editFieldModalId'))
            dispatch(editState('title', 'editFieldModalSelector'))
            dispatch(editState(editContact, 'editFieldModalFunction'))
            dispatch(editState(t('Title'), 'editFieldModalFieldTitle'))
          }}>
            {contact.title}
          </td>
          <td onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(contact.company, 'editFieldModalItem'))
            dispatch(editState(contact.id, 'editFieldModalId'))
            dispatch(editState('company', 'editFieldModalSelector'))
            dispatch(editState(editContact, 'editFieldModalFunction'))
            dispatch(editState(t('Company'), 'editFieldModalFieldTitle'))
          }}>
            {contact.company}
          </td>
          <td onDoubleClick={() => {
            dispatch(editState(true, 'editFieldModalOpen'))
            dispatch(editState(contact.phone, 'editFieldModalItem'))
            dispatch(editState(contact.id, 'editFieldModalId'))
            dispatch(editState('phone', 'editFieldModalSelector'))
            dispatch(editState(editContact, 'editFieldModalFunction'))
            dispatch(editState(t('Phone'), 'editFieldModalFieldTitle'))
          }}>
            {contact.phone}
          </td>
          <td>
            <ContactMail contact={contact} />
          </td>
          <td >
            <LeadPerson contact={contact} />
          </td>

          <td >
            <DropdownAdditions item={contact} items={contacts} selector='project' dispatch={editContact} />
          </td>
          <td >
            {format(new Date(contact.createdAt), 'yyyy/MM/dd')}
            <div style={{marginLeft: '5px', display: 'inline-block'}}>{renderArchivedIcon(contact.archived)}
            {renderPrivateIcon(contact.privateId)}</div>
          </td>
        </tr>
      )
      return null
    })
  }

  return (
    <div>

      <table className="ui very basic table" >
        <thead>
          <tr>
            <th style={{ paddingLeft: '10px' }}>{t('Title')}<i onClick={() => handleFilterClick('title')} className={sortIconClass('title')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('title')}</th>
            <th >{t('Company')} </th>
            <th >{t('Phone')} </th>
            <th>{t('Mail')}</th>
            <th >{t('Lead Person')}</th>
            <th >{t('Project')}</th>
            <th >{t('Date')} <i onClick={() => handleFilterClick('created')} className={sortIconClass('created')} style={{ cursor: 'pointer' }} />{renderRemoveSortIcon('created')}</th>
          </tr>
        </thead>
        <tbody>
          {renderContacts()}
        </tbody>
      </table>
    </div>
  )
}

export default Tbody