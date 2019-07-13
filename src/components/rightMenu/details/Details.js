import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchDetails, editDetail } from '../../../actions/details'

class Details extends React.Component {
  

  componentDidMount() {
    this.props.fetchDetails()
  }

  renderCrossOut(bool) {
    if (bool === true) {
      return { textDecoration: 'line-through' }
    }
    return {}
  }
  renderCheckBox(bool) {
    if (bool === true) {
      return true
    }
    return false
  }

  

  renderDetails() {
    const id = Number(this.props.pulseId)
    const details = _.filter(this.props.details, { pulseId: id })
    
    return details.map(detail => {
      return (
        <div key={detail.id} className='item'>
          <div
            style={{ display: 'inline-block' }}>
            <Checkbox
              onClick={() => this.props.editDetail(detail.id, { check: !detail.check })}
              defaultChecked={this.renderCheckBox(detail.check)}
              style={{ marginBottom: '-4px' }} />
          </div>
          <div style={{ display: 'inline-block', paddingLeft: '10px', cursor: 'default' }}><div className="blackHover" style={this.renderCrossOut(detail.check)}>{detail.title}</div></div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='ui vertical text menu' style={{minHeight: '0'}}>
        {this.renderDetails()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    details: Object.values(state.details)
  }
}

export default connect(mapStateToProps, { fetchDetails, editDetail })(Details)