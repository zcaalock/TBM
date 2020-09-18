import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBoards} from '../../actions/boards'
import {editState} from '../../actions/appState'


class BoardsList extends React.Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }    
  

  componentDidMount() {
    if (this.isEmpty(this.props.boards)) this.props.fetchBoards()
      
  }
  

  selectedCheck(id) {
    if (id === this.props.appState.id) {
      return 'active'
    }
    return ''
  }

  selectedStyle(id){
    if(id === this.props.appState.id)
      return {backgroundColor: '#E9E9E9', paddingLeft: '0'}
    return {paddingLeft: '0'}  
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
    return _.filter(this.props.boards, {privateId: this.props.privateId}).map(board => {
      
      return (
        <>
        {this.renderNotifications(board.id)}
        <Link
          onClick={()=>this.props.editState('', 'pulseId')}
          to={`/boards/${board.id}`}
          className={`item ${this.selectedCheck(board.id)}`}
          key={board.id}
          style={this.selectedStyle(board.id)}>
          {board.title}
        </Link>
        
        </>
      )
    })
  }

  renderNotifications (boardId) {
    let notoficationStorage = 0
    this.props.categories.map(category => {
      if (category.boardId === boardId) {
        const pulsesPB = _.filter(this.props.pulses, { categoryId: category.id })
        
        pulsesPB.map(pulse => {
          let findUser = undefined
          if (pulse.readed) pulse.readed.forEach(read => { if (read === this.props.userId) return findUser = true })
          if (pulse.readed && pulse.readed.length > 0 && findUser !== true) return notoficationStorage++
          return null
        })
        return notoficationStorage
      }
    })
    //console.log(notoficationStorage)
    if (notoficationStorage > 0 && this.props.appState.showNotifications === 'true') return <div className='notificationBoard' data-position="right center" data-tooltip="Unreaded content">{notoficationStorage}</div>
    
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
    categories: Object.values(state.categories),
    pulses: Object.values(state.pulses),
    appState: state.appState,
    userId: state.user.credentials.userId,
  }
}

export default connect(mapStateToProps, { fetchBoards, editState })(BoardsList)