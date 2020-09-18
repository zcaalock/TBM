import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editBoard } from '../../../actions/boards'
import SingleInput from '../../Forms/SingleInput'

function EditBoardName(props) {

  const dispatch = useDispatch();  
  const onSubmit = (formValues) => {
    dispatch(editBoard(props.board.id, formValues))
    props.removeEdit()
  }
  const renderNewBoard = () => {        
    if (props.editState === true) {
      return (
        <SingleInput
          propStyle={{ marginTop: '-2px', marginLeft: '-5px', padding: '0px' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={_.pick(props.board, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState === false) {
      return (
        <div onDoubleClick={() => props.showEdit()}>
          <div><h3>{props.title}</h3></div>
        </div>
      )
    }
  }
  return (
    <>
      {renderNewBoard()}
    </>
  )
}

export default EditBoardName
