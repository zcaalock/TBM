import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { editState } from '../../actions/appState'

import AddBoard from './AddBoard'
import BoardsList from './BoardsList'
import SettingsIcons from './SettingsIcons'


class Boards extends React.Component {

  handleAuth() {
    if (this.props.user.loading === false) {
      if (this.props.user.authenticated === false)
        history.push('/unAuth')
    }
  }
  componentDidMount() {
    //this.handleAuth()
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
    history.push(`/filters/LeadPerson/${this.props.user.credentials.userId}`)
  }

  handleSelectedItem(selector) {
    if (this.props.appState.id === selector)
      return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer', backgroundColor: '#E9E9E9' }
    return { paddingLeft: '0', paddingBottom: '5px', paddingTop: '5px', cursor: 'pointer' }
  }

  render() {
    return (
      <div style={{ position: "fixed", height: '98%', padding: '20px' }} className="leftMenu header">
        <div className='item leftMenu-main' style={{ textAlign: 'center' }}>
          <h3>Task Manager</h3>
        </div>
        <SettingsIcons />
        <div className="ui secondary text menu">
          <div className="item" style={{ width: '150px' }}>
            <div
              className="menu" style={{ width: '100%' }}>
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

              <div style={{ borderBottom: '1px solid #DDDDDD', paddingBottom: '5px', marginBottom: '5px' }}><AddBoard /></div>
              
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, { editState })(Boards)