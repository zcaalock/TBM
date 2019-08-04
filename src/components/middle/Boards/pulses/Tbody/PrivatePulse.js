import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editPulse } from '../../../../../actions/pulses'


class ArchivePulse extends React.Component {

  componentDidMount() {

  }

  renderArchive() {
    

    const category = _.find(this.props.categories, { id: this.props.pulse.categoryId })
      const board = _.find(this.props.boards, { id: category.boardId })

      //console.log('details: ', this.props.pulse.id)
    //const findPulseId = this.props.pulse.id

    //const isBoardPrivate = this.props.boards[this.props.boardId].privateId
    
    
    if (this.props.pulse.privateId && this.props.pulse.privateId === this.props.user.userId && board.privateId === '') {
      return (
        <div
          onClick={() => this.props.editPulse(this.props.pulse.id, { privateId: '' })}
          data-position="left center"
          data-tooltip="Make public"
          style={{ display: 'inline-block', color: '#00A569', paddingRight: '5px', cursor: 'pointer' }}>
          <i className=" privacy icon" />
        </div>
      )
    }

    if (this.props.pulse.privateId === '')
      return (
        <div
          onClick={() => this.props.editPulse(this.props.pulse.id, { privateId: this.props.user.userId })}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Make private"
          style={{ display: 'inline-block', cursor: 'pointer', paddingRight: '5px' }}>
          <i className=" privacy icon" />
        </div>
      )
  }

  render() {
    return (
      <>
        {this.renderArchive()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pulses: Object.values(state.pulses),
    user: state.user.credentials,
    boards: Object.values(state.boards),
    categories: Object.values(state.categories)
  }
}

export default connect(mapStateToProps, { editPulse })(ArchivePulse)
