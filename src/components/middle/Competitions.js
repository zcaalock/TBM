import React from 'react'
import Head from './Competitions/Head'
import Body from './Competitions/Body'
import AddCompetition from './Competitions/Cells/AddCompetition'
function Competitions(props) {
  //console.log(props)
  return (
    <div style={{ width: "100%", position: 'fixed' }}>
      <Head />
      <Body props={props} />
      <AddCompetition />
    </div>
  )
}

export default Competitions