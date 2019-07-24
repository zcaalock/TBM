import React from 'react'
import { connect } from 'react-redux'
import { deleteBoard, editBoard } from '../../../../actions/boards'
//import { editState } from '../../../../actions/appState'

import Header from '../../../items/Header'
import Body from './Body'

class ItemsMain extends React.Component {
  

  renderHeader() {
    if (!this.props.board) {
      return (
        <div className="article">
          <div className="ui active inline loader"></div>
        </div>
      )
    }
    const { title } = this.props.board      
    return (
      <div className="article"
      // style={{display: 'inline-block', width: '70%'}} 
      >
        <Header board={this.props.board} delete={() => { this.props.deleteBoard(this.props.board.id) }} title={title} />
        <Body />
      </div>
    )
  }

  render() {
    return this.renderHeader()
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { deleteBoard, editBoard })(ItemsMain)
