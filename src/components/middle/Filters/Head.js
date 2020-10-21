import React from 'react'
import { useSelector } from "react-redux";

function Head () {
  
  const appState = useSelector(state => state.appState);
  
    return (
      <div className="head-vertical-segment" style={{paddingBottom: '20px'}}>
        <h3>Find pulse:</h3>
      </div>
    )  
}

export default Head