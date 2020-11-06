import React from 'react'
import { useTranslation } from "react-i18next"

function Head() {
  const { t } = useTranslation()
  return (
    <div style={{width: '90%', backgroundColor: 'white', marginLeft: '-20px', paddingLeft: '20px'}}>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}>
        <h3>{t('Charts')}: </h3>
      </div>      
    </div>
  )
}

export default Head