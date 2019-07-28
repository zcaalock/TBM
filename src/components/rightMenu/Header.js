import React from 'react'
import HeaderIcons from './HeaderIcons'

class Header extends React.Component {

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
        <div>
          <i className="sort icon" />
        </div>)
    }
  }

  render() {
    return (
      <div className="rightMenu-header" style={{padding: '' }}>
        <div className='' style={{ display: 'inline-block' }}>
          <h3>
            {this.props.title}
          </h3>
        </div>
        <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px', paddingRight: '13px' }}>
          <HeaderIcons
            showEdit={() => this.showEdit()}
            pulseId={this.props.pulseId}
          />
        </div>
      </div>
    )
  }
}

export default Header