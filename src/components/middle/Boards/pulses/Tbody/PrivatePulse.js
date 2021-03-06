import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { editPulse } from '../../../../../actions/pulses'
import { useTranslation } from "react-i18next"

function ArchivePulse (props) {
  
  const user = useSelector(state => state.user.credentials)  
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const renderArchive = () => {     

    if (props.pulse.privateId && props.pulse.privateId === user.userId) {
      return (
        <div
          onClick={() => dispatch(editPulse(props.pulse.id, { privateId: '' }))}
          data-position="left center"
          data-tooltip={t("Make public")}
          style={{ 
            display: 'inline-block', 
            color: '#00A569', 
            //paddingRight: '5px', 
            cursor: 'pointer' }}>
          <i className=" privacy icon" />
        </div>
      )
    }

    if (props.pulse.privateId === '')
      return (
        <div
          onClick={() => dispatch(editPulse(props.pulse.id, { privateId: user.userId }))}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip={t("Make private")}
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" privacy icon" />
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



