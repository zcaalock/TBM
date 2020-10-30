import React from 'react'
import { useTranslation } from "react-i18next"
import FilterList from './filterTaskTable/FilterList'

function Head() {
  const { t } = useTranslation()
  return (
    <div style={{position: 'fixed', width: 'calc(80% - 270px)', backgroundColor: 'white', zIndex: 10, marginLeft: '-20px', paddingLeft: '20px'}}>
      <div className="head-vertical-segment" style={{ paddingBottom: '20px' }}>
        <h3>{t('Contacts')}:</h3>
      </div>
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <FilterList />
      </div>
    </div>

  )
}

export default Head