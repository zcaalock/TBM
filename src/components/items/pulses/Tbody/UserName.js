import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../../../actions/users'
import { editPulse } from '../../../../actions/pulses'
import DropDownMenu from '../../../Forms/DropDownMenu'

class UserName extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
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
        values={this.props.users}
        text={this.props.pulse.userInitials} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users)
  }
}

export default connect(mapStateToProps, { fetchUsers, editPulse })(UserName)
