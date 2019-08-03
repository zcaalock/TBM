import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'


import { logoutUser } from '../../actions/users'

class SettingsIcons extends React.Component {

  handleSelectedIcon(){
    if (this.props.appState.id === 'settings') 
      return ""
    return "articleIcon"
  } 

  render() {    
    return (
      <div 
      className={`${this.props.MHide} item leftMenu-main `}
      style={{ position: 'relative', textAlign: 'center', paddingBottom: '0px', cursor: 'pointer' }}>

        <div
          onClick={() => history.push('/settings')}
          data-position="left center"
          data-tooltip="Settings"
          className={this.handleSelectedIcon()}
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

const mapStateToProps = (state) => {
  return ({
    appState: state.appState
  })
}

export default connect(mapStateToProps, { logoutUser })(SettingsIcons)