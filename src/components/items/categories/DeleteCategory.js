import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {deleteCategory} from '../../../actions/categories'
import { fetchPulses} from '../../../actions/pulses'

class DeleteCategory extends React.Component {

  componentDidMount() {
    this.props.fetchPulses()
    
  }

  renderDelete(){
    //console.log('pulses: ', this.props.pulses)
    //console.log('categoryId:', this.props.categoryId)
    const puls = _.filter(this.props.pulses, {categoryId: this.props.categoryId})  
    //console.log('puls: ', this.props.boardId)
    if (puls.length>0){
      return (
        <div
        //onClick={() => { this.props.delete() }}
        
        data-position="bottom left"
        data-tooltip="Remove all pulses before delete"
        style={{ display: 'inline-block' }}>
        <i className=" trash icon" style={{color: '#bcbdbd26'}} />        
      </div>
      )
    } return (
      <div
        onClick={() => { this.props.deleteCategory(this.props.categoryId, Number(this.props.boardId)) }}
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
    pulses: Object.values(state.pulses),
    boardId: state.appState.id    
  }
}

export default connect(mapStateToProps, { fetchPulses, deleteCategory }) (DeleteCategory)