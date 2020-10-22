import React from 'react'
import { useTranslation } from "react-i18next"


function Head () {   
  const { t } = useTranslation()
    return (
      <div className="head-vertical-segment" style={{paddingBottom: '20px'}}>
        <h3>{t('Clients')}: </h3>
      </div>
    )  
}

export default Head