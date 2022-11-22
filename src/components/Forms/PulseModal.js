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

  const name = pulse.title
  const { t } = useTranslation()   
  const dispatch = useDispatch();

  //const [time, setTime] = useState(pulse.duration ? pulse.duration : 0);
  const [time, setTime] = useState(pulse.duration ? pulse.duration : 0);  
  const [currentTime, setCurrentTime] = useState(0)
  const [startTime, setStartTime] = useState(pulse.duration ? pulse.duration : 0)
  const [running, setRunning] = useState(false);

  const onSubmit = (pulse, value) => {
    
    dispatch(editPulse(pulse.id, { duration: value }))
  }

  const close = (pulse, value) => {
    dispatch(editState(false, 'pulseOpen'))
    dispatch(editPulse(pulse.id, { duration: value }))    
  }

  //console.log('time:',time)

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((Date.now()-currentTime+startTime) );
      }, 1000);
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
                <span>{("0" + Math.floor((time/ (1000 * 60 * 60)) % 24)).slice(-2)}h:</span>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}m:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}s:</span>

              </div>
              <div className="buttons">
                <button onClick={() => { setCurrentTime(Date.now()); setRunning(true)}}>Start</button>
                <button onClick={() => { setStartTime(time); setRunning(false); setCurrentTime(Date.now()) }}>Stop</button>
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