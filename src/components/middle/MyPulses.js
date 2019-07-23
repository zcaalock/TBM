import React from 'react'
import Head from './MyPulses/Head'
import Body from './MyPulses/Body'

class MyPulses extends React.Component {
  render(){    
    return(
      <div className="article" style={{width: "calc(80% - 270px)"}}>
        <Head/>
        <Body params={this.props.match.params}/>
      </div>
    )
  }
}

export default MyPulses