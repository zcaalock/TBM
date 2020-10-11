import React, { useEffect } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from '../../actions/boards'
import { editState } from '../../actions/appState'


function BoardsList(props) {

  const boards = useSelector(state => Object.values(state.boards))
  const categories = useSelector(state => Object.values(state.categories))
  const pulses = useSelector(state => Object.values(state.pulses))
  const appState = useSelector(state => state.appState)
  const userId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => _.find(state.lead, {userId: userId}))

  const dispatch = useDispatch()

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  useEffect(() => {
    if (isEmpty(boards)) dispatch(fetchBoards())
  }, [])


  const selectedCheck = (id) => {
    if (id === appState.id) {
      return 'active'
    }
    return ''
  }

  const selectedStyle = (id) => {
    if (id === appState.id)
      return { backgroundColor: '#E9E9E9', paddingLeft: '0' }
    return { paddingLeft: '0' }
  }

  const renderBoards = () => {
    //this.handleAuth()
    if (boards.length === 0) {
      return (
        <div className="ui active inline loader">
        </div>
      )
    }
    //var sort = _.sortBy(this.props.boards, 'createdAt')
    return _.filter(boards, { privateId: props.privateId }).map(board => {

      return (
        <>
          <div style={{position: 'absolute', textAlign: 'right', width: '210px'}}>{renderNotifications(board.id)}</div>
          <Link
            onClick={() => dispatch(editState('', 'pulseId'))}
            to={`/boards/${board.id}`}
            className={`item ${selectedCheck(board.id)}`}
            key={board.id}
            style={selectedStyle(board.id)}>
            {board.title}
          </Link>
        </>
      )
    })
  }

  const renderNotifications = (boardId) => {
    let notoficationStorage = 0
    categories.map(category => {
      if (category.boardId === boardId) {
        const pulsesPB = _.filter(pulses, { categoryId: category.id })

        pulsesPB.map(pulse => {
          let findUser = undefined
          if (pulse.readed) pulse.readed.forEach(read => { if (read === userId) return findUser = true })
          if (pulse.readed && pulse.readed.length > 0 && findUser !== true && pulse.privateId === '' && pulse.archived === 'false') return notoficationStorage++
          return null
        })
        return notoficationStorage
      }
      return notoficationStorage
    })
    //console.log(notoficationStorage)
    if (notoficationStorage > 0 && lead.settings.notifications === true) return <div style={{zIndex:10}} key={new Date()} className='notificationBoard' data-position="left center" data-tooltip="Unreaded content">{notoficationStorage}</div>
  }

  return (
    <div>
      {renderBoards()}
    </div>
  )
}

export default BoardsList