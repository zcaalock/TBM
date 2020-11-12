import React from 'react'
import Pulses from './Items/Pulses'
import Details from './Items/Details'

function Body() { 

  return (
    <div className='removeScroll' style={{width: '80%', overflowY: 'scroll',  height: 'calc(100vh - 80px)'}} >      
      <Pulses/>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}></div>
      <Details/>
    </div>

  )
}

export default Body