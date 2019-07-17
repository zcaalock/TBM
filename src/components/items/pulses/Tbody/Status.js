import React from 'react'
import { connect } from 'react-redux'
import { fetchStatus } from '../../../../actions/status'
import { editPulse } from '../../../../actions/pulses'
import DropDownMenu from '../../../Forms/DropDownMenu'

class UserName extends React.Component {
  componentDidMount() {
    this.props.fetchStatus()
  }

  saveField(title){
    this.props.editPulse(this.props.pulse.id, {status: title})    
  }
  
  
  render() {
    //console.log('users: ', this.props.users)
    return (
      <div>
        {/* {this.props.pulse.userInitials} */}
        <DropDownMenu 
        onSave={(title) => this.saveField(title)} 
        id={this.props.pulse.id} 
        values={this.props.status}
        text={this.props.pulse.status} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('status list: ', state.status)
  return {
    status: Object.values(state.status)
  }
}

export default connect(mapStateToProps, { fetchStatus, editPulse })(UserName)
