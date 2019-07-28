import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'

import { editState } from '../../actions/appState'
import { fetchStatus } from '../../actions/status'
import { fetchPulses } from '../../actions/pulses'
import { fetchCategories } from '../../actions/categories'
import { fetchBoards } from '../../actions/boards'
import { fetchLead } from '../../actions/settings'
import { fetchDetails } from '../../actions/details'
import { fetchNotepads } from '../../actions/notepad'

import AddBoard from './AddBoard'
import BoardsList from './BoardsList'
import SettingsIcons from './SettingsIcons'
import AddPulseModal from '../Forms/AddPulseModal'


class Boards extends React.Component {

  state = { MHide: 'true' }

  showMobileMenu() {
    return this.state.MHide === 'false' ? '' : 'MHide'
  }

  handleAuth() {
    if (this.props.user.loading === false) {
      if (this.props.user.authenticated === false)
        history.push('/unAuth')
    }
  }
  componentDidMount() {
    //this.handleAuth()
  }

  refreshDB() {
    if (this.props.appState.refreshed === 'false') {
      this.props.fetchBoards()
      this.props.fetchStatus()
      this.props.fetchPulses()
      this.props.fetchDetails()
      this.props.fetchLead()
      this.props.fetchCategories()
      this.props.fetchNotepads()
    }
    this.props.editState('true', 'refreshed')
    setTimeout(() => { this.props.editState('false', 'refreshed') }, 20000);

  }

  handleMyPulsesOnClick() {
    this.props.editState('', 'pulseId');
    this.props.editState(this.props.match.params.id, 'id')
    history.push(`/filters/LeadPerson/${this.props.user.credentials.userId}`)
    //history.push(`/mypulses/${this.props.user.credentials.userId}`)
  }

  handleFiltersOnClick() {
    this.props.editState('filters', 'id')
    this.props.editState('', 'pulseId');
    if(this.props.user) this.props.editState({selector: 'LeadPerson', value: this.props.user.credentials.handle}, 'filter')
    history.push(`/filters/LeadPerson/${this.props.user.credentials.userId}`)
  }

  handleSelectedItem(selector) {
    if (this.props.appState.id === selector)
      return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer', backgroundColor: '#E9E9E9' }
    return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer' }
  }

  renderRefreshClass() {
    if (this.props.appState.refreshed === "false") return <div onClick={() => this.refreshDB()} data-position="bottom center" data-tooltip="Refresh database" className='refreshDB'><i className='refreshDBspin large refresh icon' /></div>
    if (this.props.appState.refreshed === "true") return <div onClick={() => this.refreshDB()} data-position="bottom center" data-tooltip="Cannot refresh database now" className='greyedDB'><i className='large refresh icon' /></div>
  }

  render() {
    return (
      <div
        //style={{ position: "fixed", height: '98%', padding: '20px' }}
        className="leftMenu header">
        <div className='item leftMenu-main' style={{ textAlign: 'center' }}>
          <div onClick={() => this.setState({ MHide: this.state.MHide === 'true' ? 'false' : 'true' })} id="TMenu" style={{ display: 'inline-block' }}><i className='bars icon' /></div>
          <div style={{ display: 'inline-block' }}><h3>Task Manager</h3></div>
        </div>
        <SettingsIcons MHide={this.showMobileMenu()} />
        <div className={`${this.showMobileMenu()} ui secondary text menu`}>
          <div className="item" style={{ width: '100%', margin: 'auto' }}>
            <div
              className="menu" style={{ width: '100%' }}>
              <div onClick={() => this.props.editState('true', 'addPulseOpen')} data-position="bottom center" data-tooltip="Create Pulse" className="refreshDB" style={{ paddingTop: '0', borderBottom: '1px solid #DDDDDD' }}>
                <i className="plus square outline large icon" />
              </div>
              <div
                onClick={() => this.handleFiltersOnClick()}
                className="header item headerSelectable"
                style={this.handleSelectedItem('filters')}>
                Filters
              </div>

              <div
                className="header item"
                style={{ paddingLeft: '0', paddingTop: '20px', borderTop: '1px solid #DDDDDD' }}>
                Boards:
              </div>
              <BoardsList />
              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}>
                <AddBoard />
              </div>
              {this.renderRefreshClass()}
            </div>
          </div>
        </div>
        <AddPulseModal className={this.showMobileMenu()} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  return {
    user: state.user,
    appState: state.appState

  }
}

export default connect(mapStateToProps, { editState, fetchBoards, fetchCategories, fetchDetails, fetchLead, fetchPulses, fetchStatus, fetchNotepads })(Boards)