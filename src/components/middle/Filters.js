import React from 'react'
import Head from './Filters/Head'
import Body from './Filters/Body'

class Filtrs extends React.Component {
  render(){    
    return(
      <div className="article" style={{width: "calc(80% - 270px)"}}>
        <Head/>
        <Body/>
      </div>
    )
  }
}

export default Filtrs