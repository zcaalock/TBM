import React from 'react'
import Head from './Clients/Head'
import Body from './Clients/Body'
import AddClient from './Clients/Cells/AddClient'
function Clients() {

  return (
    <div className="" style={{ width: "100%" }}>
      <Head />
      <Body />
      <AddClient />
    </div>
  )
}

export default Clients