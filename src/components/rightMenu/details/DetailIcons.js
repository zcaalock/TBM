import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch} from "react-redux";
import { deleteDetail } from '../../../actions/details'
import { editState } from '../../../actions/appState'


function DetailIcon(props) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editState('false', 'gCalendarOpen'))
  }, [])

  const renderUpIcon = () => {
    const prev = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.detailId }).number].number - 1 }) 
    if(prev) return <i onClick={()=>props.moveUp()} className="caret up icon DetailArrows" style={{position: 'absolute', marginTop: '-7px'}}  />
  }

  const renderDownIcon = () => {
    const next = _.find(props.detailArr, { number: props.detailArr[_.find(props.detailArr, { id: props.detailId }).number].number + 1 }) 
    if(next) return <i onClick={()=>props.moveDown()} className="caret down icon DetailArrows" style={{position: 'absolute', marginTop: '10px'}}/>

  }

  return (
    <div>
      <div className="hideDetailArrows" style={{position: 'absolute', marginLeft: '-25px'}}>
      {renderUpIcon()}
      {renderDownIcon()}
      </div>
      <div
        onClick={() => { props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Edit"
        style={{
          display: 'inline-block',
          //paddingLeft: '0px',
          //paddingRight: '5px',
          cursor: 'pointer'
        }}>
        <i className=" edit icon" />
      </div>
      <div
        onClick={() => { dispatch(deleteDetail(props.detailId)) }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>
    </div>
  )
}

export default DetailIcon
