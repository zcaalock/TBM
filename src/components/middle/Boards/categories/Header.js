import React, { useState } from 'react'
import _ from 'lodash'
import HeaderIcons from './HeaderIcons'
import EditHeaderName from './editHeaderName'

function Header(props) {

  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

  const removeEdit = () => {
    setItemEditable(false)
  }

  const showEdit = () => {
    setItemEditable(true)
  }

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
    
    const pulseCount = _.filter(props.pulses, { categoryId: props.id, privateId: '', archived: 'false' })
    return pulseCount.length

  }

  return (
    <div style={{}} className="categories ui secondary text menu" >
      <div className="menu" style={{ width: '100%' }}>
        <div
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => props.expandCollapse()}
          className="header item" style={{ cursor: 'pointer' }}>
          {showHover()}
          <EditHeaderName
            title={props.categoryTitle}
            category={props.category}
            editState={itemEditable}
            showEdit={() => showEdit()}
            removeEdit={() => removeEdit()}
          />
          <div style={{marginLeft: '3px'}}>({mapPulses()})</div>
        </div>
      </div>
      <div className="header item" style={{ float: 'right', paddingRight: '25px' }}>
        <HeaderIcons
          showEdit={() => showEdit()}
          categoryId={props.categoryKey}
          notifications={mapNotifications()}
          appState={props.appState}
        />
      </div>
    </div>
  )
}

export default Header