import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history'
import { fetchBoards, createBoard } from '../../actions/boards'
import { editState } from '../../actions/appState'
import AddBoard from './AddBoard'

class Boards extends React.Component {

  state = { isHovering: false }

  componentDidMount() {
    this.props.fetchBoards()
  }

  goLink() {
    history.push(`/`)
    //console.log('select', id)
  }

  goBoards(){
    history.push('/boards')
  }

  handleHover() {
    this.setState({ isHovering: !this.state.isHovering })
  }

  renderLogOut() {
    if (this.state.isHovering === false)
      return <h3>Task Manager</h3>
    return <div ><h3><i className="power off icon" />LogOut</h3></div>
  }

  selectedCheck(id) {
    if (id === Number(this.props.appState.id)) {
      return 'active'
    }
    return ''
  }

  renderBoards() {
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

      <div style={{ position: "fixed", height: '98%', padding: '20px' }} className="leftMenu header">
        <div
        onMouseEnter={() => this.handleHover()}
        onMouseLeave={() => this.handleHover()} 
          //data-position="bottom center"
        // data-tooltip="Go to main page" 
         style={{ cursor: "pointer" }} 
         onClick={() => { this.goLink(); this.props.editState('', 'id') }} 
         className='item leftMenu-main'>{this.renderLogOut()}</div>
               
        <div className="ui secondary text menu">
          <div className="item" style={{ width: '150px' }}>
            <div              
              className="menu" style={{ width: '100%' }}>
              <div onClick={()=>this.goBoards()} className="header item" style={{ paddingLeft: '0', paddingBottom: '10px', cursor: 'pointer' }}>Boards</div>
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
    boards: Object.values(state.boards),
    appState: state.appState
  }
}

export default connect(mapStateToProps, { fetchBoards, createBoard, editState })(Boards)