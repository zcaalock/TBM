import React from 'react'

const Header = (props) =>{
  //console.log('pulse: ', props.title.title)
  return (
    <div className="item leftMenu-main">
      <h3>
      {props.title}
      </h3>
      </div>
  )
}

export default Header