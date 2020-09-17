import React from 'react'
import { connect } from 'react-redux'
import { createDetail} from '../../../actions/details'
import {editPulse} from '../../../actions/pulses'
import SingleInput from '../../Forms/SingleInput'

class AddDetail extends React.Component {
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
        <div data-position="bottom center"
        data-tooltip="Add check list item">
          <i className="plus icon"  />
        </div>)
    }
  }

  onSubmit = (formValues) => {
    this.props.createDetail(formValues, this.props.pulseId)
    this.removeEdit()
    this.props.editPulse(this.props.pulseId, {readed: [this.props.userId]})
  }

  renderNewDetail() {
    if (this.state.itemEditable === true) {
      return (
        <div className="">
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
        <div className=""
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          onDoubleClick={() => this.showEdit()}>
          <div style={{cursor: 'pointer'}}>
            <div onClick={() => this.showEdit()} style={{display: 'inline-block'}}>{this.showHover()}</div>
            <div style={{display: 'inline-block'}}>Add item</div>
          </div>         
        </div>
      )
    }
  }



  render() {
    //console.log('add category state: ', this.props)
    return (
      <div style={{}} className="articleIcon" >
        <div className="menu" style={{ width: '100%', paddingLeft: '50px' }}>          
          {this.renderNewDetail()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    boardID: state.appState.id,
    userId: state.user.credentials.userId

  }
}

export default connect(mapStateToProps, { createDetail, editPulse })(AddDetail)