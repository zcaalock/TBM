import React from 'react'
import { useTranslation } from "react-i18next"
function Head() {
  const { t, i18n } = useTranslation() 
  return (
    <>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}>
        <h3>{t('Settings')}</h3>
      </div>
      <h4>{t('User settings')}:</h4>
    </>
  )
}

export default Head