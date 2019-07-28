import React from 'react'


import Head from './Settings/Head'
import Body from './Settings/Body'

class Settings extends React.Component {
  render(){
    return(
      <div className="article" style={{width: "calc(100% - 270px)"}}>
        <Head />
        <Body />
      </div>
    )
  }
}



export default Settings