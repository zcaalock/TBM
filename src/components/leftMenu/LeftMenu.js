import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'

import AddBoard from './AddBoard'
import BoardsList from './BoardsList'
import LogOut from './LogOut'

class Boards extends React.Component {

  handleAuth() {
    if (this.props.user.loading === false) {
      if (this.props.user.authenticated === false)
        history.push('/unAuth')
    }
  }
  componentDidUpdate() {
    this.handleAuth()
  }

  render() {
    return (
      <div style={{ position: "fixed", height: '98%', padding: '20px' }} className="leftMenu header">
        <LogOut />
        <div className="ui secondary text menu">
          <div className="item" style={{ width: '150px' }}>
            <div
              className="menu" style={{ width: '100%' }}>
              <div
                onClick={() => history.push('/boards')}
                className="header item"
                style={{ paddingLeft: '0', paddingBottom: '10px', cursor: 'pointer' }}>
                My tasks
                </div>                
              <div                
                className="header item"
                style={{ paddingLeft: '0', paddingBottom: '10px', cursor: 'pointer' }}>
                Boards:
                </div>
              <BoardsList />
              <AddBoard />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Boards)