import React from 'react'
import EditLeadName from './EditLeadName'
import LeadNameIcons from './LeadNameIcons'


class LeadName extends React.Component {
  state = { itemEditable: false }


  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  render() {
    return (

      <div >
        <div style={{ display: 'inline-block' }}>          
          <EditLeadName lead={this.props.lead} userId={this.props.userId} editState={this.state} showEdit={() => this.showEdit()} removeEdit={() => this.removeEdit()}/>
        </div>
        <div className="articleIcon" style={{ display: 'inline-block' }}>
          <LeadNameIcons showEdit={() => this.showEdit()} />
        </div>        
      </div>
    )
  }
}

export default LeadName