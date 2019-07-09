import React from 'react'
import { connect } from 'react-redux'
import { fetchBoard, deleteBoard, editBoard } from '../../actions/boards'

import Header from './Header'

class ItemsMain extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.id)

  }

  renderHeader(){
    if (!this.props.board) {
      return <div></div>
    }
    const { title } = this.props.board
    return (
      <div className="article" >
      <Header board={this.props.board} delete={()=>{this.props.deleteBoard(this.props.board.id)}} title={title}/>
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

export default connect(mapStateToProps, { fetchBoard, deleteBoard, editBoard })(ItemsMain)
