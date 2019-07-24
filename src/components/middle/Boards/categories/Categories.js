import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCategories } from '../../../../actions/categories'
import { fetchPulses } from '../../../../actions/pulses'

import Header from './Header'
import Table from '../pulses/Table'
import ProgressBar from '../../../Forms/ProgressBar'

class Categories extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPulses()
  }

  expand(id) {
    this.setState({ [id]: true })
  }

  collapse(id) {
    this.setState({ [id]: false })
  }

  renderProgressBar(id) {
    const pulses = _.filter(this.props.pulses, { categoryId: id })
    const checked = _.filter(this.props.pulses, { categoryId: id, status: 'Done' })

    if (pulses.length > 0) {
      const value = checked.length / pulses.length
      //console.log('value: ', value)
      return <ProgressBar size={'tiny'} value={value * 100} />
    }
  }

  renderColapsingMenu(category, id) {
    if (this.state && this.state[id] === true) {
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
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchCategories, fetchPulses })(Categories)