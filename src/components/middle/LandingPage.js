import React from 'react'
import { Button } from 'semantic-ui-react'
import history from '../../history'

function LandingPage() {

  const goLink = (link) => {
    history.push(`/${link}`)
  }
  return (
    <div>
      <div style={{ margin: 'auto', width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>
      </div>
      <div className='login' style={{ textAlign: 'center' }}>
        <Button onClick={() => goLink('login')}>Login</Button>
      </div>
    </div>
  )
}

export default LandingPage