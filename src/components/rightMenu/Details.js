import React from 'react'
import { useSelector} from "react-redux";

import Header from './Header'
import Body from './Body'


function Details(props) {
  
  const pulse = useSelector(state => state.pulses[props.match.params.id]);
  if (!pulse) {
    return <div className="article rightMenu" style={{ position: 'absolute', marginLeft: 'calc(80% - 20px)', padding: '20px', float: 'right' }}><div className="ui active inline loader"></div></div>
  } return (
    <div className="article rightMenu" style={{ padding: '20px' }}>
      <Header title={pulse.title} pulseId={pulse.id} pulse={pulse} />
      <Body key={pulse.id} pulseId={pulse.id} />
      
    </div>
  )
}

export default Details