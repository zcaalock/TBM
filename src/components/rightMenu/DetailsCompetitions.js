import React from 'react'
import { useSelector } from "react-redux";

import HeaderCompetition from './HeaderCompetition'
import BodyCompetition from './BodyCompetition'


function Details(props) {

  
  const competition = useSelector(state => state.competitions[props.match.params.id])
  
  
  if (competition) {    
    return (
      <div className="article rightMenu" style={{ padding: '20px' }}>
        <HeaderCompetition title={competition.title} competitionId={competition.id} competition={competition} />
        <BodyCompetition key={competition.id} competitionId={competition.id} />

      </div>
    )
  }
  return <div className="article rightMenu" style={{ position: 'absolute', marginLeft: 'calc(80% - 20px)', padding: '20px', float: 'right' }}><div className="ui active inline loader"></div></div>

}

export default Details