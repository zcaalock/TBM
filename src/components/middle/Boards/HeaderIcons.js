import React from 'react'
import DeleteBoard from './DeleteBoard'
import { useTranslation } from "react-i18next"


function HeaderIcons(props) {
  const { t } = useTranslation()
  return (
    <div>
      <div
        onClick={() => { props.showEdit() }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip={t("Edit")}
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" edit icon" />
      </div>
      <DeleteBoard />
    </div>
  )
}

export default HeaderIcons
