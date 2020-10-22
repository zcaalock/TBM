import React from 'react'
import { useDispatch} from "react-redux";
import { deleteDetail } from '../../../actions/details'
import { useTranslation } from "react-i18next"


function DetailIcon(props) {  
  const { t } = useTranslation() 
   const dispatch = useDispatch();
    return (
    <div> 
      <div
        onClick={() => {props.showEdit() }}
        className="articleIcon"
        data-position="top right"
        data-tooltip={t("Edit")}
        style={{
          display: 'inline-block',
          paddingLeft: '0px',
          //paddingRight: '5px',
          cursor: 'pointer'
        }}>
        <i className=" edit icon" />
      </div>     
      <div
        onClick={() => { dispatch(deleteDetail(props.detailId)) }}
        className="articleIcon"
        data-position="top right"
        data-tooltip={t("Delete")}
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>      
    </div>
  )
}

export default DetailIcon
