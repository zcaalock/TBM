import React from 'react'

import Header from '../../items/categories/Header'
import Thead from './Thead'
import Tbody from './Tbody'

class Table extends React.Component {


  render() {
    return (
      <div>
        <Header
          expandCollapse={() => this.props.collapse()}
          categoryKey={this.props.categoryKey}
          categoryTitle={this.props.categoryTitle}
          category={this.props.category} />
        <table className="ui very basic table" style={{}}>
          <Thead />
          <Tbody categoryId={this.props.categoryKey} />
        </table>
      </div>


    )
  }
}

export default Table