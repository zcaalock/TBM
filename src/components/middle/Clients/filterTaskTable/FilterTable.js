import React from 'react'
import StatusFilter from './filters/StatusFilter'

function Thead(props) {

  const pageSelector = () => {
    const selector = props.match.params.selector    
    if (selector === 'All') return <StatusFilter selector='all' item={props.match.params.item} params={props.match.params} />    
  }
  return (
    <div className="" style={{ width: "100%" }}>
      {pageSelector()}
    </div>
  )
}

export default Thead