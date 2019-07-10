import React from 'react'

class Header extends React.Component {

  state = { isHovering: true }

  hideIcon() {

    this.setState({isHovering: false})
  }

  showIcon() {
    this.setState({isHovering: true})
  }

  showHover() {
    if (this.state.isHovering === true) {
      return (
        <div>
          <i className="caret square up outline icon" />
        </div>)
    }
  }


  render() {
    return (
      <div style={{}} className="categories ui secondary text menu" >
        <div className="menu" style={{ width: '100%' }}>
          <div
            className="header item"
            style={{}}
            onMouseLeave={() => this.hideIcon()}
            onMouseEnter={() => this.showIcon()}
            onClick={() => this.props.collapse()}>
            {this.showHover()}
            {this.props.categoryTitle}
          </div>
        </div>
      </div>
    )
  }
}

export default Header