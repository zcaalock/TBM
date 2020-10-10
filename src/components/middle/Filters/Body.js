import React from 'react'
import FilterList from './filterTaskTable/FilterList'
import StatusFilter from './filterTaskTable/filters/StatusFilter'

function Body() {
  return (
    <>
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <FilterList />
      </div>
      <div className="" style={{ width: "100%" }}>
        <StatusFilter />
      </div>
    </>
  )
}

export default Body