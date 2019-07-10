import React from 'react'

import Header from './Header'
import Thead from './Thead'
import Tbody from './Tbody'

class Table extends React.Component {
  

  render() {
    return (
      <div>
        <Header collapse={()=>this.props.collapse()} categoryTitle={this.props.categoryTitle} />
        <table className="ui very basic table">
          <Thead />
          <Tbody categoryId={this.props.categoryKey} />
        </table>
      </div>


    )
  }
}

export default Table