import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchLead, createLead, deleteLead } from '../../../../actions/settings'
import { editState } from '../../../../actions/appState'
import { fetchPulses } from '../../../../actions/pulses'
import { Item, Button, Message } from 'semantic-ui-react'

import LeadName from './leadName/LeadName'

class UserSettings extends React.Component {
  state={showError: 'false'}

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidMount() {
    this.props.editState('settings', 'id') //selected board to appState    
    if (this.isEmpty(this.props.lead)) this.props.fetchLead()
    if (this.isEmpty(this.props.pulses)) this.props.fetchPulses()
  }

  handleCreateLead() {

    this.props.createLead({ title: this.props.user.handle }, this.props.user.userId)
  }

  handleDeleteLead(id) {
    //console.log('del id: ', id)
    this.props.deleteLead(id)
  }

  renderErrorMessage() {
    if (this.state.showError === 'true')
      return (
        <Message negative>
          <Message.Header>Cannot preceed with the request</Message.Header>
          <p>Lead person name is in use</p>
        </Message>
      )
  }

  tiggerError(){
    this.setState({showError: 'true'})
    setTimeout(() => { this.setState({showError: 'false'}) }, 5000);
  }

  renderCreateLeadButton() {
    const pulses = _.filter(this.props.pulses, { userId: this.props.user.userId })
    const leads = _.filter(this.props.lead, { userId: this.props.user.userId })
    //console.log('user pulses: ', pulses, leads)

    if (leads.length > 0 && pulses.length === 0) return <Button negative onClick={() => this.handleDeleteLead(leads[0].id)}>Remove user from Lead Person List</Button>
    if (leads.length > 0 && pulses.length > 0) return <div style={{width: '265px'}} onClick={()=>this.tiggerError()}><Button  disabled >Remove user from Lead Person List</Button></div>
    if (this.props.user.handle) return <Button onClick={() => this.handleCreateLead()}>Add user to Lead Person List</Button>
    return <div></div>
  }

  uploadImage = (event) => {
    //console.log('event: ', event)
    event.preventDefault();

  }

  renderLeadName() {
    const leads = _.filter(this.props.lead, { userId: this.props.user.userId })
    if (leads.length > 0) return <LeadName userId={this.props.user.userId} lead={this.props.lead} />
    return <div>{this.props.user.handle}</div>
  }

  renderMeta() {

    if (this.props.user.handle)
      return (
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
            <div className='settingsUserInfo'>{this.renderLeadName()}</div>
          </div>
        </Item.Meta>
      )
    return (<div>No user found..</div>)
  }

  renderItem() {
    return (
      <Item.Group>
        {this.renderErrorMessage()}
        <Item>
          <Item.Image size='tiny' src='/images/no-image.png' />
          <Item.Content>
            <Item.Header>{this.props.user.handle}</Item.Header>
            {this.renderMeta()}
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

export default connect(mapStateToProps, { fetchLead, createLead, deleteLead, fetchPulses, editState })(UserSettings)