import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {editCategory} from '../../../../actions/categories'


class ArchiveCategory extends React.Component {

  componentDidMount() {
        
  }

  renderArchive(){    
    const findCategory = _.filter(this.props.categories, {id: this.props.categoryId})
    const isArchived = findCategory[0].archived    
    console.log('details: ', isArchived)
    if (isArchived === 'true'){
      return (
        <div
        onClick={() => this.props.editCategory(this.props.categoryId, {archived: 'false'})}        
        data-position="left center"
        data-tooltip="Unarchive Category"
        style={{ display: 'inline-block', color: '#DC6969', paddingRight: '5px' ,cursor: 'pointer'}}>          
        <i className=" archive icon" /> archived        
      </div>
      )
    } else return (
      <div
        onClick={() => this.props.editCategory(this.props.categoryId, {archived: 'true'})}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Archive"
        style={{ display: 'inline-block',cursor: 'pointer' }}>
        <i className=" archive icon" />        
      </div>
    )

  }

  render() {      
    return (
      <>        
        {this.renderArchive()}
      </>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    pulses: Object.values(state.pulses),
    categories: Object.values(state.categories),
    boardId: state.appState.id      
  }
}

export default connect(mapStateToProps, { editCategory }) (ArchiveCategory)
