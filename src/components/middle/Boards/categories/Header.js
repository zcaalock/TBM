import React, { useState } from 'react'
import { useSelector } from "react-redux";
import _ from 'lodash'
import CategoryMenu from './CategoryMenu'

function Header(props) {
  const pulses = useSelector(state => Object.values(state.pulses))
  const userId = useSelector(state => state.user.credentials.userId)
  const selectedBoard = useSelector(state=> _.find(state.boards, {id: props.category.boardId}))
  const [isHovering, setIsHovering] = useState(false)  

  const hideIcon = () => {
    setIsHovering(false)
  }

  const showIcon = () => {
    setIsHovering(true)
  }

  const showHover = () => {
    if (isHovering === true) {
      return (
        <div>
          <i className="sort icon" />
        </div>)
    }
  }

  const mapNotifications = () => {
    let notoficationStorage = 0
    const pulsesPB = _.filter(props.pulses, { categoryId: props.id })
    pulsesPB.map(pulse => {
      let findUser = undefined
      if (pulse.readed) pulse.readed.forEach(read => { if (read === props.privateId) return findUser = true })
      if (pulse.readed && pulse.readed.length > 0 && findUser !== true && pulse.privateId === '' && pulse.archived === 'false') return notoficationStorage++
      return null
    })
    return notoficationStorage
  }

  const mapPulses = () => {    
    const pulseCount = _.filter(pulses, { categoryId: props.id, privateId: '', archived: 'false' })
    const privatePulseCount = _.filter(pulses, { categoryId: props.id, archived: 'false' })
    if(selectedBoard.privateId === userId) return privatePulseCount.length
    return pulseCount.length
  }
  //console.log('debug: ', props)
  return (
    <div style={{}} className="categories ui secondary text menu" >
      <div className="menu" style={{ width: '100%' }}>
        <div
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => props.expandCollapse()}
          className="header item" style={{ cursor: 'pointer' }}>
          {showHover()}
          {props.categoryTitle}
          <div style={{marginLeft: '3px'}}>({mapPulses()})</div>
        </div>
      </div>
      <div className="header item" style={{ float: 'right', fontSize: '1em' }}>
        <CategoryMenu
          
          category={props.category}
          notifications={mapNotifications()}
          
        />
      </div>
    </div>
  )
}

export default Header