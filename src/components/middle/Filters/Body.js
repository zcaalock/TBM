import React from 'react'

import Thead from './filterTaskTable/Thead'

import FilterList from './filterTaskTable/FilterList'

class Body extends React.Component {
  render() {
    return (
      <div>
        <FilterList/>
        <table className="ui very basic table" style={{ paddingLeft: '15px' }}>        
        <Thead />        
      </table>
      </div>
    )
  }
}

export default Body