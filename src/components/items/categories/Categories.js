import React from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../../../actions/categories'

import Header from './Header'
import Table from '../pulses/Table'

class Categories extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  expand(id) {
    this.setState({ [id]: true })
  }

  collapse(id) {
    this.setState({ [id]: false })
  }

  renderColapsingMenu(category, id) {


    if (this.state && this.state[id] === true) {
      return (
        <Table
          collapse={() => this.collapse(category.id)}
          categoryKey={category.id}
          categoryTitle={category.title} 
          category={category} />
          
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
    return this.props.categories.map(category => {
      if (category.boardId === Number(this.props.appState.id)) {
        return (
          <div key={category.id}>{this.renderColapsingMenu(category, category.id)}</div>
        )
      }
    })
  }


  render() {
    return (
      <div>{this.renderCategories()}</div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    categories: Object.values(state.categories),
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchCategories })(Categories)