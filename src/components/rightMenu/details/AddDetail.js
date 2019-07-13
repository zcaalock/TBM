import React from 'react'
import { connect } from 'react-redux'
import { createDetail } from '../../../actions/details'
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
        data-tooltip="Add item">
          <i className="plus icon"  />
        </div>)
    }
  }

  onSubmit = (formValues) => {
    this.props.createDetail(formValues, Number(this.props.pulseId))
    this.removeEdit()
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
            <div style={{display: 'inline-block'}}>New</div>
          </div>         
        </div>
      )
    }
  }



  render() {
    //console.log('add category state: ', this.props)
    return (
      <div style={{}} className="tableNewDetail" >
        <div className="menu" style={{ width: '100%' }}>          
          {this.renderNewDetail()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    boardID: state.appState.id
  }
}

export default connect(mapStateToProps, { createDetail })(AddDetail)