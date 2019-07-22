import React from 'react'
import Head from './Boards/Head'
import Body from './Boards/Body'

class Boards extends React.Component {
  render(){
    return(
      <div className="article" style={{width: "calc(100% - 270px)"}}>
        <Head/>
        <Body/>
      </div>
    )
  }
}

export default Boards