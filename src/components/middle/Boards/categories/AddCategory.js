import React from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../../../../actions/categories'
import SingleInput from '../../../Forms/SingleInput'

class AddCategory extends React.Component {
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
          style={{ cursor: 'pointer' }}
          data-position="bottom center"
          data-tooltip="Create category">
          <i className="plus icon" />
        </div>)
    }
  }

  onSubmit = (formValues) => {
    this.props.createCategory(formValues, this.props.boardID)
    this.removeEdit()
  }

  renderNewCategory() {
    if (this.state.itemEditable === true) {
      return (
        <div className="articleIcon header item">
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
        <div className="articleIcon header item"
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          onClick={() => this.showEdit()}>
          {this.showHover()}
          New
        </div>
      )
    }
  }



  render() {
    //console.log('add category state: ', this.props)
    return (
      <div style={{}} className="categories ui secondary text menu" >
        <div className="menu" style={{ width: '100%', backgroundColor: 'white' }}>
          {this.renderNewCategory()}
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

export default connect(mapStateToProps, { createCategory })(AddCategory)