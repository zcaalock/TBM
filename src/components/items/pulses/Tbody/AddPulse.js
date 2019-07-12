import React from 'react'
import { connect } from 'react-redux'
import { createPulse } from '../../../../actions/pulses'
import SingleInput from '../../../Forms/SingleInput'

class AddPulse extends React.Component {
  state = { isHovering: false, itemEditable: false }

  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  hideIcon() {
    this.setState({ isHovering: false })
  }

  showIcon() {
    this.setState({ isHovering: true })
  }

  showHover() {
    if (this.state.isHovering === true) {
      return (
        <div 
          data-position="bottom center"
          data-tooltip="Create pulse">
          <i className="plus icon" />
        </div>)
    }
  }

  onSubmit = (formValues) => {
    this.props.createPulse(formValues, Number(this.props.categoryId)) 
    this.removeEdit()
  }

  renderNewPulse() {
    if (this.state.itemEditable === true) {
      return (
        <div style={{ width: '100%' }}>
          <SingleInput
            propStyle={{}}
            propChildStyle={{ padding: '5px' }}
            removeEdit={() => this.removeEdit()}
            onSubmit={this.onSubmit} />
        </div>
      )
    }

    if (this.state.itemEditable === false) {
      return (
        <div style={{ width: '100%' }}
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          onClick={() => this.showEdit()}>
          <div style={{display: 'inline-block'}}>{this.showHover()}</div>
          <div style={{display: 'inline-block'}}>New</div>
        </div>
      )
    }
  }



  render() {
    //console.log('add category state: ', this.props)
    return (
      <tfoot>
        <tr  >
          <td className="tableNewPulse" style={{ paddingLeft: '10px', cursor: 'pointer' }} data-label="Name">
            {this.renderNewPulse()}
          </td>
          <td colSpan="2">
          </td>
        </tr>
      </tfoot>
    )
  }
}


export default connect(null, { createPulse })(AddPulse)