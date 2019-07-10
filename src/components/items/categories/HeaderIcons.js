import React from 'react'

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
        <div
          //onClick={() => { this.props.delete() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Delete"
          style={{ display: 'inline-block' }}>
          <i className=" trash icon" />
        </div>
      </div>
    )
  }
}

export default HeaderIcons