import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { editContact } from '../../../../actions/contacts'
import { useTranslation } from "react-i18next"
function MakePrivate(props) {

  const user = useSelector(state => state.user.credentials)
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation()
  const renderArchive = () => {

    if (props.contact.privateId && props.contact.privateId === user.userId) {
      return (
        <div
          onClick={() => dispatch(editContact(props.contact.id, { privateId: '' }))}
          data-position="left center"
          data-tooltip={t("Make public")}
          style={{
            display: 'inline-block',
            color: '#00A569',
            //paddingRight: '5px', 
            cursor: 'pointer'
          }}>
          <i className=" privacy icon" />
        </div>
      )
    }

    if (props.contact.privateId === '')
      return (
        <div
          onClick={() => dispatch(editContact(props.contact.id, { privateId: user.userId }))}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip={t("Make private")}
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" privacy icon" />
        </div>
      )
  }

  return (
    <>
      {renderArchive()}
    </>
  )
}

export default MakePrivate



