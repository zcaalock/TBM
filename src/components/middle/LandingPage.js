import React from 'react'
import { Button } from 'semantic-ui-react'
import history from '../../history'
import { useTranslation } from "react-i18next"
function LandingPage() {
const { t } = useTranslation()
  const goLink = (link) => {
    history.push(`/${link}`)
  }
  return (
    <div>
      <div style={{ margin: 'auto', width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>
      </div>
      <div className='login' style={{ textAlign: 'center' }}>
        <Button onClick={() => goLink('login')}>{t('Login')}</Button>
      </div>
    </div>
  )
}

export default LandingPage