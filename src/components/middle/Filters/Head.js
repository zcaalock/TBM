import React from 'react'
import { useTranslation } from "react-i18next"

function Head () {
  const { t, i18n } = useTranslation()  
    return (
      <div className="head-vertical-segment" style={{paddingBottom: '20px'}}>
        <h3>{t('Find pulse')}:</h3>
      </div>
    )  
}

export default Head