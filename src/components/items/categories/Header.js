import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <div style={{}} className="categories ui secondary text menu" >
        <div className="menu" style={{ width: '100%' }}>
          <div className="header item" style={{}}>
            {this.props.categoryTitle}
          </div>
        </div>
      </div>
    )
  }
}

export default Header