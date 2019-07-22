import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'


import { logoutUser } from '../../actions/users'

class SettingsIcons extends React.Component {

  render() {
    return (
      <div 
      className='item leftMenu-main' 
      style={{ position: 'relative', textAlign: 'center', paddingBottom: '0px', cursor: 'pointer' }}>

        <div
          onClick={() => history.push('/settings')}
          data-position="left center"
          data-tooltip="Settings"
          className="articleIcon"
          style={{ display: 'inline-block' }}>
          <h3><i className="setting icon" /></h3>
        </div>
        <div
          onClick={() => {history.push('/'); this.props.logoutUser()}}
          data-position="right center"
          data-tooltip="Logout"
          className="articleIcon"
          style={{ display: 'inline-block' }}>
          <h3><i className="power off icon" /></h3>
        </div>
      </div>

    )
  }

}

export default connect(null, { logoutUser })(SettingsIcons)