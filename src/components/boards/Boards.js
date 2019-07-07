import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBoards, createBoard } from '../../actions/boards'
import AddBoard from './AddBoard'

class Boards extends React.Component {
  state = {itemEditable: false}
  componentDidMount() {
    this.props.fetchBoards()
  }

  selectedCheck(id) {
    if (id === this.state.itemSelected) {
      return 'active'
    }
    return ''
  }

  removeEdit(){
    this.setState({itemEditable: false})
  }

  showEdit() {
    this.setState({itemEditable: true})
    console.log('true')
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
  
  renderNewBoard(){
    if (this.state.itemEditable === true){
      return <AddBoard removeEdit={()=>this.removeEdit()}/>
    }

    if (this.state.itemEditable === false){
      return (
        <div onClick={()=>this.showEdit()} className="selectable item"><i className="icon plus" />New</div>
      )
    }
  }

  


  render() {
    return (
      <div style={{ position: "fixed" }} className="ui vertical menu">
        <div className="item">
          <div className="header">Boards</div>
          <div className="menu">
            {this.renderBoards()}
            {this.renderNewBoard()}
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