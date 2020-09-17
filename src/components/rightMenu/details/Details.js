import React from 'react'
import { Checkbox, Table } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchDetails, editDetail } from '../../../actions/details'
import { editPulse } from '../../../actions/pulses'
import DetailIcons from './DetailIcons'
import EditDetailName from './EditDetailName'

class Details extends React.Component {
  state = {}

  removeEdit(id) {
    this.setState({ [`itemEditable${id}`]: false })
  }

  showEdit(id) {
    this.setState({ [`itemEditable${id}`]: true })
    console.log('edit')
  }

  componentDidMount() {
    //this.props.fetchDetails()

  }

  setBool(bool) {
    this.setState({ check: bool })
  }

  renderCrossOut(bool) {
    if (bool === 'true') {
      return { textDecoration: 'line-through' }
    }
    return {}
  }

  handleOnClick(id, bool) {
    if (bool === 'false') {
      this.props.editDetail(id, { check: 'true' })
      this.props.editPulse(this.props.pulseId, { readed: [this.props.userId] })
    }
    if (bool === 'true') {
      this.props.editDetail(id, { check: 'false' })
      this.props.editPulse(this.props.pulseId, { readed: [this.props.userId] })
    }
  }

  defaulCheck(bool) {
    if (bool === 'false')
      return false
    if (bool === 'true')
      return true
  }

  renderDetails() {
    const id = this.props.pulseId
    const details = _.filter(this.props.details, { pulseId: id })

    return details.map(detail => {
      //key={detail.id} basic='very'
      return (
        <Table.Row key={detail.id}>
          <Table.Cell style={{ width: '25px' }}>
            <Checkbox
              onClick={() => this.handleOnClick(detail.id, detail.check)}
              defaultChecked={this.defaulCheck(detail.check)}
              style={{ marginBottom: '-4px' }} />
          </Table.Cell>
          <Table.Cell>
            <div className="blackHover" style={this.renderCrossOut(detail.check)}>
              <EditDetailName
                title={detail.title}
                detail={detail}
                pulseId={this.props.pulseId}
                userId={this.props.userId}
                editState={this.state}
                showEdit={() => this.showEdit(detail.id)}
                removeEdit={() => this.removeEdit(detail.id)} />
            </div>
          </Table.Cell>
          <Table.Cell style={{ width: '76px' }}>
            <DetailIcons showEdit={() => this.showEdit(detail.id)} detailId={detail.id} />
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    return (
      <div className='ui vertical text menu' style={{ minHeight: '0', width: '100%', paddingLeft: '10px' }}>
        <Table basic='very' >
          {/* <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header> */}
          <Table.Body>
            {this.renderDetails()}
          </Table.Body>
        </Table>



      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    details: Object.values(state.details),
    userId: state.user.credentials.userId
  }
}

export default connect(mapStateToProps, { fetchDetails, editDetail, editPulse })(Details)