import React from 'react'
import { connect } from 'react-redux'
import { fetchLead } from '../../../../../actions/settings'
import { editPulse } from '../../../../../actions/pulses'
import DropDownMenu from '../../../../Forms/DropDownMenu'

class UserName extends React.Component {
  componentDidMount() {
    this.props.fetchLead()
  }

  saveField(title){
    this.props.editPulse(this.props.pulse.id, {userInitials: title})    
  }
  
  
  render() {
    //console.log('users: ', this.props.users)
    return (
      <div>
        {/* {this.props.pulse.userInitials} */}
        <DropDownMenu 
        onSave={(title) => this.saveField(title)} 
        id={this.props.pulse.id} 
        values={this.props.lead}
        text={this.props.pulse.userInitials} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lead: Object.values(state.lead)
  }
}

export default connect(mapStateToProps, { fetchLead, editPulse })(UserName)
