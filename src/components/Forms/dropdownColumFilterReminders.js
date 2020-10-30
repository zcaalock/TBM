import React from 'react'
import { Form, Dropdown, Checkbox } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux"
import { editState } from '../../actions/appState'
import { useTranslation } from "react-i18next"

function DropdownColumnReminders(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState)
  const { t } = useTranslation()

  const dropDownSelectable = (name, selector) => {
    return <Dropdown.Item
      style={{ zIndex: 10 }}
      onClick={(event) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        if (appState.reminderSettings[selector]) dispatch(editState({ ...appState.reminderSettings, [selector]: !appState.reminderSettings[selector] }, 'reminderSettings'))
        if (!appState.reminderSettings[selector])dispatch(editState({ ...appState.reminderSettings, [selector]: true }, 'reminderSettings'))
      }}
    >
      <Checkbox
        label={name}
        checked={appState.reminderSettings[selector] ? appState.reminderSettings[selector] : false}
        style={{ zIndex: -1 }}
      />
    </Dropdown.Item>
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
      pointing='left'
    >
      <Dropdown.Menu
        onClick={(event) => {
          event.stopPropagation()
          event.nativeEvent.stopImmediatePropagation()
        }}
      >
        <Dropdown.Header icon='tags' content={t('Select days')} />
        <Dropdown.Item >
          <Form >
            <Form.Field >
              <label>{t('Past days')}:</label>
              <input onChange={(v) => { if (v.target.value >= 0) dispatch(editState({ ...appState.reminderSettings, pastDays: -Math.abs(v.target.value) }, 'reminderSettings')) }} value={-appState.reminderSettings.pastDays} type="number" placeholder='12' />
            </Form.Field>
          </Form>
        </Dropdown.Item>
        <Dropdown.Item>
          <Form>
            <Form.Field >
              <label>{t('Future Days')}</label>
              <input onChange={(v) => { if (v.target.value >= 0) dispatch(editState({ ...appState.reminderSettings, futureDays: Math.abs(v.target.value) }, 'reminderSettings')) }} value={appState.reminderSettings.futureDays} type="number" placeholder='12' />
            </Form.Field>
          </Form>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header icon='tags' content={`${t('Filters')}:`} />
        {dropDownSelectable(`${t('Show status')}: ${t(`Continous`)}`, 'showContinous')}
        {dropDownSelectable(`${t('Show status')}: ${t(`Clients`)}`, 'showClients')}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownColumnReminders