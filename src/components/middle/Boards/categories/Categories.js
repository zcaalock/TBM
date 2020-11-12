import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import EditCategoryModal from '../../../Forms/EditCategoryModal'
import Header from './Header'
import Table from '../pulses/Table'
import ProgressBar from '../../../Forms/ProgressBar'
import { editState } from '../../../../actions/appState';

function Categories() {

  const categories = useSelector(state => Object.values(state.categories))
  const pulses = useSelector(state => Object.values(state.pulses))
  const details = useSelector(state => Object.values(state.details))
  const appState = useSelector(state => state.appState)
  const privateId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => _.find(state.lead, { userId: privateId }))

  const dispatch = useDispatch()  

  const renderProgressBar = (id) => {
    let detailStorage = []
    const pulsesPB = _.filter(pulses, { categoryId: id, archived: 'false' })

    pulsesPB.map(pulse => {
      return details.map(detail => {
        if (detail.pulseId === pulse.id)
          detailStorage.push({ detailId: detail.id, check: detail.check })
        return detailStorage
      })
    })

    const detailsUnion = _.unionBy(detailStorage, 'detailId')
    const detailsChecked = _.filter(detailsUnion, { check: 'true' })

    if (detailsUnion.length > 0) {
      const value = detailsChecked.length / detailsUnion.length
      return <ProgressBar size={'tiny'} value={value * 100} />
    }
  }

  const renderColapsingMenu = (category, id) => {
    if (appState.expandCategory === category.id) {
      return (
        <Table
          collapse={() => dispatch(editState('', 'expandCategory'))}
          categoryKey={category.id}
          categoryTitle={category.title}
          category={category}
          boardId={appState.id} />
      )
    } return (
      <Header
        appState={lead.settings.notifications}
        expandCollapse={() => dispatch(editState(category.id, 'expandCategory'))}
        categoryKey={category.id}
        categoryTitle={category.title}
        category={category}
        id={category.id}
        pulses={pulses}
        privateId={privateId}
        boardId={category.boardId}
      />
    )
  }

  const showEditCategoryModal = () => {
    return appState.editCategoryOpen === true ? <EditCategoryModal /> : null
  }

  const renderCategories = () => {
    let catArr = _.filter(categories, { boardId: appState.id })
    let privateArr = _.filter(categories, { privateId: lead.userId, boardId: appState.id })
    const showArchived = lead.settings.showArchived
    
    catArr = _.filter(catArr, { privateId: '' })    
    catArr = catArr.concat(privateArr)

    if (showArchived === false) catArr = _.reject(catArr, { archived: 'true' })    
    return _.filter(catArr, _.size).map(category => {
      return (
        <div key={category.id}>
          {renderProgressBar(category.id)}
          {renderColapsingMenu(category, category.id)}</div>
      )
    })
  } 

  return (
    <div>
      {renderCategories()}
      {showEditCategoryModal()}
    </div>
  )
}

export default Categories