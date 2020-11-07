import React from 'react'
import UserSettings from './userSettings/UserSettings'
import AppSettings from './AppSettings'

function Body() {

  return (
    <div className='removeScroll' style={{ width: 'calc(80% - 250px)', overflowY: 'scroll',  height: 'calc(100vh - 200px)' }}>
      <UserSettings />
      <AppSettings />
    </div>
  )
}

export default Body