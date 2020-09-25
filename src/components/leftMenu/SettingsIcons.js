import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../history'
import { logoutUser } from '../../actions/users'

function SettingsIcons(props) {

  const appState = useSelector(state => state.appState)

  const dispatch = useDispatch()

  const handleSelectedIcon = () => {
    if (appState.id === 'settings')
      return ""
    return "articleIcon"
  }

  return (
    <div
      className={`${props.MHide} item leftMenu-main `}
      style={{ position: 'relative', textAlign: 'center', paddingBottom: '0px', cursor: 'pointer' }}>
      <div
        onClick={() => history.push('/settings')}
        data-position="left center"
        data-tooltip="Settings"
        className={handleSelectedIcon()}
        style={{ display: 'inline-block' }}>
        <h3><i className="setting icon" /></h3>
      </div>
      <div
        onClick={() => { history.push('/'); dispatch(logoutUser()); localStorage.removeItem("state") }}
        data-position="right center"
        data-tooltip="Logout"
        className="articleIcon"
        style={{ display: 'inline-block' }}>
        <h3><i className="power off icon" /></h3>
      </div>
    </div>
  )
}

export default SettingsIcons