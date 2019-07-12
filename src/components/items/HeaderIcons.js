import React from 'react'
import DeleteBoard from './DeleteBoard'

class HeaderIcons extends React.Component {
  render() {
    return (
      <div>
        <div
          onClick={() => { this.props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block' }}>
          <i className=" edit icon" />
        </div>
        <div
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Archive"
          style={{
            display: 'inline-block',
            paddingLeft: '10px',
            paddingRight: '10px'
          }}>
          <i className=" archive icon" />
        </div>        
          <DeleteBoard/>        
      </div>
    )
  }
}

export default HeaderIcons
