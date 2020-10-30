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
        dispatch(editState({ ...appState.competitionsSettings, [selector]: !appState.competitionsSettings[selector] }, 'competitionsSettings'))
        //if (appState.competitionsSettings[selector] === undefined) dispatch(editState({ ...appState.competitionsSettings, [selector]: false }, 'competitionsSettings'))
      }}
    >
      <Checkbox
        label={name}
        checked={appState.competitionsSettings[selector]}
        style={{ zIndex: -1 }}
      />
    </Dropdown.Item>
  }
  return (
    <Dropdown
      style={{
        marginLeft: '-10px',
        color: '#cecece',
        border: '1px solid rgba(34,36,38,.15)',
        borderRadius: '5px',
        padding: '.5833em .833em',
        margin: '0 .14285714em'
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
            label={t('Web page')}
          />
        </Dropdown.Item>
        {dropDownSelectable(t('Project'), 'showProject')}        
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