import React from 'react'
import { useDispatch } from "react-redux"
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'

function DropdownAdditions(props) {

  const dispatch = useDispatch()
  const saveField = (title) => {
    dispatch(props.dispatch(props.item.id, { [props.selector]: title }))
  }

  let list = []
  Object.values(props.items).map(item => {
    return list.push({ key: item.id, text: item[props.selector], value: item[props.selector] })
  })

  list = _.uniqBy(list, 'text')
  if (props.item.archived === 'false') {
    return <Dropdown
        style={{ width: '150px' }}
        value={list.currentValue}
        search
        options={list}
        defaultValue={props.item[props.selector]}               
        fluid
        labeled
        allowAdditions
        selection
        placeholder='Dodaj'
        onChange={(e, { value }) => saveField(value)}
        onAddItem={(e, { value }) => saveField(value)}
      />
    
  }
  if (props.item.archived === 'true')
    return (
      <div>
        {props.item[props.selector]}
      </div>
    )
}

export default DropdownAdditions
