import React from 'react'
import { connect } from 'react-redux'
import { fetchBoard} from '../../actions/boards'

class ItemsList extends React.Component {
  componentDidMount() {
    this.props.fetchBoard(this.props.match.params.id)

  }

  render() {
    if (!this.props.board) {
      return <div>Loading...</div>
    }
    const {title} = this.props.board
    return (
      <div style={{marginLeft: '250px'}}>
        <h1>{title}</h1>        
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchBoard })(ItemsList)
