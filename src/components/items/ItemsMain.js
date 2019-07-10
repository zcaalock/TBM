import React from 'react'
import { connect } from 'react-redux'
import { fetchBoard, deleteBoard, editBoard } from '../../actions/boards'
import { editState } from '../../actions/appState'

import Header from './Header'
import Body from './Body'

class ItemsMain extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.id)
    

  }

  renderHeader(){
    if (!this.props.board) {
      return <div></div>
    }
    const { title } = this.props.board
    this.props.editState(this.props.match.params.id, 'id') //selected board to appState
    return (
      <div className="article" >
      <Header board={this.props.board} delete={()=>{this.props.deleteBoard(this.props.board.id)}} title={title}/>
      <Body/>
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

export default connect(mapStateToProps, { fetchBoard, deleteBoard, editBoard, editState })(ItemsMain)
