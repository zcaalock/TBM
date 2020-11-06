import React from 'react'
import DetailsCompetitions from './details/DetailsCompetitions'
import AddDetailCompetition from './details/AddDetailCompetition'
import NotepadCompetition from './details/NotepadCompetition'

function Body(props) {
  return (
    <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <DetailsCompetitions competitionId={props.competitionId} />
      <AddDetailCompetition competitionId={props.competitionId} />
      <NotepadCompetition competitionId={props.competitionId} />
    </div>
  )
}
export default Body