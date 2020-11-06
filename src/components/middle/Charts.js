import React from 'react'
import Head from './Charts/Head'
import Body from './Charts/Body'
function Charts(props) {
  //console.log(props)
  return (
    <div style={{ width: "100%", position: 'fixed' }}>
      <Head />
      <Body props={props} />      
    </div>
  )
}

export default Charts