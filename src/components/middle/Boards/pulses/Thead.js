import React from 'react'
import { useTranslation } from "react-i18next"


function Thead() {
const { t } = useTranslation()
  return (
    <thead >
      <tr >
        <th style={{ paddingLeft: '10px', width: '20%' }}>{t('Title')}</th>
        <th style={{ width: '10%',  }}>{t('Lead Person')}</th>
        <th style={{ width: '10%' }}>{t('Status')}</th>
        <th style={{ width: '10%' }}>{t('Deadline')}</th>
        <th style={{ width: '10%' }}>{t('Details')}</th>
      </tr>
    </thead>
  )
}

export default Thead