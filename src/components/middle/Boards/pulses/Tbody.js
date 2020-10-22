import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import history from '../../../../history'
import { editPulse } from '../../../../actions/pulses'
import { fetchDetails } from '../../../../actions/details'
import { editState } from '../../../../actions/appState'
import PulseName from './Tbody/PulseName'
import LeadPerson from './Tbody/LeadPerson'
import StatusList from './Tbody/StatusList'
import DetailProgrsBar from '../../../Forms/DetailProgrsBar'
import Deadline from '../../Boards/pulses/Tbody/Deadline'
import { useTranslation } from "react-i18next"

function Tbody(props) {

  const pulses = useSelector(state => Object.values(state.pulses));
  const details = useSelector(state => Object.values(state.details));
  const privateId = useSelector(state => state.user.credentials.userId);
  const appState = useSelector(state => state.appState)
  const lead = useSelector(state => _.find(state.lead, {userId: privateId}))

  const dispatch = useDispatch();
const { t } = useTranslation() 
  useEffect(() => {
    if (isEmpty(pulses)) dispatch(fetchDetails())
  }, [])

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const goLink = (pulse) => {
    dispatch(editState(pulse.id, 'pulseId'))
    history.push(`/boards/${appState.id}/pulses/${pulse.id}`)

    let findUser = undefined
    if (pulse.readed) pulse.readed.forEach(read => { if (read === privateId) return findUser = true })
    if (pulse.readed && pulse.readed.length > 0 && findUser === undefined) dispatch(editPulse(pulse.id, { readed: [...pulse.readed, privateId] }))
  }

  const renderSelect = (pulseId) => {
    if (appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
  }  

  const renderPulses = () => {

    const id = props.categoryId
    let pulsesFiltered = _.filter(pulses, (lead.settings.showArchived === false) ? { categoryId: id, archived: 'false' } : { categoryId: id })

    return pulsesFiltered.map(pulse => {
      if (pulse.privateId === '' || pulse.privateId === privateId)
        return (
          <tr key={pulse.id} style={renderSelect(pulse.id)} className='tableRow' onClick={() => goLink(pulse)}>
            <td style={{ paddingLeft: '10px', width: '' }} data-label="Name">
              <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} privateId={privateId} />
            </td>
            <td data-label="LeadPerson" style={{ overflow: "visible", minWidth: '100px' }}>
              <LeadPerson pulse={pulse} />
            </td>
            <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
              <StatusList pulse={pulse} />
            </td>
            <td style={{ width: '165px' }}>
              <Deadline pulse={pulse} />
            </td>
            <td style={{ width: '10%' }} >
              <DetailProgrsBar details={details} pulse={pulse} />
              {renderPulseNotification(pulse)}
            </td>
          </tr>
        )
      return null
    })
  }

  const renderPulseNotification = (pulse) => {
    let findUser = undefined
    if (pulse.readed) pulse.readed.forEach(read => { if (read === privateId) return findUser = true })
    if (pulse.readed && pulse.readed.length > 0 && findUser === undefined && lead.settings.notifications === true && pulse.privateId === '' && pulse.archived === 'false') return <div className='notification' data-tooltip={t("Unreaded content")}>i</div>
  }

  return (
    <tbody>
      {renderPulses()}
    </tbody>
  )
}

export default Tbody