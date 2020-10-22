import React from 'react'
import _ from 'lodash'
import ProgressBar from './ProgressBar'
import { useTranslation } from "react-i18next"

function DetailProgressBar(props) {
  const { t } = useTranslation()

  const renderProgressBar = (id) => {
    //console.log('archived:', props.pulse.archived )
    const details = _.filter(props.details, { pulseId: id })
    const checked = _.filter(props.details, { pulseId: id, check: "true" })

    if (details.length > 0 && props.pulse.archived === 'false') {
      const value = checked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar value={value * 100} />
    }
    if (props.pulse.archived === 'true') {
      return <div style={{ color: 'rgb(220, 105, 105)' }}>{t('Archived')}</div>
    }
  }

  const details = _.filter(props.details, { pulseId: props.pulse.id })
  const checked = _.filter(props.details, { pulseId: props.pulse.id, check: "true" })
  if (details.length > 0 && props.pulse.archived === 'false') return (
    <div style={{ display: 'inline-block' }}>
      <div style={{ display: 'inline-block', width: '100px' }} >{renderProgressBar(props.pulse.id)} </div>
      <div style={{ display: 'inline-block', position: 'absolute', marginLeft: '-60px', paddingTop: '3px' }}>{checked.length}/{details.length}</div>
    </div>
  )
  if (props.pulse.archived === 'true') {
    return <div style={{ color: 'rgb(220, 105, 105)' }}>{t('Archived')}</div>
  }
  return <div></div>
}

export default DetailProgressBar