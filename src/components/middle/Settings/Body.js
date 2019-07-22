import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { fetchLead, createLead, deleteLead } from '../../../actions/settings'
import { fetchPulses } from '../../../actions/pulses'

import { Item, Button } from 'semantic-ui-react'



class Body extends React.Component {

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
    const pulses = _.filter(this.props.pulses, { userInitials: this.props.user.userInitials })
    const leads = _.filter(this.props.lead, { userId: this.props.user.userId })
    //console.log('user pulses: ', pulses, leads)
    if (leads.length > 0 && pulses.length === 0) return <Button negative onClick={() => this.handleDeleteLead(leads[0].id)}>Remove user from Lead Person List</Button>
    if (leads.length > 0 && pulses.length > 0) return <div data-position="bottom left" data-tooltip="Remove your initials from pulses" ><Button disabled >Remove user from Lead Person List</Button></div>

    return <Button onClick={() => this.handleCreateLead()}>Add user to Lead Person List</Button>
  }

  uploadImage = (event) =>{
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
              <span className='email'>e-mail: {this.props.user.email}</span>
              <br />
              <span className='email'>created at: {this.props.user.createdAt}</span>
              <br />
              <span className='email'>userId: {this.props.user.userId}</span>
              <br />
              <span className='email'>initials: {this.props.user.userInitials}</span>
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

export default connect(mapStateToProps, { fetchLead, createLead, deleteLead, fetchPulses })(Body)