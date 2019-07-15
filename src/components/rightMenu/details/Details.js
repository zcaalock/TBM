import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchDetails, editDetail } from '../../../actions/details'
import DetailIcons from './DetailIcons'
import EditDetailName from './EditDetailName'

class Details extends React.Component {
  state = { }

  removeEdit(id) {
    this.setState({ [`itemEditable${id}`]: false })
  }

  showEdit(id) {
    this.setState({  [`itemEditable${id}`]: true })
    console.log('edit')
  }

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
          <div style={{ display: 'inline-block', paddingLeft: '10px', cursor: 'default' }}>
            <div className="blackHover" style={this.renderCrossOut(detail.check)}>
              <EditDetailName
              title={detail.title}
              detail={detail}
              editState={this.state}
              showEdit={() => this.showEdit(detail.id)}
              removeEdit={() => this.removeEdit(detail.id)}
              />
              {/* {detail.title} */}
            </div>
          </div>
          <div style={{ display: 'inline-block', float: 'right' }}>
            <DetailIcons showEdit={()=>this.showEdit(detail.id)} detailId={detail.id} />
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='ui vertical text menu' style={{ minHeight: '0', width: '100%', paddingLeft: '10px' }}>
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