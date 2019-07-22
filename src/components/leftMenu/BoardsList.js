import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBoards} from '../../actions/boards'

class BoardsList extends React.Component {

  componentDidMount() {
    this.props.fetchBoards()
  }

  selectedCheck(id) {
    if (id === this.props.appState.id) {
      return 'active'
    }
    return ''
  }

  renderBoards() {
    //this.handleAuth()
    if (this.props.boards.length === 0) {
      return (
        <div className="ui active inline loader">
        </div>
      )
    }
    //var sort = _.sortBy(this.props.boards, 'createdAt')
    return this.props.boards.map(board => {
      return (
        <Link
          to={`/boards/${board.id}`}
          className={`item ${this.selectedCheck(board.id)}`}
          key={board.id}
          style={{ paddingLeft: '0' }}>
          {board.title}
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderBoards()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  return {
    boards: Object.values(state.boards),
    appState: state.appState,
  }
}

export default connect(mapStateToProps, { fetchBoards })(BoardsList)