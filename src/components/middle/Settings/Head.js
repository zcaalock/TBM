import React from 'react'
import { useTranslation } from "react-i18next"
function Head() {
  const { t } = useTranslation()
  return (
    <div style={{ width: 'calc(80% - 250px)', backgroundColor: 'white', marginLeft: '-20px', paddingLeft: '20px' }}>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}>
        <h3>{t('Settings')}</h3>
      </div>
      <h4>{t('User settings')}:</h4>
    </div>
  )
}

export default Head