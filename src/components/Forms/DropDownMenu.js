import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import React from 'react'

class DropDrownMenu extends React.Component {

  renderDropDown() {

    
    return this.props.values.map(value => {
      //console.log(c)   
      //console.log('title: ', value)
      return (
        
        <Dropdown.Item
          key={value.title}
          name={value.title}
          onClick={() => this.props.onSave(value.title)}>
          {value.title}
        </Dropdown.Item>
      )
    })
  }
  render() {
    
    return (
      <div>
        <Dropdown item text={this.props.text}>
          <Dropdown.Menu>
            {this.renderDropDown()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}



export default connect(null)(DropDrownMenu)