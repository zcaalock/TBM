import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { fetchCategories } from '../../../../actions/categories'
import { fetchPulses } from '../../../../actions/pulses'

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

  const [stateId, setId] = useState({ id: false })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(categories)) dispatch(fetchCategories())
    if (isEmpty(pulses)) dispatch(fetchPulses())
  }, [])

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const expand = (id) => {
    setId({ [id]: true })
  }

  const collapse = (id) => {
    setId({ [id]: false })
  }

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
        appState={appState.showNotifications}
        expandCollapse={() => dispatch(editState(category.id, 'expandCategory'))}
        categoryKey={category.id}
        categoryTitle={category.title}
        category={category}
        id={category.id}
        pulses={pulses}
        privateId={privateId}
      />
    )
  }

  const renderCategories = () => {

    return categories.map(category => {
      if (category.boardId === appState.id && category.privateId === "" && category.archived !== "true") {

        return (
          <div key={category.id}>
            {renderProgressBar(category.id)}
            {renderColapsingMenu(category, category.id)}</div>
        )
      } return null
    })
  }

  const renderCategoriesWithArchived = () => {
    return categories.map(category => {
      if (category.boardId === appState.id && category.privateId === "") {
        return (
          <div key={category.id}>
            {renderProgressBar(category.id)}
            {renderColapsingMenu(category, category.id)}</div>
        )
      } return null
    })
  }

  const checkIfArchived = () => {
    if (appState.showArchived === "true") return renderCategoriesWithArchived()
    return renderCategories()
  }

  return (
    <div>
      {checkIfArchived()}
    </div>
  )
}

export default Categories