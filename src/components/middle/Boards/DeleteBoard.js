import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {deleteBoard} from '../../../actions/boards'
import {fetchCategories} from '../../../actions/categories'


class DeleteBoard extends React.Component {

  componentDidMount() {
    //this.props.fetchCategories()
    
  }

  renderDelete(){    
    const board = _.filter(this.props.categories, {boardId: this.props.boardId})    
    if (board.length>0){
      return (
        <div
        //onClick={() => { this.props.delete() }}        
        data-position="bottom left"
        data-tooltip="Remove all items before delete"
        style={{ display: 'inline-block' }}>
        <i className=" trash icon" style={{color: '#bcbdbd26'}} />        
      </div>
      )
    } return (
      <div
        onClick={() => this.props.deleteBoard(this.props.boardId, this.props.user.userId)}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block',cursor: 'pointer' }}>
        <i className=" trash icon" />        
      </div>
    )

  }

  render() {
      
    return (
      <>
        
        {this.renderDelete()}
      </>

    )
  }
}
const mapStateToProps = (state)=>{
  return{
    categories: Object.values(state.categories),
    boardId: state.appState.id,
    user: state.user.credentials    
  }
}

export default connect(mapStateToProps, { fetchCategories, deleteBoard }) (DeleteBoard)
