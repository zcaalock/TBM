import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import history from '../../history'
import { Dropdown } from 'semantic-ui-react'
import { logoutUser } from '../../actions/users'
import { fetchStatus } from '../../actions/status'
import { fetchPulses } from '../../actions/pulses'
import { fetchCategories } from '../../actions/categories'
import { fetchBoards } from '../../actions/boards'
import { fetchLead } from '../../actions/settings'
import { fetchDetails } from '../../actions/details'
import { fetchNotepads } from '../../actions/notepad'
import { fetchClients } from '../../actions/clients'
import { editState } from '../../actions/appState'
import { fetchContacts } from '../../actions/contacts'
import { useTranslation } from "react-i18next"


function SettingsIcons(props) {

  const appState = useSelector(state => state.appState)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    }
    changeLanguage(appState.language)
  }, [appState.language, i18n])

  
  
  const handleSelectedIcon = () => {
    if (appState.id === 'settings')
      return ""
    return "articleIcon"
  }

  const refreshDB = () => {
    if (appState.refreshed === 'false') {
      dispatch(fetchBoards())
      dispatch(fetchStatus())
      dispatch(fetchPulses())
      dispatch(fetchDetails())
      dispatch(fetchLead())
      dispatch(fetchCategories())
      dispatch(fetchNotepads())
      dispatch(fetchClients())
      dispatch(fetchContacts())
    }
    dispatch(editState('true', 'refreshed'))
    setTimeout(() => { dispatch(editState('false', 'refreshed')) }, 20000)
  }

  const renderRefreshClass = () => {
    if (appState.refreshed === "false") return <div style={{ display: 'inline-block' }} onClick={() => refreshDB()} data-position="bottom center" data-tooltip={t("Refresh database")} className='refreshDB'><i style={{ height: '1.3em' }} className='refreshDBspin refresh icon' /></div>
    if (appState.refreshed === "true") return <div style={{ display: 'inline-block' }} onClick={() => refreshDB()} data-position="bottom center" data-tooltip={t("Cannot refresh database now")} className='greyedDB'><i className='refresh icon' /></div>
  }

  return (
    <div
      className={`${props.MHide} item leftMenu-main `}
      style={{ position: 'relative', textAlign: 'center', paddingBottom: '0px', cursor: 'pointer' }}>
      {renderRefreshClass()}
      <div
        onClick={() => history.push('/settings')}
        data-position="bottom center"
        data-tooltip={t("Settings")}
        className={handleSelectedIcon()}
        style={{ display: 'inline-block' }}>
        <h3><i className="setting icon" /></h3>
      </div>
      <Dropdown
        className='articleIcon'
        icon='world'
        style={{ fontSize: '1.3em' }}
        data-position="top center"
        data-tooltip={t("Language")}
      //text={appState.language}
      >
        <Dropdown.Menu>
          <Dropdown.Header icon='world' content={`${t("Choose language")}:`}/>
          <Dropdown.Divider />
          <Dropdown.Item text='polski' active={appState.language === 'pl' ? true : false} onClick={() => { dispatch(editState('pl', 'language')) }} />
          <Dropdown.Item text='english' active={appState.language === 'en' ? true : false} onClick={() => { dispatch(editState('en', 'language')) }} />
        </Dropdown.Menu>
      </Dropdown>
      <div
        onClick={() => { history.push('/'); dispatch(logoutUser()); localStorage.removeItem("state") }}
        data-position="bottom center"
        data-tooltip={t("Logout")}
        className="articleIcon"
        style={{ display: 'inline-block' }}>
        <h3><i className="power off icon" /></h3>
      </div>
    </div>
  )
}

export default SettingsIcons