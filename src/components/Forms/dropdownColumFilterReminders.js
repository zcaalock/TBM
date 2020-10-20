import React, {useState, useEffect} from 'react'
import { Form, Dropdown, Input } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../actions/appState'



function DropdownColumnReminders(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState)
  const [past, setPast] = useState(Math.abs(appState.reminderSettings.pastDays))
  const [future, setFuture] = useState('')

  
  const checkError = (selector) => {
    return selector <= 0 ? true: false
  }

  const submit = (value, selector) => {
    if(value > 0 && selector === 'past' ) dispatch(editState({ ...appState.reminderSettings, pastDays: -Math.abs(value) }, 'reminderSettings'))
    if(value > 0 && selector === 'future' ) dispatch(editState({ ...appState.reminderSettings, futureDays: Math.abs(value) }, 'reminderSettings'))
    
    
  }

  return (
    <Dropdown
      style={{
        marginLeft: '177px',
        color: '#cecece',
        position: 'absolute'
        //border: '1px solid rgba(34,36,38,.15)',
        // borderRadius: '5px',
        //padding: '.5833em .833em',
        // margin: '0 .14285714em'
      }}
      compact
      className='mouseHoverBlack'
      icon='filter'
      floating      
    >
      <Dropdown.Menu       
        onClick={(event) => {
          event.stopPropagation()
          event.nativeEvent.stopImmediatePropagation()
        }}
      >
        <Dropdown.Header icon='tags' content='Select days' />
        <Dropdown.Divider />
        <Dropdown.Item >
          <Form >
            <Form.Field error={checkError(past)} inline style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <label>Past days:</label>
              <input  onChange={(v) =>{ if(v.target.value >= 0 ) dispatch(editState({ ...appState.reminderSettings, pastDays: -Math.abs(v.target.value) }, 'reminderSettings'))}} value={-appState.reminderSettings.pastDays} style={{width: '75px'}} type="number" placeholder='12' />
            </Form.Field>
          </Form>
        </Dropdown.Item>
        <Dropdown.Item>
          <Form>
            <Form.Field inline>
              <label>Future Days</label>
              <input  onChange={(v) =>{ if(v.target.value >= 0 ) dispatch(editState({ ...appState.reminderSettings, futureDays: Math.abs(v.target.value) }, 'reminderSettings'))}} value={appState.reminderSettings.futureDays} style={{width: '75px'}} type="number" placeholder='12' />
            </Form.Field>
          </Form>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownColumnReminders