import React from 'react'
import _ from 'lodash'
import { useDispatch } from "react-redux";
import { editLead } from '../../../../../actions/settings'
import SingleInput from '../../../../Forms/SingleInput'

function EditBoardName(props) {

  const dispatch = useDispatch();

  const onSubmit = (formValues, id) => {
    dispatch(editLead(id, formValues))
    props.removeEdit()
  }

  const renderNewLead = () => {
    const userId = props.userId
    const userLead = _.filter(props.lead, { userId: userId })[0]    
    if (props.editState === true && userId !== undefined) {
      //console.log(userLead.title)      
      return (        
        <SingleInput
          propStyle={{ marginTop: '-2px', marginLeft: '-5px', padding: '0px' }}
          propChildStyle={{ padding: '0px' }}
          initialValues={_.pick(userLead, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={(formValues) => onSubmit(formValues, userLead.id)} />
      )
    }

    if (props.editState === false && userId !== undefined) {
      return (
        <div onDoubleClick={() => props.showEdit()} style={{ paddingBottom: '5px' }}>
          {userLead.title}
        </div>
      )
    }
  }

  return (
    <>
      {renderNewLead()}
    </>
  )
}

export default EditBoardName
