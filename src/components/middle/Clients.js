import React from 'react'
import Head from './Clients/Head'
import Body from './Clients/Body'
import AddClient from './Clients/Cells/AddClient'
function Clients(props) {
  //console.log(props)
  return (
    <div className="" style={{ width: "100%" }}>
      <Head />
      <Body props={props} />
      <AddClient />
    </div>
  )
}

export default Clients