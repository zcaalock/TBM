import React from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../../../actions/categories'

import Header from './Header'
import Table from './Table'

class Categories extends React.Component {

  state = { id : false}

  componentDidMount() {
    this.props.fetchCategories()
  }

  renderColapsingMenu(category){
    if(this.state.id===true){
      return <Header categoryKey={category.id} categoryTitle={category.title} />
    } return <Table categoryKey={category.id} categoryTitle={category.title}/>
  }

  renderCategories() {
    return this.props.categories.map(category => {
      if (category.boardId === Number(this.props.appState.id)) {
        return (
          <div>{this.renderColapsingMenu(category)}</div>
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