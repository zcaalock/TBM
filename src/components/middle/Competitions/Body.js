import React from 'react'
import StatusFilter from './filterTaskTable/filters/StatusFilter'

function Body() {
  return (      
    <div className='removeScroll' style={{ width: 'calc(80% - 250px)', overflowY: 'scroll',  height: 'calc(100vh - 200px)' }}>
        <StatusFilter/>
      </div>
    
  )
}

export default Body