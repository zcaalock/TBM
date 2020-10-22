import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { editPulse } from '../../../../../actions/pulses'
import { useTranslation } from "react-i18next"


function ArchivePulse(props) {

  const pulses = useSelector(state => state.pulses)   
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const renderArchive = () => {       
    if (pulses[props.pulseId] && pulses[props.pulseId].archived === 'true') return (
        <div
          onClick={() => dispatch(editPulse(props.pulseId, { archived: 'false' }))}
          data-position="left center"
          data-tooltip={t("Unarchive")}
          style={{ display: 'inline-block', color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
          <i className=" archive icon" /> {t('Archived')}
        </div>)
      
    if (pulses[props.pulseId]&& pulses[props.pulseId].archived === 'false')  return (
      <div
        onClick={() => dispatch(editPulse(props.pulseId, { archived: 'true' }))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip={t("Archive")}
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>
    )
  }

  return (
    <>
      {renderArchive()}
    </>
  )
}

export default ArchivePulse
