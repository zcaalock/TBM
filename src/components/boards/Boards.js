import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBoards, createBoard } from '../../actions/boards'
import AddBoard from './AddBoard'

class Boards extends React.Component {
  state = {}
  componentDidMount() {
    this.props.fetchBoards()
  }

  selectedCheck(id) {
    if (id === this.state.itemSelected) {
      return 'active'
    }
    return ''
  }

  renderBoards() {
    return this.props.boards.map(board => {
      return (
        <Link onClick={() => { this.setState({ itemSelected: board.id }) }} to={`/boards/${board.id}`} className={`item ${this.selectedCheck(board.id)}`} key={board.id}>
          {board.title}
        </Link>
      )
    })
  }

  render() {
    return (
      <div style={{position: "fixed"}} className="leftMenu header">Boards<hr/>
        <div style={{ margin: '0' }} className="ui secondary text menu">
          <div className="item">
            <div className="menu">
              {this.renderBoards()}
              <AddBoard />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    boards: Object.values(state.boards)

  }
}

export default connect(mapStateToProps, { fetchBoards, createBoard })(Boards)