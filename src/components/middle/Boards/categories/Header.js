import React from 'react'
import _ from 'lodash'
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
  mapNotifications(){
    let notoficationStorage = 0
    const pulsesPB = _.filter(this.props.pulses, { categoryId: this.props.id })
    pulsesPB.map(pulse => {
      let findUser = undefined
      if (pulse.readed) pulse.readed.forEach(read => { if (read === this.props.privateId) return findUser = true })
      if (pulse.readed && pulse.readed.length > 0 && findUser !== true) return notoficationStorage++
      return null
    })
    return notoficationStorage
    
  }
  render() {
    
    return (
      <div style={{}} className="categories ui secondary text menu" >
        <div className="menu" style={{ width: '100%' }}>
          <div
            onMouseLeave={() => this.hideIcon()}
            onMouseEnter={() => this.showIcon()}
            onClick={() => this.props.expandCollapse()}
            className="header item" style={{cursor: 'pointer'}}>
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
        <div className="header item" style={{ float: 'right', paddingRight: '25px' }}>
          <HeaderIcons
            showEdit={() => this.showEdit()}
            categoryId={this.props.categoryKey}
            notifications={this.mapNotifications()}
            appState={this.props.appState}
          />
        </div>
      </div>
    )
  }
}

export default Header