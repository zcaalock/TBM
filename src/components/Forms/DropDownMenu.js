import { Dropdown } from 'semantic-ui-react'
import React from 'react'

function DropDrownMenu (props) {

  const renderDropDown = () => {    
    if(!props.values){
      return <div class="ui active inline loader"></div>
    }
    return props.values.map(value => {      
      return (        
        <Dropdown.Item
          key={value.id}
          name={value.title}
          onClick={() => props.onSave(value.title)}>
          {value.title}
        </Dropdown.Item>
      )
    })
  }    
    return (
      <div>
        <Dropdown item text={props.text}>
          <Dropdown.Menu>
            {renderDropDown()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
}


export default DropDrownMenu