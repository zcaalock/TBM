import React from 'react'
import FilterList from './filterTaskTable/FilterList'

class Body extends React.Component {
  render() {
    return (
      <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
        <FilterList/>                
      </div>
    )
  }
}

export default Body