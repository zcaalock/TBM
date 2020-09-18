import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createPulse, createPrivatePulse } from '../../../../../actions/pulses'
import SingleInput from '../../../../Forms/SingleInput'

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
    if(this.props.boards[this.props.boardId].privateId === '') this.props.createPulse(formValues, this.props.categoryId, this.props.userId,)
    if(this.props.boards[this.props.boardId].privateId === this.props.userId) this.props.createPrivatePulse(formValues, this.props.categoryId, this.props.userId)
    this.removeEdit()

  }

  renderName(){
    if(this.props.boards[this.props.boardId].privateId === '')
    return <div>{this.renderNewPulse('New Pulse')}</div>
    if(this.props.boards[this.props.boardId].privateId === this.props.userId)
    return <div>{this.renderNewPulse('New Private Pulse')}</div>
  }

  renderNewPulse(name) {
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
        <div style={{ width: '100%', paddingBottom: '15px' }}
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          onClick={() => this.showEdit()}>
          <div style={{display: 'inline-block'}}>{this.showHover()}</div>
          <div style={{display: 'inline-block'}}>{name}</div>
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
            {/* {this.renderNewPulse()} */}
            {this.renderName()}
          </td>
          <td colSpan="2">
          </td>
        </tr>
      </tfoot>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    boards: _.keyBy(Object.values(state.boards), 'id'),
    userId: state.user.credentials.userId
  }
}


export default connect(mapStateToProps, { createPulse, createPrivatePulse  })(AddPulse)