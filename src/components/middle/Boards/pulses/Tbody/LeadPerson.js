import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchLead } from '../../../../../actions/settings'
import { fetchPulses } from '../../../../../actions/pulses'
import { editPulse } from '../../../../../actions/pulses'
import DropDownMenu from '../../../../Forms/DropDownMenu'

class UserName extends React.Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidMount() {
    if (this.isEmpty(this.props.lead)) this.props.fetchLead()
  }


  saveField(title) {
    const leadPerson = _.filter(this.props.lead, { title: title })
    //console.log('changed person: ',leadPerson[0].userId)
    if (leadPerson[0].userId)
      this.props.editPulse(this.props.pulse.id, { userId: leadPerson[0].userId })
  }

  findLeadPersonById() {
    const userId = this.props.pulse.userId
    const leadPerson = _.filter(this.props.lead, { userId: userId })
    //console.log('ss', leadPerson[0])
    if (leadPerson.length > 0)
      return leadPerson[0].title
  }

  renderDropDown() {
    if (this.props.pulse.archived === 'false' && this.props.pulse.privateId !== this.props.privateId)
      return (
        <div>
          {/* {this.props.pulse.userInitials} */}
          <DropDownMenu
            onSave={(title) => this.saveField(title)}
            id={this.props.pulse.id}
            values={this.props.lead}
            text={this.findLeadPersonById()} />
        </div>
      )
    if (this.props.pulse.archived === 'true')
      return (
        <div>
          {this.findLeadPersonById()}
        </div>
      )
    if (this.props.pulse.archived === 'false' && this.props.pulse.privateId === this.props.privateId)
      return (
        <div>
          {this.findLeadPersonById()}
        </div>
      )
  }

  render() {
    //console.log('users: ', this.props.users)
    return (
      <div>{this.renderDropDown()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lead: Object.values(state.lead),
    privateId: state.user.credentials.userId
  }
}

export default connect(mapStateToProps, { fetchLead, editPulse, fetchPulses })(UserName)
