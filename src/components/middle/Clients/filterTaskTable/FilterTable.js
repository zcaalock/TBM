import React from 'react'
import StatusFilter from './filters/StatusFilter'

function Thead(props) {

  const pageSelector = () => {
    const selector = props.match.params.selector
    //console.log('selector: ', selector)
    if (selector === 'Status') return <StatusFilter selector='status' item={props.match.params.item} params={props.match.params} />
    if (selector === 'LeadPerson') return <StatusFilter selector='userId' item={props.match.params.item} params={props.match.params} />
    if (selector === 'Project') return <StatusFilter selector='project' item={props.match.params.item} params={props.match.params} />
    if (selector === 'ArchivedClients') return <StatusFilter selector='archived' item={props.match.params.item} params={props.match.params} />
    if (selector === 'All') return <StatusFilter selector='all' item={props.match.params.item} params={props.match.params} />
    
  }
  return (
    <div className="" style={{ width: "100%" }}>
      {pageSelector()}
    </div>
  )
}

export default Thead