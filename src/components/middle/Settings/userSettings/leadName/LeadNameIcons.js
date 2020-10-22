import React from 'react'
import { useTranslation } from "react-i18next"
function LeadNameIcons(props) {
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
    </div>
  )
}

export default LeadNameIcons
