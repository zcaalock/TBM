import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addHours from 'date-fns/addHours'
import { Button, Modal, Form, Input, Message, Select } from 'semantic-ui-react'
import { editState } from '../../../actions/appState'
import CREDENTIALS from '../../../GCAPI'
import { useTranslation } from "react-i18next"


function GCalendarModal(props) {
  let calendar = {}
  
  const calendarIdArr = [
    { key: 'primary', 'text': 'Main', 'value': 'primary' },
    { key: 'tgbh1iaftfa92bo9k6qb1c1i58@group.calendar.google.com', 'text': 'Tribeach', 'value': 'tgbh1iaftfa92bo9k6qb1c1i58@group.calendar.google.com' }
  ]


  // const ex = {
  //   'summary': 'Google I/O 2015',
  //   'location': '800 Howard St., San Francisco, CA 94103',
  //   'description': 'A chance to hear more about Google\'s developer products.',
  //   'start': {
  //     'dateTime': '2015-05-28T09:00:00-07:00',
  //     'timeZone': 'Europe/Warsaw'
  //   },
  //   'end': {
  //     'dateTime': '2015-05-28T17:00:00-07:00',
  //     'timeZone': 'Europe/Warsaw'
  //   },
  //   'recurrence': [
  //     'RRULE:FREQ=DAILY;COUNT=2'
  //   ],
  //   'attendees': [
  //     { 'email': 'lpage@example.com' },
  //     { 'email': 'sbrin@example.com' }
  //   ],
  //   'reminders': {
  //     'useDefault': false,
  //     'overrides': [
  //       { 'method': 'email', 'minutes': 24 * 60 },
  //       { 'method': 'popup', 'minutes': 10 }
  //     ]
  //   }
  // }

  const appState = useSelector(state => state.appState)  

  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [locationShow, setlocationShow] = useState(false)
  const [startTime, setStarttime] = useState(new Date())
  const [startTimeISO, setStartTimeISO] = useState(new Date().toISOString())
  const [endTime, setEndtime] = useState(new Date())
  const [endTimeISO, setEndTimeISO] = useState(new Date().toISOString())
  const [email, setEmail] = useState('')
  const [emailAdress, setEmailadress] = useState(false)
  const [calendarName, setCalendarName] = useState(calendarIdArr[1].key)
  const [openCalendar, setopenCalendar] = useState(false)
  const [errorDate, setErrorDate] = useState(false)
  const [errorEmail, setErroremail] = useState(false) 
  const [emailShow, setEmailshow] = useState(false)

  const dispatch = useDispatch()
  const { t } = useTranslation()
  useEffect(() => {    
    dispatch(editState('', 'error'))
    dispatch(editState('', 'submited'))
  }, [])

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
      'recurrence': false,
      'attendees': emailAdress,
      'reminders': {
        'useDefault': true,
        // 'overrides': [
        //   { 'method': 'email', 'minutes': 24 * 60 },
        //   { 'method': 'popup', 'minutes': 10 }
        // ]
      }
    }

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
            'calendarId': calendarName,
            'resource': calendar,
            'sendUpdates': 'externalOnly'
          })
          request.execute(calendar => {
            console.log('event: ', calendar)            
            if (openCalendar === true) window.open(calendar.htmlLink) 
            if (calendar.error !== undefined) dispatch(editState('generic', 'error'))
            else {
              dispatch(editState('Event created in Calendar', 'submited'))
              close()
            }

          })
        })
        .catch((err) => {          
          if (err) dispatch(editState('generic', 'error'))
        })
    })    
  }  

  const close = () => {
    dispatch(editState(false, 'modalOpen'))
    setSummary('')
    setDescription('')
    setLocation('')
    setStarttime('')
    setEndtime('')
    setEmail('')
  }

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email) === true) {
      setErroremail(false)      
    }
    if (re.test(email) === false) {
      setErroremail(true)      
    }

  } 

  function validateDate(date) {
    if (new Date(startTimeISO).getTime() - new Date(date).getTime() > 0) {
      setErrorDate(true)      
    }

    if (new Date(startTimeISO).getTime() - new Date(date).getTime() <= 0) {
      setErrorDate(false)      
    }
  } 

  function showError() {
    if (appState.error === 'generic') {
      setTimeout(() => { dispatch(editState('', 'error')) }, 4000)
      return <Message negative>
        <Message.Header>{t('Something went wrong')}</Message.Header>
        <p>{t('Try again')}</p>
      </Message>
    }
  }
  
  return (
    <>      
        <Modal.Header>{t('Create Google Calendar Event')}</Modal.Header>
        {showError()}
        <Modal.Content>
          <Modal.Description>
            <Form
              onSubmit={() => handleSubmit()}>
              <Form.Field
                id={`name_${props.detailId}`}
                name='name'
                control={Input}
                label={t('Title')}
                placeholder={t('Title')}
                //defaultValue={props.detailTitle}
                onChange={(e, { value }) => setSummary(value)}
              />
              <Form.Field
                id={`description_${props.detailId}`}
                name='decription'
                control={Input}
                label={t('Description')}
                placeholder={t('Description')}
                //defaultValue={description}
                onChange={(e, { value }) => setDescription(value)}
              />
              <Form.Field
                search
                //disabled={activateLeadField()}
                name='calendarId'
                control={Select}
                //onFocus={this.handleBoardList()}
                options={calendarIdArr}
                //value='Alek'
                label={t('Calendar Id')}
                placeholder={calendarIdArr[1].text}
                //searchInput={{ id: 'id' }}
                onChange={(e, { value }) => setCalendarName(value)}
              />
              <Form.Field
                id='startdatetime'
                label={t('Start Date & Time')}
                style={{ marginBottom: '0px' }}
              />
              <Form.Field >
                <DatePicker
                  selected={startTime}
                  onChange={date => {
                    setStarttime(date)
                    setStartTimeISO(date.toISOString())
                    setEndtime(addHours(date, 1))
                    setEndTimeISO(addHours(date, 1).toISOString())
                    //console.log(addHours(date, 1).toISOString())
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
                error={errorDate === true ? {
                  content: 'End date cannot be before start date',
                  pointing: 'below'
                } : false}
                id='enddatetime'
                label={t('End Date & Time')}
                style={{ marginBottom: '0px' }}
              />
              <Form.Field error={errorDate}>
                <DatePicker
                  selected={endTime}
                  onChange={date => {
                    setEndtime(date)
                    setEndTimeISO(date.toISOString())
                    validateDate(date.toISOString())
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
                  label={t('Location')}
                  placeholder={t('Location')}
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
                    setErroremail(false)
                  }
                  }
                />
                <Form.Field
                  disabled={!emailShow}
                  id='form-input-control-error-email'
                  control={Input}
                  label='E-mail'
                  style={{ width: 'auto' }}
                  placeholder='mail@mail.com'
                  onChange={(e, { value }) => {
                    inputEmail(value)
                    validateEmail(value)
                  }
                  }
                  value={email}
                  error={errorEmail === true ? {
                    content: t('Please enter a valid email address'),
                    pointing: 'left',
                    width: 'auto'
                  } : false}
                />
                {/* {renderEmailAdress(emailAdress)} */}
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Form.Checkbox
            style={{display: 'inline-block', float: 'left', marginTop: '10px', marginLeft: '5px'}}
            onChange={(e, { checked }) => {setopenCalendar(!openCalendar)}
            }
            label={t('Open calendar')}
          />
          <Button onClick={close}>
            {t('Cancel')}
            </Button>
          <Button
            disabled={summary === '' || errorDate === true || errorEmail === true ? true : false}
            form='my-form'
            onClick={() => handleSubmit()}
            icon='checkmark'
            labelPosition='right'
            content={t("Create Event")}
          />
        </Modal.Actions>
    </>
  )
}

export default GCalendarModal