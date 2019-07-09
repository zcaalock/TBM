import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBoards, createBoard } from '../../actions/boards'
import AddBoard from './AddBoard'

class Boards extends React.Component {
  state = {}
  componentDidMount() {
    this.props.fetchBoards()
    this.setState({ itemSelected: null })
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
        <Link
          onClick={() => { this.setState({ itemSelected: board.id }) }}
          to={`/boards/${board.id}`}
          className={`item ${this.selectedCheck(board.id)}`}
          key={board.id}
          style={{ paddingLeft: '0' }}
        >
          {board.title}
        </Link>
      )
    })
  }

  render() {
    return (

      <div style={{ position: "fixed", height: '98%', padding: '20px' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>
        <div className="ui secondary text menu">
          <div className="item" style={{ width: '150px' }}>
            <div className="menu" style={{ width: '100%' }}>
              <div className="header item" style={{ paddingLeft: '0', paddingBottom: '10px' }}>Boards</div>
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