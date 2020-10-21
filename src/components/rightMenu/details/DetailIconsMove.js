import React from 'react'
import _ from 'lodash'

function DetailIconsMove(props){

  const renderUpIcon = () => {
    const prev = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.detailId }).number].number - 1 }) 
    if(prev) return <i onClick={()=>props.moveUp()} className="caret up icon articleIcon" style={{position: 'absolute', marginTop: '-7px'}}  />
  }

  const renderDownIcon = () => {
    const next = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.detailId }).number].number + 1 }) 
    if(next) return <i onClick={()=>props.moveDown()} className="caret down icon articleIcon" style={{position: 'absolute', marginTop: '10px'}}/>

  }
  
  return (
    <div className="articleIcon" style={{position: 'absolute', marginLeft: '-22px'}}>
      {renderUpIcon()}
      {renderDownIcon()}
      </div>
  )
}


export default DetailIconsMove