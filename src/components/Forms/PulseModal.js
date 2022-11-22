import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { Button, Modal, Form, Divider, Grid, Segment } from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import { editPulse } from '../../actions/pulses'
import { editState } from '../../actions/appState'
import { useTranslation } from "react-i18next"


function PulseModal() {
  const appState = useSelector(state => state.appState)
  const pulse = useSelector(state => state.pulses[appState.pulseId])
  const [time, setTime] = useState(pulse.duration ? pulse.duration : 0);
  const [running, setRunning] = useState(false);
  const name = pulse.title
  const { t } = useTranslation()   
  const dispatch = useDispatch();

  const onSubmit = (pulse, value) => {
    
    dispatch(editPulse(pulse.id, { duration: value }))
  }

  const close = (pulse, value) => {
    dispatch(editState(false, 'pulseOpen'))
    dispatch(editPulse(pulse.id, { duration: value }))    
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={appState.pulseOpen} onClose={()=>close(pulse, time)}>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            StopWatch
            <div className="stopwatch">
              <div className="numbers">
                <span>{("0" + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}h:</span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}m:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}s:</span>

              </div>
              <div className="buttons">
                <button onClick={() => setRunning(true)}>Start</button>
                <button onClick={() => { setRunning(false); onSubmit(pulse, time);}}>Stop</button>
                <button onClick={() => { setTime(0); onSubmit(pulse, 0) }}>Reset</button>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button            
            form='my-form'
            onClick={()=> {onSubmit(pulse, time);close(pulse, time)}}
            icon='checkmark'
            labelPosition='right'
            content={t("Close")}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default PulseModal