import React from 'react'
import FilterList from './filterTaskTable/FilterList'
import StatusFilter from './filterTaskTable/filters/StatusFilter'

function Body() {
  return (      
      <div style={{ paddingTop: '140px' }}>
        <StatusFilter/>
      </div>
    
  )
}

export default Body