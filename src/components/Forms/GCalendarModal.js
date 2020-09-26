import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Modal, Form, Input, Select, Label } from 'semantic-ui-react'
import { editState } from '../../actions/appState'
import { editPulse, fetchPulses } from '../../actions/pulses'
import CREDENTIALS from '../../GCAPI'


function GCalendarModal(props) {
  let calendar = {}


  const ex = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2015-05-28T09:00:00-07:00',
      'timeZone': 'Europe/Warsaw'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00',
      'timeZone': 'Europe/Warsaw'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      { 'email': 'lpage@example.com' },
      { 'email': 'sbrin@example.com' }
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 }
      ]
    }

  }

  const pulseIdSelected = useSelector(state => state.appState.pulseId)
  const appState = useSelector(state => state.appState)
  const pulseKey = useSelector(state => _.keyBy(state.pulses, 'id'))
  const detailsKey = useSelector(state => _.keyBy(state.details, 'id'))




  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [locationShow, setlocationShow] = useState(false)
  const [startTime, setStarttime] = useState(new Date())
  const [startTimeISO, setStartTimeISO] = useState(startTime.toISOString())
  const [endTime, setEndtime] = useState(new Date())
  const [endTimeISO, setEndTimeISO] = useState(endTime.toISOString())
  const [email, setEmail] = useState('')
  const [emailAdress, setEmailadress] = useState(false)


  const [emailShow, setEmailshow] = useState(false)






  const dispatch = useDispatch()

  useEffect(() => {
    setSummary(detailsKey[props.detailId].title)
  }, [])

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  var gapi = window.gapi
  
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const inputEmail = (value) => {
    setEmail(value)
    setEmailadress([{ 'email': value }])
  }

  function handleSubmit() {
    calendar = {
      'summary': summary,
      'location': location,
      'description': description,
      'start': {
        'dateTime': startTimeISO,
        'timeZone': 'Europe/Warsaw'
      },
      'end': {
        'dateTime': endTimeISO,
        'timeZone': 'Europe/Warsaw'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': emailAdress,
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    }

    //console.log('email: ', email)
    //console.log('calendar: ', calendar.start.dateTime)
    //console.log('time: ', calendar)
    gapi.load("client:auth2", () => {
      console.log('client loaded to google')

      gapi.client.init({
        apiKey: CREDENTIALS.API_KEY,
        clientId: CREDENTIALS.CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load("calendar", "v3", () => console.log('logged in'))

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': calendar
          })
          request.execute(calendar => {
            console.log('event: ', calendar)
            window.open(calendar.htmlLink)
          })
        })
    })
    close()
  }


  const activateSubmit = () => { return summary, startTime, endTime === '' ? true : false }
  const defaulCheck = (bool) => {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  const close = () => {
    dispatch(editState('false', 'gCalendarOpen'))
    setSummary('')
    setDescription('')
    setLocation('')
    setStarttime('')
    setEndtime('')
    setEmail('')
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email) || emailShow === false ? false : {
      content: 'Please enter a valid email address',
      pointing: 'below',
    }
  }

  const { gCalendarOpen } = appState

  //console.log(startDate)
  return (
    <div>
      <Modal size='tiny' dimmer='inverted' open={defaulCheck(gCalendarOpen)} onClose={close}>
        <Modal.Header>Create Google Calendar Event</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              onSubmit={() => handleSubmit()}>
              <Form.Field
                id='name'
                name='name'
                control={Input}
                label='Title'
                placeholder='Title'
                defaultValue={summary}
                onChange={(e, { value }) => setSummary(value)}
              />

              <Form.Field
                id='startdatetime'
                label='Start Date & Time'
                style={{ marginBottom: '0px' }}
              />
              <Form.Field >
                <DatePicker
                  selected={startTime}
                  onChange={date => {
                    setStarttime(date)
                    setStartTimeISO(date.toISOString()
                    )
                  }
                  }
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy HH:mm"
                />
              </Form.Field>
              <Form.Field
                id='enddatetime'
                label='End Date & Time'
                style={{ marginBottom: '0px' }}
              />
              <Form.Field >
                <DatePicker
                  selected={endTime}
                  onChange={date => {
                    setEndtime(date)
                    setEndTimeISO(date.toISOString()
                    )
                  }
                }

                  
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy HH:mm"
                />
              </Form.Field>
              <Form.Group>
                <Form.Checkbox
                  onChange={(e, { checked }) => {
                    setlocationShow(checked)
                    setLocation('')
                  }
                  }
                />
                <Form.Field
                  disabled={!locationShow}
                  id='location'
                  name='location'
                  control={Input}
                  label='Location'
                  placeholder='Location'
                  //defaultValue={location}
                  value={location}
                  onChange={(e, { value }) => setLocation(value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Checkbox
                  onChange={(e, { checked }) => {
                    setEmailshow(checked)
                    setEmailadress(false)
                    setEmail('')
                  }
                  }
                />
                <Form.Field
                  disabled={!emailShow}
                  id='form-input-control-error-email'
                  control={Input}
                  label='Email'
                  placeholder='mail@mail.com'
                  onChange={(e, { value }) => inputEmail(value)}
                  value={email}
                  error={validateEmail(email)}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close}>
            Cancel
            </Button>
          <Button
            disabled={activateSubmit()}
            form='my-form'
            onClick={() => handleSubmit()}
            icon='checkmark'
            labelPosition='right'
            content="Create event"
          />
        </Modal.Actions>
      </Modal>

    </div>
  )

}

export default GCalendarModal