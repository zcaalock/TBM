import React from 'react'

class LeadNameIcons extends React.Component {
  render() {
    return (
      <div>
        <div
          onClick={() => { this.props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>                
      </div>
    )
  }
}

export default LeadNameIcons
