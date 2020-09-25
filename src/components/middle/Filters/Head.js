import React from 'react'
import { useSelector } from "react-redux";

function Head () {
  
  const appState = useSelector(state => state.appState);
  
    return (
      <div className="head-vertical-segment" style={{paddingBottom: '20px'}}>
        <h3>Filters: {appState.filter.selector}/{appState.filter.value}</h3>
      </div>
    )  
}

export default Head