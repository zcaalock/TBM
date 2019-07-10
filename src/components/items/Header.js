import React from 'react'
import EditBoardName from '../boards/EditBoardName'

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

      <div className="head-vertical-segment" style={{width: '70%'}}>
        <div style={{ float: 'left' }}>
          
          <EditBoardName 
          title={this.props.title} 
          board={this.props.board} 
          editState={this.state} 
          showEdit={()=>this.showEdit()} 
          removeEdit={()=>this.removeEdit()} 
          />
          
        </div>
        <div style={{ float: 'right' }}>
          <div onClick={() => { this.showEdit() }} className="articleIcon" data-position="bottom center" data-tooltip="Edit" style={{ display: 'inline-block' }}><i className=" edit icon" /></div>
          <div className="articleIcon" data-position="bottom center" data-tooltip="Archive" style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}><i className=" archive icon" /></div>
          <div onClick={() => { this.props.delete() }} className="articleIcon" data-position="bottom center" data-tooltip="Delete" style={{ display: 'inline-block' }}><i className=" trash icon" /></div>
        </div>
      </div>
    )


  }

}

export default Header