import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCategories } from '../../../../actions/categories'
import { fetchPulses } from '../../../../actions/pulses'

import Header from './Header'
import Table from '../pulses/Table'
import ProgressBar from '../../../Forms/ProgressBar'



class Categories extends React.Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }   
  
  

  componentDidMount() {
    if (this.isEmpty(this.props.categories)) this.props.fetchCategories()
    if (this.isEmpty(this.props.pulses)) this.props.fetchPulses()    
  }

  expand(id) {
    this.setState({ [id]: 'true' })
  }

  collapse(id) {
    this.setState({ [id]: 'false' })
  }

  renderProgressBar(id) {
    let detailStorage = []
    const pulses = _.filter(this.props.pulses, { categoryId: id })
    const checked = _.filter(this.props.pulses, { categoryId: id, status: 'Done', archived: 'false' })
    const pulsesPB = _.filter(this.props.pulses, { categoryId: id, archived: 'false' })
    
    pulsesPB.map(pulse => {      
    this.props.details.map(detail =>{
        if (detail.pulseId === pulse.id)
        detailStorage.push({detailId: detail.id, check: detail.check}) 
        //console.log('detail', detail.id) 
        
      })     
    })
    
    const details = _.unionBy(detailStorage, 'detailId')
    const detailsChecked = _.filter(details, {check: 'true'})

    console.log('pbar: ', detailsChecked.length)

    if (details.length > 0) {
      const value = detailsChecked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar size={'tiny'} value={value * 100} />
    }
  }

  renderColapsingMenu(category, id) {
    if (this.state && this.state[id] === 'true') {
      return (
        <Table
          collapse={() => this.collapse(category.id)}
          categoryKey={category.id}
          categoryTitle={category.title}
          category={category}
          boardId={this.props.appState.id} />
      )
    } return (
      <Header
        expandCollapse={() => this.expand(category.id)}
        categoryKey={category.id}
        categoryTitle={category.title}
        category={category} />
    )
  }

  renderCategories() {
    //var sort = _.sortBy(this.props.categories, 'id')
    //console.log('sort: ', sort)
    return this.props.categories.map(category => {
      if (category.boardId === this.props.appState.id && category.privateId === "") {
        return (
          <div key={category.id}>
            {this.renderProgressBar(category.id)}
            {this.renderColapsingMenu(category, category.id)}</div>
        )
      } return null
    })
  }


  render() {
    //console.log('fetch categories: ', this.props.categories)
    return (
      <div>
        {this.renderCategories()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    categories: Object.values(state.categories),
    pulses: Object.values(state.pulses),
    details: Object.values(state.details),
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPulses })(Categories)