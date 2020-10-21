import React, { useState } from 'react';
import EditPulseName from './EditPulseName'
import { useTranslation } from "react-i18next"


function PulseName(props) {

  const [state, defState] = useState(
    { itemEditable: false });
  const { t, i18n } = useTranslation()
  const renderPrivateIcon = () => {
    if (props.pulse.privateId === props.privateId) {
      return (
        <div
          data-position="bottom center"
          data-tooltip={t("Private")}
        >
          <i className="privacy icon" />
        </div>)
    }
  }
  return (
    <div onDoubleClick={() => defState({ itemEditable: true })}>
      <div
        style={{ cursor: 'auto', position: 'absolute', marginLeft: '-30px', display: 'inline-block', color: '#00A569' }}>
        {renderPrivateIcon(props)}
      </div>
      <div
        style={{ display: 'inline-block', width: '100%' }}>
        <EditPulseName
          pulse={props.pulse}
          editState={state}
          showEdit={() => defState({ itemEditable: true })}
          removeEdit={() => defState({ itemEditable: false })}
        />
      </div>
    </div>
  )
}

export default PulseName