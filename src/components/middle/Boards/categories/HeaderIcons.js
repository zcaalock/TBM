import React from 'react'
import DeleteCategory from './DeleteCategory'
import ArchiveCategory from './ArchiveCategory'

function HeaderIcons (props) {  

    const renderNotifications =() => {
      if (props.notifications > 0 && props.appState === 'true') return <div className='notificationCategory' data-tooltip="Unreaded content">{props.notifications}</div>
    }

    return (
      <div>
        {renderNotifications()}
        <div
          onClick={() => { props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer', marginRight: '7px' }}>
          <i className=" edit icon" />
        </div>        
        <ArchiveCategory categoryId={props.categoryId} />
        <DeleteCategory categoryId={props.categoryId} /> 
               
      </div>
    )
  
}

export default HeaderIcons