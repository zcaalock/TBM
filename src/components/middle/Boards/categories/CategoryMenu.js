import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'semantic-ui-react'
import { editCategory, deleteCategory } from '../../../../actions/categories'
import { editState } from '../../../../actions/appState'

let categoryArr = []
function HeaderIcons(props) {

  const pulses = useSelector(state => Object.values(state.pulses))
  const appState = useSelector(state => state.appState)
  const categories = useSelector(state => Object.values(state.categories))
  const userId = useSelector(state => state.user.credentials.userId)
  const lead = useSelector(state => _.find(state.lead, { userId: userId }))
  const user = useSelector(state => state.user.credentials.userId)
  const dispatch = useDispatch()

  const archived = props.category.archived
  const privateId = props.category.privateId

  const id = props.category.id
  const notifications = props.notifications
  const showNotifications = lead.settings.notifications

  let findCategories = _.sortBy(_.filter(categories, { boardId: appState.id }), 'createdAt')
  let showArchived = false //lead ? _.find(lead, { userId: user.userId }).settings.showArchived : false


  const { t } = useTranslation()

  const moveUp = (id, created, arr) => {
    const prev = arr && props.category.archived === 'false' ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number - 1 }) : null
    if (prev) dispatch(editCategory(id, { createdAt: prev.createdAt }, true))
    if (prev) dispatch(editCategory(prev.id, { createdAt: created }, true))
  }

  const moveDown = (id, created, arr) => {
    const next = arr && props.category.archived === 'false' ? _.find(arr, { number: arr[_.find(arr, { id: id }).number].number + 1 }) : null
    if (next) dispatch(editCategory(id, { createdAt: next.createdAt }, true))
    if (next) dispatch(editCategory(next.id, { createdAt: created }, true))
  }

  categoryArr = []
  findCategories.map(category => {
    categoryArr.push({ number: categoryArr.length, id: category.id, createdAt: category.createdAt, archived: category.archived, privateId: category.privateId })
    if (showArchived === false) categoryArr = _.chain(categoryArr).reject({ archived: 'true' }).value()
    return categoryArr = _.uniqBy(categoryArr, 'id')
  })

  const renderUp = () => {

    const prev = categoryArr.length > 0 ? _.find(categoryArr, { number: categoryArr[_.find(categoryArr, { id: id }).number].number - 1 }) : null
    if (prev) return <Dropdown.Item
      icon='chevron up'
      content={t('Move up')}
      onClick={() => moveUp(id, props.category.createdAt, categoryArr)}
    />
  }

  const renderDown = () => {

    const next = categoryArr.length > 0 ? _.find(categoryArr, { number: categoryArr[_.find(categoryArr, { id: id }).number].number + 1 }) : null
    if (next) return <Dropdown.Item
      icon='chevron down'
      content={t('Move down')}
      onClick={() => moveDown(id, props.category.createdAt, categoryArr)}
    />
  }

  const renderDelete = () => {
    const puls = _.filter(pulses, { categoryId: id })

    if (puls.length > 0) {
      return (
        <Dropdown.Item
          disabled
          data-position="left center"
          data-tooltip={t("Remove all items before delete")}
          content={t("Delete")}
          icon="trash"
        />
      )
    } return (
      <Dropdown.Item
        onClick={() => { dispatch(deleteCategory(id)) }}
        content={t("Delete")}
        icon="trash"
      />
    )
  }

  function renderNotifications() {
    if (notifications > 0 && showNotifications === true) return (
      <div
        style={{ width: '23px' }}
        data-tooltip={t("Unreaded content")}>
        <div className='notificationCategory'>
          {notifications}
        </div>

      </div>)
  }

  function renderPrivate() {
    if (privateId === userId) return (
      <div
        onClick={() => dispatch(editCategory(id, { privateId: '' }))}
        data-position="left center"
        data-tooltip={t("Make public")}
        style={{ color: '#00A569', paddingRight: '5px', cursor: 'pointer' }}>
        <i className=" privacy icon" />
      </div>)
  }

  function renderArchived() {
    if (archived === 'true') return (
      <div
        onClick={() => dispatch(editCategory(id, { archived: 'false' }))}
        data-position="left center"
        data-tooltip={t("Unarchive")}
        style={{ color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>)
  }

  return (

    <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>

      {renderArchived()}
      {renderPrivate()}
      {renderNotifications()}
      <Dropdown icon='bars' pointing='right' className='articleIcon'>
        <Dropdown.Menu>
          <Dropdown.Header icon='bars' content={`${t('Category')} menu:`} />
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              dispatch(editState(props.category, 'categoryId'))
              dispatch(editState(true, 'editCategoryOpen'))
            }
            }
            content={t("Edit")}
            icon='edit'
          />
          <Dropdown.Item
            content={archived === 'true' ? t('Unarchive') : t('Archive')}
            icon={archived === 'true' ? <i className=" archive icon" style={{ color: '#DC6969' }} /> : 'archive'}
            onClick={() => archived === 'true' ? dispatch(editCategory(id, { archived: 'false' })) : dispatch(editCategory(id, { archived: 'true' }))}
          />
          <Dropdown.Item
            content={privateId === userId ? t('Make public') : t('Make private')}
            onClick={() => privateId === userId ? dispatch(editCategory(id, { privateId: '' })) : dispatch(editCategory(id, { privateId: userId }))}
            icon={privateId === userId ? <i className="privacy icon" style={{ color: '#00A569' }} /> : 'privacy'}
          />
          {renderDelete()}
          <Dropdown.Header content={`${t('Move')}:`} />
          {renderUp()}
          {renderDown()}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )

}

export default HeaderIcons