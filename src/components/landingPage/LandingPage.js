import React from 'react'
import LogIn from '../Forms/LogIn'
import history from '../../history'

class LandingPage extends React.Component {

  goLink() {
    history.push(`/boards/`)
    //console.log('select', id)
  }
   
  render() {
    return (
      <div>
        <div style={{ width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>              
      </div>
      <div className='login'><LogIn goLing={()=>this.goLink()}/></div>  
      </div>
    )
  }
}

export default LandingPage