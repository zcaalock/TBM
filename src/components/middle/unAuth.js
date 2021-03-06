import React from 'react'
import { Button, Message } from 'semantic-ui-react'
import history from '../../history'

function unAuth() {

  const goLink = (link) => {
    history.push(`/${link}`)
  }
  return (
    <div>
      <div style={{ margin: 'auto', width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>
      </div>
      <div className='login' style={{ textAlign: 'center' }}>
        <Message negative header='Unauthorized' content='You are not authorized to view this page, please login or sign up' />
        <Button onClick={() => goLink('login')}>Login</Button>
        <Button onClick={() => goLink('signup')}>Sign Up</Button>
      </div>
    </div>
  )
}

export default unAuth