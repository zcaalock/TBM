import React from 'react'
import { useSelector } from "react-redux";

import HeaderClient from './HeaderClient'
import BodyClient from './BodyClient'


function Details(props) {

  
  const client = useSelector(state => state.clients[props.match.params.id])
  
  
  if (client) {    
    return (
      <div className="article rightMenu" style={{ padding: '20px' }}>
        <HeaderClient title={client.title} clientId={client.id} client={client} />
        <BodyClient key={client.id} clientId={client.id} />

      </div>
    )
  }
  return <div className="article rightMenu" style={{ position: 'absolute', marginLeft: 'calc(80% - 20px)', padding: '20px', float: 'right' }}><div className="ui active inline loader"></div></div>

}

export default Details