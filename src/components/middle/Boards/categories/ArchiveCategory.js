import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { editCategory } from '../../../../actions/categories'

function ArchiveCategory(props) {
  
  const categories = useSelector(state => Object.values(state.categories)) 

  const dispatch = useDispatch()

  const renderArchive = () => {
    const findCategory = _.filter(categories, { id: props.categoryId })
    const isArchived = findCategory[0].archived

    if (isArchived === 'true') {
      return (
        <div
          onClick={() => dispatch(editCategory(props.categoryId, { archived: 'false' }))}
          data-position="left center"
          data-tooltip="Unarchive Category"
          style={{ display: 'inline-block', color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
          <i className=" archive icon" /> archived
        </div>
      )
    } else return (
      <div
        onClick={() => dispatch(editCategory(props.categoryId, { archived: 'true' }))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Archive"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>
    )

  }

  return (
    <>
      {renderArchive()}
    </>
  )
}

export default ArchiveCategory
