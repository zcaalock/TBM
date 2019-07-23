import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchLead, createLead, deleteLead } from '../../../../actions/settings'
import { fetchPulses } from '../../../../actions/pulses'
import { Item, Button } from 'semantic-ui-react'

import LeadName from './leadName/LeadName'

class UserSettings extends React.Component {

  componentDidMount() {
    this.props.fetchLead()
    this.props.fetchPulses()
  }

  handleCreateLead() {

    this.props.createLead({ title: this.props.user.userInitials }, this.props.user.userId)
  }

  handleDeleteLead(id) {
    //console.log('del id: ', id)
    this.props.deleteLead(id)
  }

  renderCreateLeadButton() {
    const pulses = _.filter(this.props.pulses, { userId: this.props.user.userId })
    const leads = _.filter(this.props.lead, { userId: this.props.user.userId })
    //console.log('user pulses: ', pulses, leads)
    if (leads.length > 0 && pulses.length === 0) return <Button negative onClick={() => this.handleDeleteLead(leads[0].id)}>Remove user from Lead Person List</Button>
    if (leads.length > 0 && pulses.length > 0) return <div data-position="bottom left" data-tooltip="Remove your initials from pulses" ><Button disabled >Remove user from Lead Person List</Button></div>

    return <Button onClick={() => this.handleCreateLead()}>Add user to Lead Person List</Button>
  }

  uploadImage = (event) => {
    console.log('event: ', event)
    event.preventDefault();

  }

  renderItem() {
    return (
      <Item.Group>
        <Item>
          <Item.Image size='tiny' src='/images/no-image.png' />
          <Item.Content>
            <Item.Header>{this.props.user.handle}</Item.Header>
            <Item.Meta>
              <div style={{ display: 'inline-block' }}>
                <div className='settingsUserInfo'>e-mail: </div>                
                <div className='settingsUserInfo'>created at: </div>                
                <div className='settingsUserInfo'>userId: </div>                
                <div className='settingsUserInfo'>lead name: </div>
              </div>
              <div style={{ display: 'inline-block' }}>
                <div className='settingsUserInfo'>{this.props.user.email}</div>              
                <div className='settingsUserInfo'>{this.props.user.createdAt}</div>              
                <div className='settingsUserInfo'>{this.props.user.userId}</div>              
                <div className='settingsUserInfo'><LeadName userId={this.props.user.userId} lead={this.props.lead}/></div>
              </div>
            </Item.Meta>
            <Item.Description></Item.Description>
            {this.renderCreateLeadButton()}
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }


  render() {
    return (
      <div style={{ marginTop: '25px' }}>
        {this.renderItem()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.credentials,
    lead: state.lead,
    pulses: state.pulses
  }
}

export default connect(mapStateToProps, { fetchLead, createLead, deleteLead, fetchPulses })(UserSettings)