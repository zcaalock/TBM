import React from 'react'
import { useDispatch} from "react-redux";
import _ from 'lodash'
import { editCategory } from '../../../../actions/categories'
import SingleInput from '../../../Forms/SingleInput'

function EditCategoryName (props) {    
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editCategory(props.category.id, formValues))
    props.removeEdit()
  }   

  const renderEditCategory = () => {    
    if (props.editState === true) {
      return (
        <SingleInput 
        propStyle={{padding: '0'}} 
        propChildStyle={{ padding: '5px'}}
        initialValues={_.pick(props.category, 'title')} 
        removeEdit={()=>props.removeEdit()} 
        onSubmit={onSubmit} />
      )
    }

    if (props.editState === false) {
      return (
        <div >            
          <div>{props.title}</div>          
        </div>
      )
    }
  }
  
    return (
      <>      
        {renderEditCategory()}
      </>
    )  
}

export default EditCategoryName
