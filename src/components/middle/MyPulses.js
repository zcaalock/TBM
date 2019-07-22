import React from 'react'
import Head from './MyPulses/Head'
import Body from './MyPulses/Body'

class MyPulses extends React.Component {
  render(){
    return(
      <div className="article" style={{width: "calc(100% - 270px)"}}>
        <Head/>
        <Body/>
      </div>
    )
  }
}

export default MyPulses