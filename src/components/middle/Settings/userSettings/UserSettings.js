import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { format } from 'date-fns'
import { fetchLead, createLead, deleteLead } from '../../../../actions/settings'
import { editState } from '../../../../actions/appState'
import { fetchPulses } from '../../../../actions/pulses'
import { Item, Button } from 'semantic-ui-react'
import { useTranslation } from "react-i18next"
import LeadName from './leadName/LeadName'

function UserSettings() {

  const dispatch = useDispatch() 

  const user = useSelector(state => state.user.credentials);
  const lead = useSelector(state => state.lead);
  const pulses = useSelector(state => state.pulses);
  const { t } = useTranslation()
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    dispatch(editState('settings', 'id')) //selected board to appState    
    if (isEmpty(lead)) dispatch(fetchLead())
    if (isEmpty(pulses)) dispatch(fetchPulses())
  }, [])

  const handleCreateLead = () => {
    dispatch(createLead({ title: user.handle }, user.userId))
  }

  const handleDeleteLead = (id) => {
    dispatch(deleteLead(id))
  }  

  const renderCreateLeadButton = () => {
    const pulsesFiltered = _.filter(pulses, { userId: user.userId })
    const leadsFiltered = _.filter(lead, { userId: user.userId })

    if (leadsFiltered.length > 0 && pulsesFiltered.length === 0) return <Button negative onClick={() => handleDeleteLead(leadsFiltered[0].id)}>{t('Remove user from Lead Person List')}</Button>
    if (leadsFiltered.length > 0 && pulsesFiltered.length > 0) return <div
      style={{ width: '265px' }}
      onClick={() => {
        dispatch(editState(t('Remove all pulses with your UderId before proceed'), 'responseMessage'))
        dispatch(editState(666, 'responseStatus'))
      }}
    >
      <Button disabled >{t('Remove user from Lead Person List')}</Button></div>
    if (user.handle) return <Button onClick={() => handleCreateLead()}>{t('Add user to Lead Person List')}</Button>
    return <div></div>
  }

  const renderLeadName = () => {
    const leadsFiltered = _.filter(lead, { userId: user.userId })
    if (leadsFiltered.length > 0) return <LeadName userId={user.userId} lead={lead} />
    return <div>{user.handle}</div>
  }

  const renderMeta = () => {

    if (user.handle)
      return (
        <Item.Meta>
          <div style={{ display: 'inline-block' }}>
            <div className='settingsUserInfo'>{t('Mail')}: </div>
            <div className='settingsUserInfo'>{t('Created at')}: </div>
            <div className='settingsUserInfo'>{t('UserId')}: </div>
            <div className='settingsUserInfo'>{t('Lead name')}: </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <div className='settingsUserInfo'>{user.email}</div>
            <div className='settingsUserInfo'>{format(new Date(user.createdAt), 'dd/MM/yyyy | HH:mm:ss')}</div>
            <div className='settingsUserInfo'>{user.userId}</div>
            <div className='settingsUserInfo'>{renderLeadName()}</div>
          </div>
        </Item.Meta>
      )
    return (<div>{t('No user found')}..</div>)
  }

  const renderItem = () => {
    return (
      <Item.Group>        
        <Item>
          <Item.Image size='tiny' src='/images/no-image.png' />
          <Item.Content>
            <Item.Header>{user.handle}</Item.Header>
            {renderMeta()}
            <Item.Description></Item.Description>
            {renderCreateLeadButton()}
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }

  return (
    <div style={{ marginTop: '25px' }}>
      {renderItem()}
    </div>
  )
}


export default UserSettings