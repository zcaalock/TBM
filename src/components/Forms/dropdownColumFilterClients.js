import React from 'react'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../actions/appState'
import { useTranslation } from "react-i18next"

function DropdownColumnFilter(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState)
  const { t } = useTranslation()
  const dropDownSelectable = (name, selector) => {
    return <Dropdown.Item
      style={{ zIndex: 10 }}
      onClick={(event) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        dispatch(editState({ ...appState.clientsSettings, [selector]: !appState.clientsSettings[selector] }, 'clientsSettings'))
        //if (appState.clientsSettings[selector] === undefined) dispatch(editState({ ...appState.clientsSettings, [selector]: false }, 'clientsSettings'))
      }}
    >
      <Checkbox
        label={name}
        checked={appState.clientsSettings[selector]}
        style={{ zIndex: -1 }}
      />
    </Dropdown.Item>
  }
  return (
    <Dropdown
      style={{
        marginLeft: '-10px',
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
        <Dropdown.Header icon='tags' content={t('Choose collumns')} />
        <Dropdown.Divider />
        <Dropdown.Item>
          <Checkbox
            disabled
            checked
            label={t('Name')}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <Checkbox
            disabled
            checked
            label={t('Phone')}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <Checkbox
            disabled
            checked
            label={t('Mail')}
          />
        </Dropdown.Item>
        {dropDownSelectable(t('Lead Person'), 'showLead')}
        {/* {dropDownSelectable('Project', 'showProject')} */}
        <Dropdown.Item>
          <Checkbox
            disabled
            checked
            label={t('Project')}
          />
        </Dropdown.Item>
        {dropDownSelectable(t('Unit'), 'showUnit')}
        {dropDownSelectable(t('Price'), 'showPrice')}
        {dropDownSelectable(t('Reminder'), 'showReminder')}
        {dropDownSelectable(t('Filing Date'), 'showFilingDate')}

        <Dropdown.Item>
          <Checkbox
            disabled
            checked
            label={t('Status')}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownColumnFilter