import React from 'react'
import HeaderIcons from './HeaderIcons'
import EditHeaderName from './editHeaderName'

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
      <div style={{width:'69.1%'}} className="categories ui secondary text menu" >
        <div className="menu" style={{ width: '100%' }}>
          <div
            onMouseLeave={() => this.hideIcon()}
            onMouseEnter={() => this.showIcon()}
            onClick={() => this.props.expandCollapse()}
            className="header item" style={{}}>
            {this.showHover()}
            {/* {this.props.categoryTitle} */}
            <EditHeaderName
              title={this.props.categoryTitle}
              category={this.props.category}
              editState={this.state}
              showEdit={() => this.showEdit()}
              removeEdit={() => this.removeEdit()}
            />
          </div>
        </div>
        <div className="header item" style={{ float: 'right' }}>
          <HeaderIcons
            showEdit={() => this.showEdit()}
            categoryId={this.props.categoryKey}
          />
        </div>
      </div>
    )
  }
}

export default Header