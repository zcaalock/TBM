import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {deleteBoard} from '../../actions/boards'
import {fetchCategories} from '../../actions/categories'


class DeleteBoard extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
    
  }

  renderDelete(){
    //console.log('categories: ', this.props.categories)
    //console.log('categoryId:', this.props.categoryId)
    const board = _.filter(this.props.categories, {boardId: Number(this.props.boardId)})  
    console.log('categories: ', board)
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
        onClick={() => this.props.deleteBoard(Number(this.props.boardId))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block' }}>
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
    boardId: state.appState.id    
  }
}

export default connect(mapStateToProps, { fetchCategories, deleteBoard }) (DeleteBoard)
