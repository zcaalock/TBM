import React from 'react'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../actions/appState'



function DropdownColumnFilter (props) {
    const dispatch = useDispatch();
    const appState = useSelector(state => state.appState)

    const dropDownSelectable = (name, selector) => {
        return <Dropdown.Item
          style={{ zIndex: 10 }}
          onClick={(event) => {
            event.stopPropagation()
            event.nativeEvent.stopImmediatePropagation()
            dispatch(editState({ ...appState.contactsSettings, [selector]: !appState.contactsSettings[selector] }, 'contactsSettings'))
          }}
        >
          <Checkbox
            label={name}
            checked={appState.contactsSettings[selector]}
            style={{ zIndex: -1 }}
          />
        </Dropdown.Item>
      } 
    return (
        <Dropdown
        style={{
          //marginLeft: '15px', 
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
          <Dropdown.Header icon='tags' content='Choose collumns' />
          <Dropdown.Divider />
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Name'
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Phone'
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Mail'
            />
          </Dropdown.Item>
          {dropDownSelectable('Lead Person', 'showLead')}
          {/* {dropDownSelectable('Project', 'showProject')} */}
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Project'
            />
          </Dropdown.Item>          
          <Dropdown.Item>
            <Checkbox
              disabled
              checked
              label='Date'
            />
          </Dropdown.Item>          
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DropdownColumnFilter