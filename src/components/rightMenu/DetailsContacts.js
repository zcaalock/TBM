import React from 'react'
import { useSelector } from "react-redux";

import HeaderContact from './HeaderContact'
import BodyContact from './BodyContact'


function Details(props) {

  
  const contact = useSelector(state => state.contacts[props.match.params.id])
  
  
  if (contact) {    
    return (
      <div className="article rightMenu" style={{ padding: '20px' }}>
        <HeaderContact title={contact.title} contactId={contact.id} contact={contact} />
        <BodyContact key={contact.id} contactId={contact.id} />

      </div>
    )
  }
  return <div className="article rightMenu" style={{ position: 'absolute', marginLeft: 'calc(80% - 20px)', padding: '20px', float: 'right' }}><div className="ui active inline loader"></div></div>

}

export default Details