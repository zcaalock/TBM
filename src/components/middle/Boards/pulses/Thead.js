import React from 'react'
import { useTranslation } from "react-i18next"


function Thead() {
const { t } = useTranslation()
  return (
    <thead >
      <tr >
        <th style={{ paddingLeft: '10px', width: '' }}>{t('Title')}</th>
        <th style={{ width: '15%', minWidth: '100px' }}>{t('Lead Person')}</th>
        <th style={{ width: '120px' }}>{t('Status')}</th>
        <th style={{ width: '165px' }}>{t('Deadline')}</th>
        <th style={{ width: '10%' }}>{t('Details')}</th>
      </tr>
    </thead>
  )
}

export default Thead