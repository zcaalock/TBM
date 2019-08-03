import React from 'react'
import EditBoardName from './EditBoardName'
import HeaderIcons from './HeaderIcons'


class Header extends React.Component {
  state = { itemEditable: false }


  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  render() {
    return (

      <div className="head-vertical-segment" style={{width: '100%'}}>
        <div style={{ float: 'left', width: '90%' }}>
          <EditBoardName
            title={this.props.title}
            board={this.props.board}
            editState={this.state}
            showEdit={() => this.showEdit()}
            removeEdit={() => this.removeEdit()}
          />
        </div>
        <div style={{ float: 'right', paddingRight: '22px' }}>          
          <div
            className="articleIcon"
            style={{ display: 'inline-block' }}>
            <HeaderIcons showEdit={()=>this.showEdit()} />
          </div>
        </div>
      </div>
    )
  }
}

export default Header